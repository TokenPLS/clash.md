---
title: DNS 配置
description: Hako 在 iOS、macOS 与 tvOS 上的 mihomo DNS、Fake IP、DoH、DoT、策略与缓存字段参考。
---

# DNS 配置

Hako 在 Apple Packet Tunnel 内保持 DNS 启用，并让 TUN 劫持的查询进入 mihomo
解析器。Fake IP、DoH、DoT、策略解析、fallback、hosts 与缓存均由内核处理。

## 使用建议

- 只有遇到明确的解析需求时才覆盖 `nameserver`；解析器会看到你的查询，请选择
  自己信任的服务。
- `system:`、`dhcp:` 等依赖桌面网络环境的来源可能被 Hako 移除或修复。
- `dns.listen` 会开放本地服务，属于高级功能。不要把它和 `allow-lan` 一起
  无鉴权暴露。
- DNS 服务器地址、请求头和认证信息也属于敏感配置。

<ConfigFieldMatrix lang="zh" category="dns" />
