---
title: 常规配置
description: Hako 常规 mihomo YAML 字段参考，包括运行模式、日志、连接行为、hosts 与 geodata 的三平台状态。
---

# 常规配置

常规项控制内核运行方式。`mode: rule` 适合日常使用；`global` 与 `direct` 更适合
临时排查。`ipv6`、`log-level`、`unified-delay`、`tcp-concurrent`、keep-alive
与 `hosts` 在三端由同一套 Hako 内核处理。

## Apple 平台注意事项

- `find-process-mode` 依赖系统提供的进程元数据。macOS Packet Tunnel 支持进程
  名、路径与 UID；iOS 与 tvOS 请使用域名、IP、端口和网络类型规则。
- geodata 可用，但资源由 Hako 管理。iOS / tvOS 会优先控制内存；tvOS 缓存应
  被视为可以重新生成。
- `global-client-fingerprint` 已从当前上游移除。需要时在具体代理节点使用
  `client-fingerprint`。

<ConfigFieldMatrix lang="zh" category="general" />
