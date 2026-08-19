---
title: Hako 配置参考
description: Hako 1.19.30 的 mihomo YAML 配置参考，覆盖 185 个字段及 iOS、macOS、tvOS 的支持状态与 Apple 平台限制。
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

这份参考适合在需要时查询 mihomo YAML。第一次配置时，不必从 185 个字段
开始；可以先看[最佳实践模板](/zh/guide/config/best-practice)，遇到明确需求时
再回来查对应字段。

::: tip 先让配置保持简单
一份来源可信、结构清楚、只包含实际需要内容的配置，比堆满“优化参数”更容易
验证，也更不容易在系统升级后出现意外行为。
:::

## 按主题阅读

<nav class="config-topic-grid" aria-label="配置参考分类">
  <a href="/zh/guide/config/general"><strong>常规设置</strong><span>模式、日志、连接与 geodata</span></a>
  <a href="/zh/guide/config/dns"><strong>DNS</strong><span>Fake IP、解析器与策略</span></a>
  <a href="/zh/guide/config/inbound"><strong>入站与 TUN</strong><span>Network Extension 的真实边界</span></a>
  <a href="/zh/guide/config/proxies"><strong>代理与 Provider</strong><span>节点、策略组与远程资源</span></a>
  <a href="/zh/guide/config/rules"><strong>规则与嗅探</strong><span>路由、身份字段与 Sniffer</span></a>
  <a href="/zh/guide/config/profile"><strong>状态与高级项</strong><span>运行状态、NTP 与实验功能</span></a>
  <a href="/zh/guide/config/apple-platforms"><strong>三平台差异</strong><span>iOS、macOS 与 tvOS</span></a>
  <a href="/zh/guide/config/security"><strong>安全边界</strong><span>凭据、监听器与控制面</span></a>
</nav>

## 字段支持状态

- **支持**：Hako 内核直接处理。
- **受管理 / 有限制**：字段可读取，但会因 Apple 网络模型被修复、强制或替换。
- **高级功能**：内核可以识别，但可能开放本地服务或控制面，不作为默认产品能力。
- **不支持**：在 Apple Packet Tunnel 中被移除或不会生效。
- **不适用**：属于 Android、Linux 或其他环境。

<ConfigFieldMatrix lang="zh" />

## 版本与依据

本页对应产品内核 **Hako / mihomo 1.19.30**，字段清单来自当前 Hako 配置
流水线，并参考固定版本的
[MetaCubeX 配置文档](https://github.com/MetaCubeX/Meta-Docs/tree/e848aefb77e0cddbf3f0dde1016ec4904924fcbd/docs/config)。
上游文档用于理解 mihomo 语义；本页的平台状态以 Hako 的实际适配与验证为准。

字段范围会随 Hako 稳定版本与 Apple 平台适配持续更新。
