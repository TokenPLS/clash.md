<script setup lang="ts">
import { computed, ref } from 'vue'
import snapshot from '../../data/config-reference.json'

type Locale = 'en' | 'zh'
type Platform = 'all' | 'ios' | 'macos' | 'tvos'
type Status = 'supported' | 'limited' | 'advanced' | 'unsupported' | 'na'

const props = withDefaults(defineProps<{ lang?: Locale; category?: string }>(), {
  lang: 'en',
  category: ''
})

const query = ref('')
const platform = ref<Platform>('all')
const status = ref<'all' | Status>('all')

const copy = {
  en: {
    search: 'Search configuration fields', platform: 'Platform', status: 'Status', all: 'All',
    field: 'Field', type: 'Type', notes: 'Platform notes', shown: 'fields shown', empty: 'No matching fields.',
    supported: 'Supported', limited: 'Managed / limited', advanced: 'Advanced', unsupported: 'Unsupported', na: 'Not applicable'
  },
  zh: {
    search: '搜索配置字段', platform: '平台', status: '状态', all: '全部',
    field: '字段', type: '类型', notes: '平台说明', shown: '个字段', empty: '没有匹配的字段。',
    supported: '支持', limited: '受管理 / 有限制', advanced: '高级功能', unsupported: '不支持', na: '不适用'
  }
} as const

const notes: Record<Locale, Record<string, string>> = {
  en: {
    'core-supported': 'Consumed by the Hako core.',
    'hako-managed-value': 'Accepted, but Hako may force, repair, split, or replace the value for Apple networking.',
    'not-consumed-on-apple': 'Removed or not consumed in the Apple Packet Tunnel runtime.',
    'other-platform-only': 'Belongs to Android, Linux, or another non-Apple environment.',
    'not-apple-routing': 'Linux-style interface, mark, or iptables routing is unavailable in Apple Packet Tunnel.',
    'no-unix-socket-tvos': 'Unix-domain controller sockets are unavailable on tvOS.',
    'client-managed-provider': 'Hako downloads, validates, and materializes remote content in a product-managed path.',
    'provider-clearable-cache': 'Hako manages this provider cache; tvOS may clear it and the app must be able to rebuild it.',
    'clearable-storage': 'Small state can persist, but tvOS file-backed data must be treated as clearable.',
    'cannot-write-system-clock': 'Hako never writes the Apple system clock.',
    'clock-offset-only': 'Used as protocol time offset; it does not change the Apple system clock.',
    'advanced-no-product-promise': 'Parsed by the core, but not a stable product-level promise.',
    'apple-network-extension': 'Apple Network Extension owns routes and interfaces; Hako may force or ignore desktop TUN fields.',
    'advanced-local-service': 'Can expose a listener or control surface. Use only with explicit access control and strong credentials.',
    'managed-geodata': 'Available through Hako-managed resources; manual paths and update behavior are platform-dependent.',
    'clearable-geodata': 'Uses Hako-managed, memory-conscious resources; tvOS caches may be cleared.'
  },
  zh: {
    'core-supported': '由 Hako 内核直接处理。',
    'hako-managed-value': '可以读取，但 Hako 可能为适配 Apple 网络强制、修复、拆分或替换该值。',
    'not-consumed-on-apple': '在 Apple Packet Tunnel 运行环境中被移除或不会被处理。',
    'other-platform-only': '属于 Android、Linux 或其他非 Apple 环境。',
    'not-apple-routing': 'Apple Packet Tunnel 不提供 Linux 式接口、mark 或 iptables 路由。',
    'no-unix-socket-tvos': 'tvOS 不提供 Unix 域控制器套接字。',
    'client-managed-provider': '远程内容由 Hako 下载、校验并写入产品管理的安全路径。',
    'provider-clearable-cache': 'Provider 缓存由 Hako 管理；tvOS 可能清理缓存，App 必须能够重新生成。',
    'clearable-storage': '少量状态可以保留，但 tvOS 的文件数据必须按“可能被清理”设计。',
    'cannot-write-system-clock': 'Hako 不会修改 Apple 设备的系统时间。',
    'clock-offset-only': '仅用于协议时间偏移，不会修改 Apple 设备的系统时间。',
    'advanced-no-product-promise': '内核可以解析，但不作为稳定的产品能力承诺。',
    'apple-network-extension': '路由和接口由 Apple Network Extension 管理；Hako 可能强制或忽略桌面 TUN 字段。',
    'advanced-local-service': '可能开放监听或控制面；仅在明确控制访问并设置强凭据时使用。',
    'managed-geodata': '通过 Hako 管理的资源使用；手动路径和更新行为依平台而定。',
    'clearable-geodata': '使用 Hako 管理、针对内存优化的资源；tvOS 缓存可能被清理。'
  }
}

const t = computed(() => copy[props.lang])
const fields = computed(() => snapshot.fields.filter((field) => !props.category || field.category === props.category))
const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return fields.value.filter((field) => {
    if (needle && !field.path.toLowerCase().includes(needle) && !field.type.toLowerCase().includes(needle)) return false
    if (platform.value !== 'all' && field[platform.value].status === 'na') return false
    if (status.value !== 'all') {
      if (platform.value === 'all') {
        if (!(['ios', 'macos', 'tvos'] as const).some((key) => field[key].status === status.value)) return false
      } else if (field[platform.value].status !== status.value) return false
    }
    return true
  })
})

const statusText = (value: Status) => t.value[value]
const noteText = (field: typeof snapshot.fields[number]) => {
  const keys = platform.value === 'all' ? ['ios', 'macos', 'tvos'] as const : [platform.value] as const
  const unique = [...new Set(keys.map((key) => notes[props.lang][field[key].note]))]
  return unique.join(' ')
}
</script>

<template>
  <div class="config-matrix">
    <div class="config-matrix__controls">
      <label>
        <span>{{ t.search }}</span>
        <input v-model="query" type="search" :placeholder="t.search" autocomplete="off">
      </label>
      <label>
        <span>{{ t.platform }}</span>
        <select v-model="platform">
          <option value="all">{{ t.all }}</option>
          <option value="ios">iOS / iPadOS</option>
          <option value="macos">macOS</option>
          <option value="tvos">tvOS</option>
        </select>
      </label>
      <label>
        <span>{{ t.status }}</span>
        <select v-model="status">
          <option value="all">{{ t.all }}</option>
          <option value="supported">{{ t.supported }}</option>
          <option value="limited">{{ t.limited }}</option>
          <option value="advanced">{{ t.advanced }}</option>
          <option value="unsupported">{{ t.unsupported }}</option>
          <option value="na">{{ t.na }}</option>
        </select>
      </label>
    </div>
    <p class="config-matrix__count" aria-live="polite">{{ filtered.length }} {{ t.shown }}</p>
    <div class="config-matrix__table-wrap">
      <table v-if="filtered.length" class="config-matrix__table">
        <thead><tr><th>{{ t.field }}</th><th>{{ t.type }}</th><th>iOS</th><th>macOS</th><th>tvOS</th><th>{{ t.notes }}</th></tr></thead>
        <tbody>
          <tr v-for="field in filtered" :key="field.path">
            <td><code>{{ field.path }}</code></td>
            <td><code>{{ field.type }}</code></td>
            <td v-for="key in (['ios', 'macos', 'tvos'] as const)" :key="key">
              <span class="config-status" :class="`config-status--${field[key].status}`">{{ statusText(field[key].status as Status) }}</span>
            </td>
            <td>{{ noteText(field) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="config-matrix__empty">{{ t.empty }}</p>
    </div>
  </div>
</template>
