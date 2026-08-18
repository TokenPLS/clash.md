---
title: Clash 与 sing-box 兼容吗？
description: 说明如何把 sing-box JSON 配置、订阅、VLESS、Trojan、Hysteria2、TUIC、AnyTLS 节点迁移到 Clash iOS。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/sing-box
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/sing-box
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"如何把 sing-box JSON 配置迁移到 Clash？","acceptedAnswer":{"@type":"Answer","text":"Clash 使用 mihomo YAML。优先获取 mihomo 格式订阅，或根据 sing-box 节点与路由参数重新建立 YAML。"}},{"@type":"Question","name":"sing-box 节点可以在 Clash 中使用吗？","acceptedAnswer":{"@type":"Answer","text":"可以，只要节点使用 Clash 支持的协议、传输方式、TLS、认证方式与参数。常见的 VLESS、Trojan、Hysteria2、TUIC 与 AnyTLS 均受支持。"}}]}'
---

# Clash 与 sing-box 兼容吗？

**节点协议可以复用，配置统一使用 mihomo YAML。**

[sing-box 使用 JSON 配置](https://sing-box.sagernet.org/configuration/)，Clash 使用 mihomo YAML。迁移时可以提取需要的节点、路由与 DNS 意图，并在 mihomo YAML 中重新建立。

## 哪些 sing-box 节点可以继续使用？

只要参数匹配，sing-box 用户常用的这些协议可以在 Clash 中继续使用：

- VLESS；
- Trojan；
- Shadowsocks；
- Hysteria2；
- TUIC；
- AnyTLS；
- WireGuard；
- SSH。

完整范围请参阅[支持的协议](/zh/guide/protocols)。

## 怎么迁移最省事？

1. 优先向服务商获取 mihomo / Clash 格式的订阅。
2. 如果只有 `ss://`、`vless://`、`trojan://` 等分享链接，请先转换成
   mihomo YAML，或在 Clash 的节点编辑器中按链接参数重新添加。
3. 单节点分享链接可以作为参数来源，整理成 YAML 或手动填写。
4. 重新建立原来只存在于 sing-box JSON 中的路由与 DNS 规则。

## 迁移时需要重新配置

- 将 sing-box JSON 结构整理为 mihomo YAML；
- 将 `route`、`dns`、`inbounds`、`outbounds` 中需要的能力映射到 Clash；
- 为实验性选项选择 Clash 中对应的稳定能力；
- 在 Clash 中设置界面与 Apple 系统选项。

协议、传输、TLS、认证和其他参数与 Clash 支持范围一致时，同一台服务器
即可直接使用。

返回[兼容性总览](/zh/guide/compatibility)。
