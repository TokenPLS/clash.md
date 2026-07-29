---
title: Clash 与 mihomo、Clash Verge Rev、FlClash、Clash Nyanpasu、ClashMi、OpenClash 的兼容性
description: 从 Clash Verge Rev、FlClash、Clash Nyanpasu、ClashMi、OpenClash、ShellCrash 等 mihomo 客户端迁移到 Clash iOS 的完整兼容说明。
head:
  - - meta
    - name: keywords
      content: mihomo iOS,Clash Verge Rev iOS,FlClash订阅,Clash Nyanpasu配置,ClashMi配置,OpenClash订阅,ShellCrash配置
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility/mihomo
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility/mihomo
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Clash 兼容哪些 mihomo 客户端的配置？","acceptedAnswer":{"@type":"Answer","text":"标准 mihomo YAML 配置或返回 mihomo YAML 的订阅都可以直接导入 Clash，包括 Clash Verge Rev、FlClash、Clash Nyanpasu、ClashMi、OpenClash、ShellCrash 等客户端所使用的 mihomo 配置。"}},{"@type":"Question","name":"Clash Verge Rev 的订阅可以用于 Clash iOS 吗？","acceptedAnswer":{"@type":"Answer","text":"可以。将同一个 mihomo 订阅 URL 添加到 Clash；面板提供多种格式时，可切换订阅 User-Agent 选择 Clash / mihomo 输出。"}},{"@type":"Question","name":"如何把 OpenClash 配置用于 Clash iOS？","acceptedAnswer":{"@type":"Answer","text":"直接导入标准 mihomo YAML，并在 iOS 上使用 Clash 的规则与系统设置建立对应体验；OpenWrt 插件设置继续由路由器管理。"}}]}'
---

# Clash 与 mihomo 客户端全兼容

标准 mihomo YAML 配置，或能够返回 mihomo YAML 的订阅，都可以直接导入 Clash。节点、策略组、规则、Provider 与受支持的配置字段会继续使用，免去逐个添加节点的步骤。

这里的“全兼容”指 mihomo 配置与订阅兼容。界面偏好、系统代理、TUN 与备份等平台设置，可以在 Clash iOS 中按自己的使用习惯重新配置。

## 常见 mihomo 客户端

以下是社区中较常见的代表：

| 客户端 | 常见平台 | 迁移到 Clash |
| --- | --- | --- |
| [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) | Windows、macOS、Linux | 导入原 mihomo YAML 或添加同一个订阅 |
| [FlClash](https://github.com/chen08209/FlClash) | Windows、macOS、Linux、Android | 导入原 mihomo YAML 或添加同一个订阅 |
| [Clash Nyanpasu](https://github.com/libnyanpasu/clash-nyanpasu) | Windows、macOS、Linux | 导入原 mihomo YAML 或添加同一个订阅 |
| [ClashMi](https://github.com/KaringX/clashmi) | iOS、macOS、Android、Windows、Linux | 导入原 mihomo YAML 或添加同一个订阅 |
| [OpenClash](https://github.com/vernesong/OpenClash) | OpenWrt | 导入标准 mihomo YAML；插件设置继续由 OpenWrt 管理 |
| [ShellCrash](https://github.com/juewuy/ShellCrash) | 路由器与 Shell 环境 | 导入标准 mihomo YAML；安装与服务设置继续由原环境管理 |

更多项目可查看 mihomo 官方文档整理的[第三方工具与客户端列表](https://wiki.metacubex.one/startup/client/client/)。

## 可以直接带走什么？

- mihomo YAML 配置文件；
- 返回 mihomo YAML 的订阅地址；
- 节点与代理 Provider；
- 策略组与健康检查配置；
- 路由规则与 Rule Provider；
- DNS 与受支持的长尾字段。

## 平台设置如何衔接

节点、策略组和规则跟随 mihomo YAML 一起迁移；界面主题、窗口布局、快捷键、系统代理、TUN、自动启动、WebDAV 备份和路由器插件等平台设置，则继续由各自平台管理，并可在 Clash iOS 中选择对应体验。

如果原客户端使用 Merge、Mixin、覆写或脚本动态生成最终配置，请先导出生成后的标准 mihomo YAML，或直接使用原始订阅地址。

## 最省事的迁移方式

1. 在原客户端中找到正在使用的订阅 URL。
2. 在 Clash 中添加该 URL。
3. 订阅面板提供多种格式时，切换订阅 User-Agent，选择 Clash / mihomo 输出。
4. 更新配置，确认策略组、规则和节点已经出现。
5. 测试延迟，选择节点并连接。

## Apple 平台差异

iPhone 与 iPad 使用 Apple 的 Packet Tunnel 网络层能力。可以把桌面端按进程、按应用的分流意图转换为域名、IP、Rule Set 等规则；路由器接口、透明代理与防火墙设置继续由路由器管理。

返回[兼容性总览](/zh/guide/compatibility)。
