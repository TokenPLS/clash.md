---
title: Clash 支持的代理协议
description: Hako SDK v1.19.31-hako.1 的 24 类代理与网络出站类型，包含仅 macOS 实现的 EasyTier 与 Apple 平台配置方式。
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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Clash 支持哪些代理协议？","acceptedAnswer":{"@type":"Answer","text":"Hako SDK v1.19.31-hako.1 定义 24 类代理与网络出站，以及 DIRECT、DNS、REJECT、REMATCH 四类路由或控制出站。EasyTier 仅在 macOS SDK 中实现；iOS、iPadOS 与 tvOS 仍有 23 类协议实现，EasyTier 为 REJECT 占位节点。"}},{"@type":"Question","name":"如何在 Clash 中使用 ss:// 等分享链接？","acceptedAnswer":{"@type":"Answer","text":"可以把单节点分享链接或 Base64 节点列表整理为 mihomo YAML，或在 iPhone、iPad 与 Mac 的节点编辑器中按照服务器、端口、凭据和协议参数添加。"}},{"@type":"Question","name":"如何迁移其他 App 的配置？","acceptedAnswer":{"@type":"Answer","text":"优先使用返回 mihomo YAML 的 Profile 地址；来自 sing-box、Surge 或 Quantumult X 的节点也可以根据协议参数在 Clash 中重新添加。"}},{"@type":"Question","name":"开始使用 Clash 需要什么？","acceptedAnswer":{"@type":"Answer","text":"准备一份你选择并信任的 mihomo 配置或 HTTPS Profile 地址，即可添加到 Clash。"}}]}'
---

# Clash 支持的代理协议

Hako SDK **v1.19.31-hako.1** 定义 **24 类代理与网络出站类型**，使用 mihomo
YAML 配置，也可以通过返回此格式的 HTTPS Profile 地址提供。新增的
[EasyTier](/zh/guide/config/outbound/easytier) 仅在 macOS SDK 中提供实现。
iOS、iPadOS 与 tvOS 仍有 23 类实现；这些平台上的 EasyTier 为 REJECT 占位
节点，会拒绝经过它的连接。

解析器共识别 28 类出站类型。本页列出其中 24 类可配置协议；`DIRECT`、`DNS`、
`REJECT` 与 `REMATCH` 属于路由或控制出站，不按服务器协议计入。SDK 已发布
不代表所有 App Store 客户端版本均已集成。

## 完整协议清单

- [HTTP](/zh/guide/config/outbound/http) · [SOCKS](/zh/guide/config/outbound/socks5) · [Shadowsocks](/zh/guide/config/outbound/ss) · [ShadowsocksR](/zh/guide/config/outbound/ssr) · [Snell](/zh/guide/config/outbound/snell)
- [VMess](/zh/guide/config/outbound/vmess) · [VLESS](/zh/guide/config/outbound/vless) · [Trojan](/zh/guide/config/outbound/trojan) · [AnyTLS](/zh/guide/config/outbound/anytls) · [Mieru](/zh/guide/config/outbound/mieru)
- [Sudoku](/zh/guide/config/outbound/sudoku) · [Hysteria](/zh/guide/config/outbound/hysteria) · [Hysteria2](/zh/guide/config/outbound/hysteria2) · [TUIC](/zh/guide/config/outbound/tuic) · [ShadowQUIC](/zh/guide/config/outbound/shadowquic)
- [GOST Relay](/zh/guide/config/outbound/gost-relay) · [WireGuard](/zh/guide/config/outbound/wireguard) · [Tailscale](/zh/guide/config/outbound/tailscale) · [ZeroTier](/zh/guide/config/outbound/zerotier) · [SSH](/zh/guide/config/outbound/ssh)
- [EasyTier（macOS）](/zh/guide/config/outbound/easytier) · [MASQUE](/zh/guide/config/outbound/masque) · [TrustTunnel](/zh/guide/config/outbound/trusttunnel) · [OpenVPN](/zh/guide/config/outbound/openvpn)

## 配置方式

三端都可以添加返回有效 mihomo YAML 的 HTTPS Profile 地址。其他入口按平台提供：

- iPhone 与 iPad：YAML 文件、系统共享、剪贴板、包含 Profile 地址的二维码，
  以及节点编辑器；
- Mac：YAML 文件、剪贴板、空白配置与节点编辑器；
- Apple TV：通过 Profile 地址获取配置和其中的节点。

对于 `ss://`、`ssr://`、`vmess://` 等单节点分享链接，以及 Base64 节点列表，
可以先整理为 mihomo YAML；在 iPhone、iPad 与 Mac 上，也可以在节点编辑器中
按服务器、端口、凭据和协议参数添加。

## 从其他 App 迁移节点

Clash 以 mihomo YAML 作为配置格式。迁移 sing-box JSON、Surge Profile 或
Quantumult X 配置时，优先获取返回 mihomo YAML 的配置地址，或根据原节点的协议参数在
Clash 中重新添加。

各品牌的推荐迁移方式请参阅[兼容性说明](/zh/guide/compatibility)。

## 配置要点

- 使用你选择并信任的服务器、凭据与协议参数。
- 让 TLS、传输方式、混淆、UDP 与认证选项和服务器保持一致。
- 按照协议支持的传输方式与 UDP 模式完成配置。
- 保存后运行延迟测试与实际连接测试。

## 常见问答

### iPhone 或 Apple TV 可以使用 EasyTier 吗？

不可以。SDK v1.19.31-hako.1 只有 macOS slice 包含 EasyTier 实现；iOS、
iPadOS 与 tvOS 会把配置中的 EasyTier 节点保留为 REJECT 占位节点，并拒绝
经过它的流量。Mac 需使用已集成此 SDK 的客户端，配置方式见
[EasyTier 专题](/zh/guide/config/outbound/easytier)。

### Clash 支持 ShadowsocksR 吗？

支持。可以通过 mihomo YAML、返回 mihomo YAML 的兼容配置地址，或根据
`ssr://` 链接中的参数在节点编辑器添加。

### Clash 支持 WireGuard、OpenVPN 与 Tailscale 吗？

它们均可作为出站类型使用。地址、路由、凭据及其他必填项需要正确配置；实际
连接仍取决于服务器、当前网络与 Apple 平台。

### Clash 支持 Hysteria2、TUIC 与 AnyTLS 吗？

支持。三者均可通过 mihomo YAML、返回 mihomo YAML 的兼容配置地址，或节点
编辑器添加。

### Clash 支持 Surge 使用的 Snell 服务器吗？

支持。可以在 Clash 中配置兼容的 Snell 服务器，并用 mihomo YAML 重新建立
对应的策略组与规则。
