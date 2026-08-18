---
title: Clash 与 Quantumult X 兼容吗？
description: 说明如何把 Quantumult X 的订阅、节点、策略、重写和过滤需求迁移到 Clash iOS。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/quantumult-x
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/quantumult-x
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"如何把 Quantumult X 配置迁移到 Clash？","acceptedAnswer":{"@type":"Answer","text":"优先添加服务商提供的 Clash / mihomo 订阅，也可以把节点参数整理为 mihomo YAML 或在节点编辑器中添加；策略、重写和过滤需求可使用 Clash 规则与对应功能重新建立。"}},{"@type":"Question","name":"Quantumult X 的订阅可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"服务商通过 HTTPS 订阅地址返回 mihomo YAML 时，可以直接添加到 Clash；单节点参数也可以整理为 YAML 或手动添加。"}}]}'
---

# Clash 与 Quantumult X 兼容吗？

**常见节点可以继续使用，分流策略可以通过 Clash 规则重新建立。**

Quantumult X 使用独立的[配置与资源语法](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)。迁移到 Clash 时，节点可以通过订阅、mihomo YAML 或节点编辑器继续使用，策略、重写、脚本和过滤需求则可使用对应功能重新建立。

## 哪些内容可以继续使用？

- 能够返回 mihomo YAML 的订阅地址；
- `ss://`、`ssr://`、`vmess://` 等分享链接中记录的节点参数，但需要先
  转换成 mihomo YAML 或手动填写；
- 能够在 Clash 节点编辑器中按参数重新建立的服务器。

## 怎么迁移？

1. 向服务商选择 Clash / mihomo 格式的订阅。
2. 将该订阅 URL 添加到 Clash；必要时切换订阅 User-Agent。
3. 根据单节点分享链接或 Base64 列表中的参数，整理为 mihomo YAML 或在节点编辑器中添加。
4. 使用 Clash 规则重新表达原来的分流需求。

## 迁移时需要重新配置的内容

- 将节点和策略整理为 mihomo YAML；
- 使用 Clash 对应功能建立 Rewrite、Filter、Task 与脚本需求；
- 将产品专用资源语法转换为 Clash 规则；
- 按自己的使用习惯设置 App 偏好。

协议和参数对应后，同一台服务器可以直接使用。

返回[兼容性总览](/zh/guide/compatibility)。
