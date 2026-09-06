<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ lang?: 'en' | 'zh' }>(), {
  lang: 'en'
})

const isZh = computed(() => props.lang === 'zh')

const avoidExample = `rule-providers:
  example:
    behavior: domain
    format: yaml
    url: https://…/rules.yaml`

const preferExample = `rule-providers:
  example:
    behavior: domain
    format: mrs
    url: https://…/rules.mrs`
</script>

<template>
  <aside
    class="mrs-guidance"
    :aria-labelledby="isZh ? 'mrs-guidance-title-zh' : 'mrs-guidance-title-en'"
  >
    <header class="mrs-guidance__header">
      <span class="mrs-guidance__eyebrow">{{ isZh ? 'iOS 稳定性' : 'iOS stability' }}</span>
      <strong :id="isZh ? 'mrs-guidance-title-zh' : 'mrs-guidance-title-en'">
        {{ isZh ? '大型规则集，请优先使用 MRS' : 'Prefer MRS for large rule sets' }}
      </strong>
    </header>

    <div class="mrs-guidance__body">
      <p class="mrs-guidance__lead">
        <strong v-if="isZh">
          大型文本规则集是 iOS 出现内存不足、配置启动失败或代理扩展被系统终止的常见原因之一。
        </strong>
        <strong v-else>
          Large text rule sets are a common cause of memory pressure, configuration startup failures,
          or system termination of the proxy extension on iOS.
        </strong>
      </p>

      <div class="mrs-guidance__definition">
        <span>{{ isZh ? '先说清楚' : 'What “text rule set” means' }}</span>
        <p v-if="isZh">
          这里说的“文本规则集”<strong>不是你导入 Clash 的主配置 <code>.yaml</code></strong>，而是主配置中
          <code>rule-providers</code> 引用的规则文件。应重点留意 <code>format: yaml</code> 或
          <code>format: text</code>；它们常见的文件后缀是 <code>.yaml</code>、<code>.yml</code> 或
          <code>.txt</code>。
        </p>
        <p v-else>
          A “text rule set” is <strong>not the main <code>.yaml</code> configuration you import into
          Clash</strong>. It is a rule file referenced by <code>rule-providers</code>. Pay particular
          attention to <code>format: yaml</code> and <code>format: text</code>, commonly delivered as
          <code>.yaml</code>, <code>.yml</code>, or <code>.txt</code> files.
        </p>
      </div>

      <div class="mrs-guidance__comparison" :aria-label="isZh ? '规则集格式对照' : 'Rule-set format comparison'">
        <section class="mrs-format-card mrs-format-card--avoid">
          <div class="mrs-format-card__title">
            <strong>{{ isZh ? 'iOS 上避免大型文本规则集' : 'Avoid large text rule sets on iOS' }}</strong>
          </div>
          <pre><code>{{ avoidExample }}</code></pre>
          <p v-if="isZh">
            大型 <code>format: yaml</code> / <code>format: text</code> 规则文件会在启动时逐条解析并展开到内存。
          </p>
          <p v-else>
            Large <code>format: yaml</code> or <code>format: text</code> files are parsed and expanded in memory at startup.
          </p>
        </section>

        <section class="mrs-format-card mrs-format-card--prefer">
          <div class="mrs-format-card__title">
            <strong>{{ isZh ? '适用时优先 MRS' : 'Prefer MRS where supported' }}</strong>
          </div>
          <pre><code>{{ preferExample }}</code></pre>
          <p v-if="isZh">
            <code>domain</code> 和 <code>ipcidr</code> 规则优先选择真实的 <code>.mrs</code> 文件及
            <code>format: mrs</code>。
          </p>
          <p v-else>
            For <code>domain</code> and <code>ipcidr</code> rules, prefer a real <code>.mrs</code> file with
            <code>format: mrs</code>.
          </p>
        </section>
      </div>

      <div class="mrs-guidance__copy">
        <p v-if="isZh">
          Clash 的代理内核运行在受系统严格限制的 Network Extension 中。Apple 并未在公开文档中承诺一个
          适用于所有 iOS 版本和设备的统一固定上限；但结合社区长期反馈与我们的多轮真机验证，iOS 上的此类
          隧道扩展通常只有<strong>约 50 MiB</strong> 的可用内存空间。这是经验范围，不是 Apple 的官方保证，
          具体结果会随设备、系统版本和运行状态变化。
        </p>
        <p v-else>
          Clash's proxy core runs inside a Network Extension with a strict system memory budget. Apple does not promise
          one fixed limit in its public documentation for every iOS version and device. However, long-running community
          reports and our repeated testing on physical devices indicate that this kind of iOS tunnel extension commonly
          has only <strong>about 50 MiB</strong> of usable memory. This is an observed range, not an Apple guarantee, and
          varies by device, OS release, and runtime conditions.
        </p>

        <p v-if="isZh">
          文本规则集需要逐条解析，并建立用于匹配的内存结构；同时加载多个大型规则集时，实际内存占用可能
          远高于文件本身的大小。MRS 是 mihomo 的预编译二进制规则集格式，可以减少文本解析、启动时临时分配
          和长期内存压力。因此，在 iOS 上优先使用 MRS，<strong>首先是稳定性要求，其次才是加载速度优化</strong>。
        </p>
        <p v-else>
          Text rule sets must be parsed entry by entry and expanded into in-memory matching structures. Several large
          sets can therefore consume far more memory than their download sizes suggest. MRS is mihomo's precompiled
          binary rule-set format, reducing parsing, temporary startup allocations, and sustained memory pressure. On
          iOS, MRS is <strong>first a stability requirement and only secondarily a loading-speed optimization</strong>.
        </p>

        <p v-if="isZh">
          官网三份配置已在适合的规则集中优先使用 MRS。自定义时，不要把这些 MRS 换回大型 YAML/text 规则文件，
          也不要无目的叠加多个内容相近的大型规则集。MRS 目前只适用于 <code>domain</code> 和 <code>ipcidr</code>；
          不能把 <code>classical</code> 规则或普通文本文件直接改成 <code>.mrs</code> 后缀使用，
          <code>behavior</code>、<code>format</code> 和实际文件内容必须匹配。详见
          <a href="https://wiki.metacubex.one/config/rule-providers/#format">mihomo 的 MRS 格式说明</a>。
        </p>
        <p v-else>
          The three configurations on this site already prefer MRS for suitable rule sets. Do not replace those files
          with large YAML/text rule sets or stack several substantially overlapping sets without a reason. MRS supports
          only <code>domain</code> and <code>ipcidr</code>; you cannot convert a <code>classical</code> rule set or ordinary
          text file merely by renaming it to <code>.mrs</code>. The <code>behavior</code>, <code>format</code>, and actual
          file content must agree. See the
          <a href="https://wiki.metacubex.one/en/config/rule-providers/#format">mihomo MRS format reference</a>.
        </p>
      </div>

      <p class="mrs-guidance__mac" v-if="isZh">
        <strong>macOS：</strong>内存限制通常没有 iOS Network Extension 那么严格，但大型规则集仍建议优先使用
        MRS，以减少解析工作和内存占用。
      </p>
      <p class="mrs-guidance__mac" v-else>
        <strong>macOS:</strong> its memory budget is generally less restrictive than an iOS Network Extension, but large
        rule sets should still prefer MRS to reduce parsing work and memory use.
      </p>
    </div>
  </aside>
</template>

<style scoped>
.mrs-guidance {
  margin: 20px 0 34px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  box-shadow: 0 12px 34px rgba(15, 23, 42, 0.06);
}

.mrs-guidance__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 22px;
  background: linear-gradient(110deg, #a62b3c, #c84251);
  color: #fff;
}

.mrs-guidance__header strong {
  font-size: 18px;
  line-height: 1.4;
}

.mrs-guidance__eyebrow {
  flex: 0 0 auto;
  padding: 3px 8px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
}

.mrs-guidance__body {
  padding: 22px;
  color: var(--vp-c-text-1);
}

.mrs-guidance__lead {
  margin: 0 0 18px;
  font-size: 17px;
  line-height: 1.75;
}

.mrs-guidance__definition {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 15px 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 25%, var(--vp-c-divider));
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-brand-soft) 42%, var(--vp-c-bg));
}

.mrs-guidance__definition > span {
  margin-top: 2px;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.mrs-guidance__definition p,
.mrs-format-card p,
.mrs-guidance__copy p,
.mrs-guidance__mac {
  margin: 0;
}

.mrs-guidance__definition p,
.mrs-format-card p,
.mrs-guidance__copy,
.mrs-guidance__mac {
  font-size: 14px;
  line-height: 1.75;
}

.mrs-guidance__comparison {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 16px 0 20px;
}

.mrs-format-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.mrs-format-card--avoid {
  border-top: 3px solid #d45460;
}

.mrs-format-card--prefer {
  border-top: 3px solid #26976b;
}

.mrs-format-card__title {
  margin-bottom: 12px;
  font-size: 14px;
}

.mrs-format-card pre {
  margin: 0 0 12px;
  overflow-x: auto;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  padding: 12px;
}

.mrs-format-card pre code {
  display: block;
  padding: 0;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 12px;
  line-height: 1.55;
  white-space: pre;
}

.mrs-guidance__copy {
  display: grid;
  gap: 12px;
  color: var(--vp-c-text-2);
}

.mrs-guidance__copy strong {
  color: var(--vp-c-text-1);
}

.mrs-guidance__mac {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.mrs-guidance code {
  border-radius: 4px;
  color: var(--vp-code-color);
}

.mrs-guidance a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

@media (max-width: 700px) {
  .mrs-guidance__header {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    padding: 15px 18px;
  }

  .mrs-guidance__header strong {
    font-size: 17px;
  }

  .mrs-guidance__body {
    padding: 18px;
  }

  .mrs-guidance__definition,
  .mrs-guidance__comparison {
    grid-template-columns: 1fr;
  }

  .mrs-guidance__definition {
    gap: 6px;
  }
}
</style>
