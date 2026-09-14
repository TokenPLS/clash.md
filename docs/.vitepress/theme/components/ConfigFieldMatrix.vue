<script setup lang="ts">
import { computed, ref } from 'vue'
import snapshot from '../../data/config-reference.json'
import tunAudit from '../../data/tun-reference.json'
import fieldAudit from '../../data/config-field-audit.json'

const reviewedFields = new Map(fieldAudit.fields.map((field) => [field.path, field]))

const tunFields = new Map(tunAudit.fields.map((field) => [field.path, field]))

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

const t = computed(() => copy[props.lang])
const fields = computed(() => snapshot.fields.filter((field) => !props.category || field.category === props.category))
const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  return fields.value.filter((field) => {
    if (needle && !field.path.toLowerCase().includes(needle) && !field.type.toLowerCase().includes(needle)) return false
    if (status.value !== 'all') {
      if (platform.value === 'all') {
        if (!(['ios', 'macos', 'tvos'] as const).some((key) => field[key].status === status.value)) return false
      } else if (field[platform.value].status !== status.value) return false
    }
    return true
  })
})

const statusText = (value: Status) => t.value[value]
const fieldTypeText = (value: string) => {
  if (value === 'bool') return props.lang === 'zh' ? '布尔值' : 'Boolean'
  if (/^(u?int)(32|64)?$/.test(value)) return props.lang === 'zh' ? '整数' : 'Integer'
  if (value.startsWith('[]')) return props.lang === 'zh' ? '列表' : 'List'
  if (value.includes('map') || value.includes('OrderedMap')) return props.lang === 'zh' ? '映射' : 'Mapping'
  return props.lang === 'zh' ? '字符串' : 'String'
}
const noteText = (field: typeof snapshot.fields[number]) => {
  const reviewed = reviewedFields.get(field.path)
  return reviewed ? reviewed[props.lang] : ''
}

</script>

<template>
  <div class="config-matrix">
    <div v-if="fields.length > 6" class="config-matrix__controls">
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
    <p v-if="!category || category === 'inbound'">
      <template v-if="lang === 'zh'">部分 TUN 设置随版本变化。<a href="/zh/guide/config/inbound#scope">查看 TUN 使用说明</a>。</template>
      <template v-else>Some TUN settings vary by version. <a href="/guide/config/inbound#scope">TUN guide and version notes</a>.</template>
    </p>
    <p class="config-matrix__count" aria-live="polite">{{ filtered.length }} {{ t.shown }}</p>
    <div class="config-matrix__table-wrap">
      <table v-if="filtered.length" class="config-matrix__table">
        <thead><tr><th>{{ t.field }}</th><th>{{ t.type }}</th><th>iOS</th><th>macOS</th><th>tvOS</th><th>{{ t.notes }}</th></tr></thead>
        <tbody>
          <tr v-for="field in filtered" :key="field.path">
            <td><code>{{ field.path }}</code></td>
            <td>{{ fieldTypeText(field.type) }}</td>
            <td v-for="key in (['ios', 'macos', 'tvos'] as const)" :key="key">
              <span class="config-status" :class="`config-status--${field[key].status}`">{{ statusText(field[key].status as Status) }}</span>
            </td>
            <td>
              <a v-if="tunFields.has(field.path)" :href="`${lang === 'zh' ? '/zh' : ''}/guide/config/inbound#fields`">{{ lang === 'zh' ? '查看 TUN 使用说明' : 'See TUN field guide' }}</a>
              <template v-else>{{ noteText(field) }}</template>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="config-matrix__empty">{{ t.empty }}</p>
    </div>
  </div>
</template>
