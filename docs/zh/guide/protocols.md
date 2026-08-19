---
title: Clash 支持的代理协议
description: Hako 1.19.30 支持的 23 类代理与网络出站类型，以及 iOS、macOS 与 tvOS 的配置方式。
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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Clash 支持哪些代理协议？","acceptedAnswer":{"@type":"Answer","text":"Hako 1.19.30 支持 23 类代理与网络出站，以及 DIRECT、DNS、REJECT、REMATCH 四类路由或控制出站。"}},{"@type":"Question","name":"如何在 Clash 中使用 ss:// 等分享链接？","acceptedAnswer":{"@type":"Answer","text":"可以把单节点分享链接或 Base64 节点列表整理为 mihomo YAML，或在 iPhone、iPad 与 Mac 的节点编辑器中按照服务器、端口、凭据和协议参数添加。"}},{"@type":"Question","name":"如何迁移其他 App 的配置？","acceptedAnswer":{"@type":"Answer","text":"优先使用返回 mihomo YAML 的 Profile 地址；来自 sing-box、Surge 或 Quantumult X 的节点也可以根据协议参数在 Clash 中重新添加。"}},{"@type":"Question","name":"开始使用 Clash 需要什么？","acceptedAnswer":{"@type":"Answer","text":"准备一份你选择并信任的 mihomo 配置或 HTTPS Profile 地址，即可添加到 Clash。"}}]}'
---

# Clash 支持的代理协议

Hako 的 Apple 平台版本支持 **23 类代理与网络出站类型**。它们都可以写入
mihomo YAML，或通过返回 mihomo YAML 的 HTTPS Profile 地址使用。

Hako 1.19.30 共识别 27 类出站类型。本页列出其中 23 类可配置代理协议；
`DIRECT`、`DNS`、`REJECT` 与 `REMATCH` 属于路由或控制出站，不按服务器协议
计入。

## 完整协议清单

- HTTP · SOCKS · Shadowsocks · ShadowsocksR · Snell
- VMess · VLESS · Trojan · AnyTLS · Mieru
- Sudoku · Hysteria · Hysteria2 · TUIC · ShadowQUIC
- GOST Relay · WireGuard · Tailscale · ZeroTier · SSH
- MASQUE · TrustTunnel · OpenVPN

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
