---
title: Clash 与 Surge 兼容吗？
description: 说明如何把 Surge Profile 中的订阅、Snell、Shadowsocks、Trojan、WireGuard 等节点与分流策略迁移到 Clash iOS。
head:
  - - meta
    - name: keywords
      content: Surge转Clash,Surge iOS,Surge Profile,Snell iOS,Surge订阅,Clash iOS
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/surge
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/surge
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"如何把 Surge Profile 迁移到 Clash？","acceptedAnswer":{"@type":"Answer","text":"把节点与分流策略整理为 mihomo YAML，或添加服务商提供的 Clash / mihomo 订阅；模块、脚本和重写可使用 Clash 中对应的规则与功能重新建立。"}},{"@type":"Question","name":"Clash 支持 Surge 的 Snell 节点吗？","acceptedAnswer":{"@type":"Answer","text":"支持。可以通过 mihomo YAML、兼容订阅或节点编辑器添加 Snell 节点。"}}]}'
---

# Clash 与 Surge 兼容吗？

**共同的节点协议可以继续使用，分流策略可以整理为 mihomo YAML。**

[Surge 使用自己的 Profile 格式](https://manual.nssurge.com/overview/quick-start.html)，包含 `[General]`、`[Proxy]`、`[Proxy Group]`、`[Rule]` 等段落。迁移时可把节点与策略组整理为 mihomo YAML，并使用 Clash 的规则与对应功能重新建立原有分流体验。

## 哪些 Surge 节点可以继续使用？

Clash 支持 Snell，也支持双方共有的多种出站协议，例如：

- HTTP 与 SOCKS；
- Shadowsocks；
- VMess 与 Trojan；
- WireGuard；
- Snell。

Snell 通常通过 mihomo YAML、返回 mihomo YAML 的兼容订阅或节点编辑器添加。
其他节点也可以根据服务器与协议参数在节点编辑器中重新添加。

## 怎么迁移？

1. 优先获取服务商提供的 mihomo / Clash 订阅。
2. 如果只有 Surge Profile，提取需要的节点参数，在 Clash 中重新添加。
3. 将 Surge 的策略组和规则改写为 mihomo YAML。
4. 使用 Clash 的规则与对应功能重新建立模块、脚本、重写所表达的需求。

## 迁移时需要重新配置的内容

- 将 Surge Profile 的节点与策略整理为 mihomo YAML；
- 使用 Clash 规则表达原有分流逻辑；
- 使用对应功能重新建立 Module、Rewrite、MITM 与脚本需求；
- 按自己的使用习惯设置 App 偏好。

协议和参数对应后，同一台服务器可以直接使用。

返回[兼容性总览](/zh/guide/compatibility)。
