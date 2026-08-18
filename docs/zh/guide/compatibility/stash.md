---
title: Clash 与 Stash 兼容吗？
description: 说明如何把 Stash 的 Clash YAML、订阅、节点、覆写、脚本和规则需求迁移到 Clash iOS。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/stash
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/stash
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Stash 配置可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"标准 Clash 或 mihomo YAML 可以直接导入；Stash 的覆写、HTTP 引擎、MITM、重写、脚本和设备设置可使用 Clash 对应功能重新建立。"}},{"@type":"Question","name":"Stash 的订阅可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"可以，只要订阅返回标准 Clash 或 mihomo YAML。可以把同一个 URL 添加到 Clash，必要时切换订阅 User-Agent。"}}]}'
---

# Clash 与 Stash 兼容吗？

**标准 Clash / mihomo YAML 与订阅可以直接使用。**

Stash 官方文档说明它可以导入 [Stash / Clash 格式配置](https://stash.wiki/en/get-started)，并且[所有配置文件使用 YAML](https://stash.wiki/configuration/example-config)。因此，只要你在 Stash 中使用的是标准 Clash 或 mihomo YAML，就可以直接导入 Clash。

## 什么可以直接迁移？

- 标准 Clash / mihomo YAML 配置；
- 返回 Clash / mihomo YAML 的远程订阅；
- 节点、Proxy Provider 与 Rule Provider；
- 策略组、健康检查和路由规则；
- 双方均支持的 DNS 与其他配置字段。

## 最省事的迁移方式

1. 复制 Stash 当前配置使用的订阅 URL。
2. 在 Clash 中添加该远程配置。
3. 如果 Stash 使用本地 YAML，也可以通过文件或系统“共享”导入 Clash。
4. 更新配置并检查节点、策略组与规则。
5. 服务商提供多种格式时，切换订阅 User-Agent，选择 Clash / mihomo 输出。

## 在 Clash 中重新建立的 Stash 功能

- 将覆写文件整合为清晰的 mihomo YAML；
- 使用对应功能建立 HTTP 引擎、MITM 与证书需求；
- 使用 Clash 规则与对应功能建立 URL Rewrite 和脚本需求；
- 按自己的使用习惯设置按需连接、同步、远程控制与 App 偏好。

如果 Stash 使用多个覆写文件动态生成配置，可以先导出或整理为一份最终的标准 mihomo YAML，再把 Stash 扩展需求映射到 Clash 的对应功能。

## 可以继续使用同一台服务器吗？

两款 App 使用相同的标准节点配置时，同一台服务器可以直接使用。

返回[兼容性总览](/zh/guide/compatibility)。
