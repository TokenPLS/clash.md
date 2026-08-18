---
title: Clash 与 Loon 兼容吗？
description: 说明如何把 Loon 的订阅、节点、配置、插件、复写和脚本需求迁移到 Clash iOS。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/loon
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/loon
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Loon 的订阅可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"服务商通过 HTTPS 订阅地址返回 mihomo YAML 时，可以直接添加到 Clash；Loon 节点文本、单节点链接或 Base64 列表中的参数也可以整理为 YAML 或手动添加。"}},{"@type":"Question","name":"Loon 节点可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"双方共有的 Shadowsocks、ShadowsocksR、VMess、VLESS、Trojan、HTTP、SOCKS、WireGuard、Hysteria2 与 AnyTLS 等协议可以继续使用。"}},{"@type":"Question","name":"如何迁移 Loon 的插件、复写和脚本？","acceptedAnswer":{"@type":"Answer","text":"使用 mihomo 配置、Clash 规则与对应功能重新建立原有插件、复写和脚本需求。"}}]}'
---

# Clash 与 Loon 兼容吗？

**双方共有的节点协议可以继续使用，原有分流需求也能在 Clash 中重新建立。**

Loon 使用自己的节点、规则、策略、复写、脚本和插件语法。迁移到 Clash 时，服务商订阅和节点可以通过兼容格式继续使用，规则与扩展功能也可以通过对应功能重新建立。

## 哪些 Loon 节点可以继续使用？

根据 [Loon 官方节点文档](https://nsloon.app/docs/Node/)，双方共有的协议包括：

- Shadowsocks 与 ShadowsocksR；
- VMess 与 VLESS；
- Trojan；
- HTTP / HTTPS 与 SOCKS5；
- WireGuard；
- Hysteria2；
- AnyTLS。

添加节点时，对应好传输方式、TLS、Reality、混淆、加密、认证与 UDP 选项，即可获得完整的协议体验。

## Loon 订阅怎么迁移？

1. 先尝试把同一个订阅 URL 添加到 Clash。
2. 服务商按客户端提供多种格式时，切换订阅 User-Agent，选择 Clash / mihomo 输出。
3. 服务商提供 Loon 专用文本格式时，可以选择其 mihomo YAML 输出。
4. 根据单节点分享链接中的参数整理为 mihomo YAML，或在节点编辑器中添加。

## 在 Clash 中重新建立的内容

- 将节点、规则与策略组整理为 mihomo YAML；
- 使用 Clash 对应功能建立插件、复写与 JavaScript 脚本需求；
- 使用 Clash 支持的协议表达原有 Custom by JS 连接需求；
- 按自己的使用习惯设置 App 偏好、证书与本地数据。

Loon 官方文档将插件定义为规则、复写与脚本的集合。在 Clash 中，可以把这些需求拆分到规则与对应功能中，结构更清晰，也更方便维护。

## 可以继续使用同一台服务器吗？

服务器使用双方共同支持的协议，并对应好必要参数后，同一节点可以直接使用。

返回[兼容性总览](/zh/guide/compatibility)，或查看[全部支持的协议](/zh/guide/protocols)。
