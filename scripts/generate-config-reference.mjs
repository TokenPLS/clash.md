import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const hakoRoot = path.resolve(root, '../Hako')
const source = process.env.HAKO_CONFIG_INVENTORY
  || process.argv[2]
  || path.join(hakoRoot, 'docs/ios-adaptation/CONFIG-FIELD-INVENTORY.json')
const lockSource = process.env.HAKO_SDK_LOCK
  || path.join(hakoRoot, 'apple/HakoClient/HakoSDK.lock.json')
const target = path.join(root, 'docs/.vitepress/data/config-reference.json')

const [inventory, sdkLock] = await Promise.all([
  readFile(source, 'utf8').then(JSON.parse),
  readFile(lockSource, 'utf8').then(JSON.parse)
])

const categoryOf = (field) => {
  const key = field.path
  if (key === 'proxies' || key.startsWith('proxies.')) return 'proxies'
  if (key === 'proxy-groups' || key.startsWith('proxy-groups.')) return 'proxy-groups'
  if (/^(proxy-providers|rule-providers)(\.|$)/.test(key)) return 'providers'
  if (/^(rules|sub-rules)(\.|$)/.test(key)) return 'rules'
  if (key === 'dns' || key.startsWith('dns.')) return 'dns'
  if (key === 'sniffer' || key.startsWith('sniffer.')) return 'sniffer'
  if (key === 'profile' || key.startsWith('profile.')) return 'profile'
  if (key === 'ntp' || key.startsWith('ntp.')) return 'ntp'
  if (key === 'experimental' || key.startsWith('experimental.')) return 'experimental'
  if (key.startsWith('tls.')) return 'security'
  if (/^(tun|listeners|tunnels)(\.|$)/.test(key)) return 'inbound'
  if (/^(allow-lan|authentication|bind-address|port|socks-port|redir-port|tproxy-port|mixed-port|skip-auth-prefixes|lan-allowed-ips|lan-disallowed-ips|inbound-tfo|inbound-mptcp|interface-name|routing-mark|iptables\.)/.test(key)) return 'inbound'
  if (/^(ss-config|vmess-config|tuic-server)(\.|$)/.test(key)) return 'inbound'
  return 'general'
}

const baseStatus = {
  keep: 'supported',
  force: 'limited',
  split: 'limited',
  apple: 'limited',
  default: 'limited',
  strip: 'unsupported',
  na: 'na'
}

const isAdvanced = (key) => /^(allow-lan|authentication|bind-address|port|socks-port|mixed-port|skip-auth-prefixes|lan-allowed-ips|lan-disallowed-ips|inbound-tfo|inbound-mptcp|listeners|tunnels|ss-config|vmess-config|tuic-server|external-controller|external-ui|external-doh-server|secret|tls\.)/.test(key)
  || /^dns\.listen$/.test(key)

const noteFor = (key, category, status, platform) => {
  if (status === 'na') return 'other-platform-only'
  if (key === 'tun.stack') return 'tun-stacks'
  if (key === 'interface-name' || key === 'routing-mark' || key.startsWith('iptables.')) return 'not-apple-routing'
  if (key === 'external-controller-unix' && platform === 'tvos') return 'no-unix-socket-tvos'
  if (category === 'providers') return platform === 'tvos' ? 'provider-clearable-cache' : 'client-managed-provider'
  if (category === 'profile' && platform === 'tvos') return 'clearable-storage'
  if (category === 'ntp') return key === 'ntp.write-to-system' ? 'cannot-write-system-clock' : 'clock-offset-only'
  if (category === 'experimental') return 'advanced-no-product-promise'
  if (category === 'inbound' && key.startsWith('tun.')) return 'apple-network-extension'
  if (isAdvanced(key)) return 'advanced-local-service'
  if (/^(geodata|geox|geo-auto-update|geo-update-interval)/.test(key)) return platform === 'tvos'
    ? 'clearable-geodata'
    : 'managed-geodata'
  if (status === 'unsupported') return 'not-consumed-on-apple'
  if (status === 'limited') return 'hako-managed-value'
  return 'core-supported'
}

const platformStatus = (field, platform) => {
  const key = field.path
  const category = categoryOf(field)
  let status = baseStatus[field.disposition] || 'limited'

  if (isAdvanced(key) && status !== 'na') status = 'advanced'
  if (category === 'experimental' && status !== 'na') status = 'advanced'
  if (category === 'providers' && status !== 'na') status = 'limited'
  if (category === 'ntp' && status !== 'na') status = key === 'ntp.write-to-system' ? 'unsupported' : 'limited'
  if (category === 'inbound' && key.startsWith('tun.') && status === 'supported') status = 'limited'
  if (/^(geodata|geox|geo-auto-update|geo-update-interval)/.test(key) && status !== 'na') status = 'limited'
  if ((key === 'interface-name' || key === 'routing-mark') && status !== 'na') status = 'unsupported'
  if (key === 'external-controller-unix' && platform === 'tvos') status = 'unsupported'
  if (category === 'profile') status = platform === 'tvos' ? 'limited' : 'supported'
  if (key === 'find-process-mode') status = platform === 'macos' ? 'supported' : 'unsupported'
  if (key === 'tun.stack') status = 'supported'

  return { status, note: noteFor(key, category, status, platform) }
}

const fields = inventory.fields
  .map((field) => ({
    path: field.path,
    type: field.goType,
    category: categoryOf(field),
    ios: platformStatus(field, 'ios'),
    macos: platformStatus(field, 'macos'),
    tvos: platformStatus(field, 'tvos')
  }))
  .sort((a, b) => a.category.localeCompare(b.category) || a.path.localeCompare(b.path))

const snapshot = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString().slice(0, 10),
  product: {
    hakoCoreRevision: sdkLock.coreRevision,
    mihomoVersion: sdkLock.coreVersion,
    deploymentTargets: { ios: '15.0', macos: '13.0', tvos: '17.0' }
  },
  upstream: {
    metaDocsRevision: 'e848aefb77e0cddbf3f0dde1016ec4904924fcbd',
    url: 'https://github.com/MetaCubeX/Meta-Docs/tree/e848aefb77e0cddbf3f0dde1016ec4904924fcbd/docs/config'
  },
  source: {
    scope: inventory.scope,
    schemaVersion: inventory.schemaVersion,
    fieldCount: inventory.fields.length,
    note: 'Generated from the current Hako configuration inventory.'
  },
  fields
}

await mkdir(path.dirname(target), { recursive: true })
await writeFile(target, `${JSON.stringify(snapshot, null, 2)}\n`)
console.log(`Wrote ${fields.length} fields to ${target}`)
