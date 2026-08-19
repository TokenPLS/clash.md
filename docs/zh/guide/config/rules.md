---
title: 规则与流量嗅探
description: Hako 的 mihomo 路由规则、子规则、进程身份与 Sniffer 配置参考，说明 Apple 三平台差异。
---

# 规则与流量嗅探

域名、IP、端口、网络类型、逻辑组合、Rule Provider、子规则和最终 `MATCH`
在三端由 Hako 内核处理。Sniffer 可辅助恢复域名；进程名、路径与 UID 仅在
macOS 可用于规则匹配。

## 身份规则的平台边界

| 规则元数据 | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| 进程名、进程路径 | 不匹配 | 支持 | 不匹配 |
| UID | 不支持 | 支持 | 不支持 |
| App signing / team ID | 不支持 | 不支持 | 不支持 |
| Per-App VPN / MDM | 不由 YAML 配置 | 不由 YAML 配置 | 不由 YAML 配置 |

iOS / tvOS 可以解析 `PROCESS-*` 规则，但系统不提供匹配所需的进程元数据，
因此这些规则不会命中。请改用域名、IP、端口或网络类型规则。

<ConfigFieldMatrix lang="zh" category="rules" />
<ConfigFieldMatrix lang="zh" category="sniffer" />
