---
title: Clash 支持的代理协议
description: Hako 1.19.30 可识别的 23 类代理与网络出站类型，以及验证范围和 Apple 平台配置说明。
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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Clash 可以识别哪些代理协议？","acceptedAnswer":{"@type":"Answer","text":"Hako 1.19.30 可识别 23 类代理与网络出站，以及 DIRECT、DNS、REJECT、REMATCH。22 类代理或网络出站已有受控互操作覆盖，ZeroTier 仍需实验室验证。"}},{"@type":"Question","name":"如何在 Clash 中使用 ss:// 等分享链接？","acceptedAnswer":{"@type":"Answer","text":"可以把单节点分享链接或 Base64 节点列表整理为 mihomo YAML，或根据链接里的服务器、端口、凭据和协议参数在节点编辑器中添加。Profile 导入入口接受 HTTPS 配置地址与完整 mihomo YAML。"}},{"@type":"Question","name":"如何迁移其他 App 的配置？","acceptedAnswer":{"@type":"Answer","text":"优先使用返回 mihomo YAML 的配置地址；来自 sing-box、Surge 或 Quantumult X 的节点也可以根据协议参数在 Clash 中重新添加。"}},{"@type":"Question","name":"开始使用 Clash 需要什么？","acceptedAnswer":{"@type":"Answer","text":"准备一份你选择并信任的 mihomo 配置或 HTTPS 配置地址，即可导入 Clash。"}}]}'
---

# Clash 支持的代理协议

Hako 的 Apple 平台版本可识别 **23 类代理与网络出站类型**。可以通过 mihomo YAML、
返回 mihomo YAML 的 HTTPS 配置地址，或节点编辑器进行配置。

Hako 1.19.30 共识别 27 类出站类型。本页列出其中 23 类可配置代理协议；
`DIRECT`、`DNS`、`REJECT` 与 `REMATCH` 属于路由或控制出站，不按服务器协议
计入。

其中 22 类代理与网络出站通过了受控互操作测试；ZeroTier 可以识别，但仍需要
实验室验证。三端共用内核代表配置词汇一致，不代表每种协议已经在每台设备和
每种网络上完成相同的端到端验证。

## 完整协议清单

| 协议 | 可用导入方式 |
| --- | --- |
| HTTP | mihomo YAML · 配置地址 · 手动添加 |
| SOCKS | mihomo YAML · 配置地址 · 手动添加 |
| Shadowsocks | mihomo YAML · 兼容配置地址 · 手动添加 |
| ShadowsocksR | mihomo YAML · 兼容配置地址 · 手动添加 |
| Snell | mihomo YAML · 配置地址 · 手动添加 |
| VMess | mihomo YAML · 兼容配置地址 · 手动添加 |
| VLESS | mihomo YAML · 兼容配置地址 · 手动添加 |
| Trojan | mihomo YAML · 兼容配置地址 · 手动添加 |
| AnyTLS | mihomo YAML · 兼容配置地址 · 手动添加 |
| Mieru | mihomo YAML · 配置地址 · 手动添加 |
| Sudoku | mihomo YAML · 配置地址 · 手动添加 |
| Hysteria | mihomo YAML · 配置地址 · 手动添加 |
| Hysteria2 | mihomo YAML · 兼容配置地址 · 手动添加 |
| TUIC | mihomo YAML · 兼容配置地址 · 手动添加 |
| ShadowQUIC | mihomo YAML · 配置地址 · 手动添加 |
| GOST Relay | mihomo YAML · 配置地址 · 手动添加 |
| WireGuard | mihomo YAML · 配置地址 · 手动添加 |
| Tailscale | mihomo YAML · 手动添加 |
| ZeroTier | mihomo YAML · 手动添加 · 仍需实验室验证 |
| SSH | mihomo YAML · 配置地址 · 手动添加 |
| MASQUE | mihomo YAML · 配置地址 · 手动添加 |
| TrustTunnel | mihomo YAML · 配置地址 · 手动添加 |
| OpenVPN | mihomo YAML · 配置地址 · 手动添加 |

## 配置方式

Clash 添加 Profile 时接受：

- HTTPS 配置地址，且返回内容必须是有效的 mihomo YAML；
- `.yaml` 或 `.yml` 配置文件；
- 剪贴板中的完整 mihomo YAML；
- 包含 HTTPS 配置地址的二维码。

对于 `ss://`、`ssr://`、`vmess://` 等单节点分享链接，以及 Base64 节点
列表，可以先整理为 mihomo YAML，或在节点编辑器中按服务器、端口、凭据
和协议参数添加。

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

### 每个受支持的 Apple 平台验证结果都相同吗？

iPhone、iPad、Mac 与 Apple TV 使用同一套 Hako 内核，并识别相同的配置类型；
但端到端验证范围并不完全相同。22 类代理或网络出站已有受控互操作覆盖，
ZeroTier 仍需实验室验证，目前也没有对外发布逐协议的 Mac 与 Apple TV 真机
矩阵。详见[三平台配置差异](/zh/guide/config/apple-platforms)。
