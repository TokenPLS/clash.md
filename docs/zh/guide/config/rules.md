---
title: 规则与流量嗅探
description: Hako 的 mihomo 路由规则、子规则、进程身份与 Sniffer 配置参考，说明 Apple 三平台差异。
---

# 规则与流量嗅探

域名、IP、端口、网络类型、逻辑组合、Rule Provider、子规则和最终 `MATCH`
在三端由 Hako 内核处理。Sniffer 可辅助恢复域名，但不会创造 Apple 系统没有
提供的 App 或进程身份。

## 身份规则的真实边界

| 规则元数据 | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| 进程名、进程路径 | 不匹配 | 支持 | 不匹配 |
| UID | 不支持 | 支持 | 不支持 |
| App signing / team ID | 不支持 | 不支持 | 不支持 |
| Per-App VPN / MDM | 不由 YAML 配置 | 不由 YAML 配置 | 不由 YAML 配置 |

iOS / tvOS 会保留可解析的 `PROCESS-*` 规则，但它们没有匹配所需的系统元数据；
不要把“配置能导入”误解为“规则会命中”。

<ConfigFieldMatrix lang="zh" category="rules" />
<ConfigFieldMatrix lang="zh" category="sniffer" />
