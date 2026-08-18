---
title: Clash 支持的代理协议
description: Clash Apple 平台版本支持的 23 类出站协议完整清单，包括 Shadowsocks、VMess、VLESS、Trojan、Hysteria2、TUIC、WireGuard 与 OpenVPN。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/protocols
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/protocols
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Clash 支持哪些代理协议？","acceptedAnswer":{"@type":"Answer","text":"Clash 支持 23 类可配置代理协议：HTTP、SOCKS、Shadowsocks、ShadowsocksR、Snell、VMess、VLESS、Trojan、AnyTLS、Mieru、Sudoku、Hysteria、Hysteria2、TUIC、ShadowQUIC、GOST Relay、WireGuard、Tailscale、ZeroTier、SSH、MASQUE、TrustTunnel 与 OpenVPN。Hako 1.19.30 共识别 27 类出站类型；DIRECT、DNS、REJECT 与 REMATCH 属于路由或控制出站，不按服务器协议计入。"}},{"@type":"Question","name":"如何在 Clash 中使用 ss:// 等分享链接？","acceptedAnswer":{"@type":"Answer","text":"可以把单节点分享链接或 Base64 节点列表整理为 mihomo YAML，或根据链接里的服务器、端口、凭据和协议参数在节点编辑器中添加。Profile 导入入口接受 HTTPS 订阅地址与完整 mihomo YAML。"}},{"@type":"Question","name":"如何迁移其他 App 的配置？","acceptedAnswer":{"@type":"Answer","text":"优先选择服务商提供的 mihomo YAML；来自 sing-box、Surge 或 Quantumult X 的节点可以根据协议参数在 Clash 中重新添加。"}},{"@type":"Question","name":"开始使用 Clash 需要什么？","acceptedAnswer":{"@type":"Answer","text":"准备一份你选择并信任的服务器配置或 HTTPS 订阅，即可导入 Clash。"}}]}'
---

# Clash 支持的代理协议

Clash 的 Apple 平台版本支持 **23 类出站协议**。可以通过 mihomo YAML、
返回 mihomo YAML 的 HTTPS 订阅，或节点编辑器进行配置。

Hako 1.19.30 共识别 27 类出站类型。本页列出其中 23 类可配置代理协议；
`DIRECT`、`DNS`、`REJECT` 与 `REMATCH` 属于路由或控制出站，不按服务器协议
计入。

## 完整协议清单

| 协议 | 可用导入方式 |
| --- | --- |
| HTTP | mihomo YAML · 订阅 · 手动添加 |
| SOCKS | mihomo YAML · 订阅 · 手动添加 |
| Shadowsocks | mihomo YAML · 兼容订阅 · 手动添加 |
| ShadowsocksR | mihomo YAML · 兼容订阅 · 手动添加 |
| Snell | mihomo YAML · 订阅 · 手动添加 |
| VMess | mihomo YAML · 兼容订阅 · 手动添加 |
| VLESS | mihomo YAML · 兼容订阅 · 手动添加 |
| Trojan | mihomo YAML · 兼容订阅 · 手动添加 |
| AnyTLS | mihomo YAML · 兼容订阅 · 手动添加 |
| Mieru | mihomo YAML · 订阅 · 手动添加 |
| Sudoku | mihomo YAML · 订阅 · 手动添加 |
| Hysteria | mihomo YAML · 订阅 · 手动添加 |
| Hysteria2 | mihomo YAML · 兼容订阅 · 手动添加 |
| TUIC | mihomo YAML · 兼容订阅 · 手动添加 |
| ShadowQUIC | mihomo YAML · 订阅 · 手动添加 |
| GOST Relay | mihomo YAML · 订阅 · 手动添加 |
| WireGuard | mihomo YAML · 订阅 · 手动添加 |
| Tailscale | mihomo YAML · 手动添加 |
| ZeroTier | mihomo YAML · 手动添加 |
| SSH | mihomo YAML · 订阅 · 手动添加 |
| MASQUE | mihomo YAML · 订阅 · 手动添加 |
| TrustTunnel | mihomo YAML · 订阅 · 手动添加 |
| OpenVPN | mihomo YAML · 订阅 · 手动添加 |

## 配置方式

Clash 添加 Profile 时接受：

- HTTPS 订阅地址，且返回内容必须是有效的 mihomo YAML；
- `.yaml` 或 `.yml` 配置文件；
- 剪贴板中的完整 mihomo YAML；
- 包含 HTTPS 订阅地址的二维码。

对于 `ss://`、`ssr://`、`vmess://` 等单节点分享链接，以及 Base64 节点
列表，可以先整理为 mihomo YAML，或在节点编辑器中按服务器、端口、凭据
和协议参数添加。

## 从其他 App 迁移节点

Clash 以 mihomo YAML 作为配置格式。迁移 sing-box JSON、Surge Profile 或
Quantumult X 配置时，优先获取 mihomo 订阅，或根据原节点的协议参数在
Clash 中重新添加。

各品牌的推荐迁移方式请参阅[兼容性说明](/zh/guide/compatibility)。

## 配置要点

- 使用你选择并信任的服务器、凭据与协议参数。
- 让 TLS、传输方式、混淆、UDP 与认证选项和服务器保持一致。
- 按照协议支持的传输方式与 UDP 模式完成配置。
- 保存后运行延迟测试与实际连接测试。

## 常见问答

### Clash 支持 ShadowsocksR 吗？

支持。可以通过 mihomo YAML、返回 mihomo YAML 的兼容订阅，或根据
`ssr://` 链接中的参数在节点编辑器添加。

### Clash 支持 WireGuard、OpenVPN 与 Tailscale 吗？

支持，它们均可作为出站类型使用。地址、路由、凭据及其他必填项需要正确
配置。

### Clash 支持 Hysteria2、TUIC 与 AnyTLS 吗？

支持。三者均可通过 mihomo YAML、返回 mihomo YAML 的兼容订阅，或节点
编辑器添加。

### Clash 支持 Surge 使用的 Snell 服务器吗？

支持。可以在 Clash 中配置兼容的 Snell 服务器，并用 mihomo YAML 重新建立
对应的策略组与规则。

### 每个受支持的 Apple 平台协议都相同吗？

相同。iPhone、iPad、Mac 与 Apple TV 版本使用同一套 Hako 数据面。
