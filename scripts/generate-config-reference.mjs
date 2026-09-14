import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const data = path.join(root, 'docs/.vitepress/data')
// Regenerate from reviewed inputs, never pair an arbitrary checkout with an unrelated SDK lock.
if (process.argv.length > 2 || process.env.HAKO_CONFIG_INVENTORY || process.env.HAKO_SDK_LOCK) {
  throw new Error('Update the reviewed config-field-audit.json and tun-reference.json inputs before generating a new reference.')
}
const [audit, tun] = await Promise.all([
  readFile(path.join(data, 'config-field-audit.json'), 'utf8').then(JSON.parse),
  readFile(path.join(data, 'tun-reference.json'), 'utf8').then(JSON.parse)
])
if (audit.sourceAuditRevision !== tun.sourceRevision) throw new Error('Source audit revisions do not match')
const platforms = ['ios', 'macos', 'tvos']
const statuses = new Set(['supported', 'limited', 'advanced', 'unsupported', 'na'])
const tunMap = new Map(tun.fields.map(field => [field.path, field]))
if (tunMap.size !== tun.fields.length || tunMap.size !== audit.tunInventory.length) throw new Error('Duplicate or missing TUN fields')
const fields = audit.fields.map(field => ({
  path: field.path, type: field.type, category: field.category,
  ...Object.fromEntries(platforms.map(platform => [platform, { status: field.platforms[platform], note: 'field-audited' }]))
})).concat(audit.tunInventory.map(field => {
  const reviewed = tunMap.get(field.path)
  if (!reviewed) throw new Error(`Unreviewed field: ${field.path}`)
  return { ...field, ...Object.fromEntries(platforms.map(platform => [platform, { status: reviewed.status, note: 'tun-audited' }])) }
})).sort((a, b) => a.category.localeCompare(b.category) || a.path.localeCompare(b.path))
if (new Set(fields.map(field => field.path)).size !== fields.length) throw new Error('Duplicate field')
for (const field of fields) {
  for (const platform of platforms) {
    if (!statuses.has(field[platform].status)) throw new Error(`Missing reviewed status: ${field.path}/${platform}`)
  }
}
const snapshot = {
  schemaVersion: 2,
  generatedAt: audit.date,
  sourceAuditRevision: audit.sourceAuditRevision,
  sdkLockRevision: audit.sdkLockRevision,
  shippedBuildVerification: audit.shippedBuildVerification,
  source: { fieldCount: fields.length, note: 'Reviewed inventory entries; container entries do not enumerate all nested protocol options.' },
  fields
}
await writeFile(path.join(data, 'config-reference.json'), `${JSON.stringify(snapshot, null, 2)}\n`)
console.log(`Wrote ${fields.length} reviewed fields`)
