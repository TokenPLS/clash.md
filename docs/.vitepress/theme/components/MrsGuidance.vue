<script setup lang="ts">
import { Check, X } from '@lucide/vue'
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
      <strong :id="isZh ? 'mrs-guidance-title-zh' : 'mrs-guidance-title-en'">
        {{ isZh ? 'iOS：大型规则集优先使用 MRS' : 'iOS: prefer MRS for large rule sets' }}
      </strong>
    </header>

    <div class="mrs-guidance__body">
      <p class="mrs-guidance__lead" v-if="isZh">
          iOS 上加载大型文本规则集，很容易顶到 Network Extension 的内存限制。常见表现是配置启动失败、
          连接突然断开，或者代理进程被系统结束。
      </p>
      <p class="mrs-guidance__lead" v-else>
          On iOS, large text rule sets can exhaust the Network Extension's memory. Common symptoms include
          startup failures, dropped connections, or iOS terminating the proxy process.
      </p>

      <p class="mrs-guidance__definition" v-if="isZh">
        这里说的“文本规则集”不是你导入 Clash 的整份配置，而是 <code>rule-providers</code>
        下载的规则文件。配置里看到 <code>format: yaml</code> 或 <code>format: text</code>，而且文件很大或数量
        很多，就要留意。这类文件常用 <code>.yaml</code>、<code>.yml</code> 或 <code>.txt</code> 后缀。
      </p>
      <p class="mrs-guidance__definition" v-else>
        “Text rule sets” are not the complete configuration you import into Clash. They are files downloaded by
        <code>rule-providers</code>. Watch for large or numerous files using
        <code>format: yaml</code> or <code>format: text</code>, often with <code>.yaml</code>, <code>.yml</code>,
        or <code>.txt</code> extensions.
      </p>

      <div class="mrs-guidance__comparison" :aria-label="isZh ? '规则集格式对照' : 'Rule-set format comparison'">
        <section class="mrs-format-card mrs-format-card--avoid">
          <div class="mrs-format-card__title">
            <X
              class="mrs-format-card__icon mrs-format-card__icon--avoid"
              :size="18"
              :stroke-width="2.25"
              aria-hidden="true"
            />
            <strong>{{ isZh ? '不建议：大型 YAML / text 规则' : 'Avoid: large YAML / text rules' }}</strong>
          </div>
          <pre><code>{{ avoidExample }}</code></pre>
          <p v-if="isZh">
            大型 <code>format: yaml</code> / <code>format: text</code> 文件会在启动时逐条解析并展开到内存。
          </p>
          <p v-else>
            Large <code>format: yaml</code> or <code>format: text</code> files are parsed and expanded in memory at startup.
          </p>
        </section>

        <section class="mrs-format-card mrs-format-card--prefer">
          <div class="mrs-format-card__title">
            <Check
              class="mrs-format-card__icon mrs-format-card__icon--prefer"
              :size="18"
              :stroke-width="2.25"
              aria-hidden="true"
            />
            <strong>{{ isZh ? '建议：有 MRS 就优先用' : 'Prefer: MRS when available' }}</strong>
          </div>
          <pre><code>{{ preferExample }}</code></pre>
          <p v-if="isZh">
            <code>domain</code> 和 <code>ipcidr</code> 规则有 MRS 版本时，使用真实的 <code>.mrs</code> 文件及
            <code>format: mrs</code>。
          </p>
          <p v-else>
            For <code>domain</code> and <code>ipcidr</code> rules, use a real <code>.mrs</code> file with
            <code>format: mrs</code> when one is available.
          </p>
        </section>
      </div>

      <div class="mrs-guidance__copy">
        <p v-if="isZh">
          Clash 的代理内核运行在 Network Extension 里。Apple 没有公布一个适用于所有 iPhone、iPad 的固定
          内存上限。按社区长期反馈和我们的多轮真机测试，可以把可用空间理解为<strong>约 50 MiB</strong>。
          这不是 Apple 的官方数字；机型、系统版本和当时的运行状态都会影响结果。
          <br />
          YAML/text 规则在启动时要逐条解析，再展开成匹配结构。文件看起来不大，加载后的内存占用也可能高出
          很多；同时叠加几份，就容易把代理扩展挤爆。MRS 是 mihomo 的预编译二进制格式，省掉不少解析和临时
          内存。iOS 上用 MRS，主要是为了少占内存、运行更稳，不只是启动快一点。
          <br />
          官网三份配置已经在能用 MRS 的地方用了 MRS。自己修改时，不要再换回大型 YAML/text 规则，也别重复
          堆叠内容相近的规则集。MRS 只支持 <code>domain</code> 和 <code>ipcidr</code>；不能把
          <code>classical</code> 规则或普通文本文件直接改成 <code>.mrs</code> 后缀使用，
          <code>behavior</code>、<code>format</code> 和实际文件内容必须匹配。详见
          <a href="https://wiki.metacubex.one/config/rule-providers/#format">mihomo 的 MRS 格式说明</a>。
        </p>
        <p v-else>
          Clash's proxy core runs inside a Network Extension. Apple does not publish one fixed memory limit that applies
          to every iPhone and iPad. Based on long-running community reports and our repeated device testing, a practical
          figure is <strong>about 50 MiB</strong> of usable memory. This is not an official Apple number; it varies with
          the device, OS release, and runtime conditions.
          <br />
          YAML/text rules are parsed entry by entry and expanded into matching structures at startup. Their memory use
          can be much larger than the downloaded files, and several large sets can quickly exhaust the extension's
          budget. MRS is mihomo's precompiled binary format, so it needs less parsing and temporary memory. On iOS, the
          main benefit is lower memory use and better stability, not merely faster loading.
          <br />
          The three configurations on this site already use MRS where it fits. Do not switch those entries back to large
          YAML/text rules or stack several overlapping sets. MRS supports only <code>domain</code> and <code>ipcidr</code>;
          a <code>classical</code> rule set or ordinary text file does not become MRS just because it is renamed.
          <code>behavior</code>, <code>format</code>, and the file contents must agree. See the
          <a href="https://wiki.metacubex.one/en/config/rule-providers/#format">mihomo MRS format reference</a>.
        </p>
      </div>

      <p class="mrs-guidance__mac" v-if="isZh">
        macOS：限制宽松得多，但大型规则集仍建议优先使用 MRS，省内存，也省解析时间。
      </p>
      <p class="mrs-guidance__mac" v-else>
        macOS: the limit is much less restrictive, but MRS is still the better choice for large rule sets
        because it saves both memory and parsing time.
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
}

.mrs-guidance__header {
  display: flex;
  align-items: center;
  padding: 15px 22px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.mrs-guidance__header strong {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.mrs-guidance__body {
  padding: 22px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.75;
}

.mrs-guidance__lead {
  margin: 0 0 12px;
}

.mrs-guidance__definition {
  margin: 0;
  color: var(--vp-c-text-2);
}

.mrs-guidance__comparison {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.mrs-format-card {
  min-width: 0;
  padding: 18px 20px 18px 0;
}

.mrs-format-card + .mrs-format-card {
  padding-right: 0;
  padding-left: 20px;
  border-left: 1px solid var(--vp-c-divider);
}

.mrs-format-card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.mrs-format-card__title strong {
  font-weight: 600;
}

.mrs-format-card__icon {
  flex: 0 0 auto;
}

.mrs-format-card__icon--avoid {
  color: #d45460;
}

.mrs-format-card__icon--prefer {
  color: #26976b;
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
  color: var(--vp-c-text-2);
}

.mrs-guidance__copy p {
  margin: 0;
}

.mrs-guidance__copy strong {
  color: inherit;
  font-weight: 600;
}

.mrs-guidance__mac {
  margin: 18px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.mrs-guidance code {
  border-radius: 4px;
  color: var(--vp-code-color);
}

.mrs-guidance p code {
  padding: 0;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
}

.mrs-guidance a {
  color: inherit;
  font-weight: inherit;
  text-decoration: underline;
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

  .mrs-format-card {
    padding: 18px 0;
  }

  .mrs-format-card + .mrs-format-card {
    padding: 18px 0;
    border-top: 1px solid var(--vp-c-divider);
    border-left: 0;
  }
}
</style>
