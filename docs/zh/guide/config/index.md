---
title: Hako 配置参考
description: Hako 1.19.30 的 mihomo YAML 配置参考，提供 185 项配置索引及 iOS、macOS、tvOS 的支持状态与 Apple 平台限制。
keywords: [Hako 配置, mihomo YAML, Clash 配置, iOS Clash, macOS Clash, tvOS Clash]
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/config/
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/config/
---

# Hako 配置参考

这份参考适合在需要时查询 mihomo YAML。第一次配置时，不必从字段清单
开始；可以先看[最佳实践模板](/zh/guide/config/best-practice)，遇到明确需求时
再回来查对应字段。

::: tip 先让配置保持简单
一份来源可信、结构清楚、只包含实际需要内容的配置，比堆满“优化参数”更容易
验证，也更不容易在系统升级后出现意外行为。
:::

## 按主题阅读

以下分类与 [mihomo 上游配置文档](https://wiki.metacubex.one/config/) 的主要章节一一对应。每页说明相关配置在 Hako 中的使用方式和平台限制。

<nav class="config-topic-grid" aria-label="配置参考分类">
  <a href="/zh/guide/config/general"><strong>全局配置</strong><span>模式、日志与连接</span></a>
  <a href="/zh/guide/config/dns"><strong>DNS</strong><span>域名解析与策略</span></a>
  <a href="/zh/guide/config/sniffer"><strong>域名嗅探</strong><span>协议识别与域名获取</span></a>
  <a href="/zh/guide/config/inbounds"><strong>入站</strong><span>代理端口、TUN 与 listeners</span></a>
  <a href="/zh/guide/config/proxies"><strong>出站代理</strong><span>节点类型与协议参数</span></a>
  <a href="/zh/guide/config/proxy-providers"><strong>代理集合</strong><span>加载和更新节点资源</span></a>
  <a href="/zh/guide/config/proxy-groups"><strong>代理组</strong><span>手动选择与自动切换</span></a>
  <a href="/zh/guide/config/rules"><strong>路由规则</strong><span>按条件选择流量出口</span></a>
  <a href="/zh/guide/config/rule-providers"><strong>规则集合</strong><span>加载和更新规则资源</span></a>
  <a href="/zh/guide/config/sub-rules"><strong>子规则</strong><span>组织可引用的规则</span></a>
  <a href="/zh/guide/config/tunnels"><strong>流量隧道</strong><span>端口转发</span></a>
  <a href="/zh/guide/config/ntp"><strong>NTP</strong><span>协议时间同步</span></a>
  <a href="/zh/guide/config/experimental"><strong>实验性配置</strong><span>按需使用的实验选项</span></a>
</nav>

补充说明：[三平台差异](./apple-platforms) · [安全说明](./security)

## 字段支持状态

- **支持**：可以使用，具体条件见字段说明。
- **受管理 / 有限制**：会受客户端设置、平台能力或兼容处理影响。
- **高级功能**：用于进阶用途，如本地服务或自定义证书，按需设置。
- **不支持**：在 Apple Packet Tunnel 中被移除或不会生效。
- **不适用**：属于 Android、Linux 或其他环境。

<ConfigFieldMatrix lang="zh" />

## 版本说明

本页提供 185 项配置索引；`proxies`、`listeners` 等项目下的协议参数，请查对应专题。
部分行为随版本变化，以已安装版本提供的功能为准。

::: details 文档参考版本

2026-09-14 按 Hako `5bca0bcb73cd6dcb2d276be31f3a149211388c6d` 整理。
此参考版本不代表所有商店版本均已包含相同功能。

:::
