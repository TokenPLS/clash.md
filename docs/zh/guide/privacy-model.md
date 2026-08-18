---
title: 隐私模型
description: Clash 在 Apple 平台采用本地优先隐私模型：配置、日志和诊断留在设备上，只有用户配置或主动启动的功能才会发出网络请求。
keywords:
  - Clash隐私
  - Apple平台代理隐私
  - VPN数据收集
  - 本地处理
  - NetworkExtension隐私
jsonLd:
  "@context": https://schema.org
  "@type": TechArticle
  headline: Clash 的本地优先隐私模型
  description: 说明哪些 Clash 数据留在设备上，以及用户配置或主动启动的外部请求。
  url: https://clash.md/zh/guide/privacy-model
  inLanguage: zh-CN
  about:
    - 本地数据处理
    - VPN 隐私
    - 用户主动指定的网络请求
---

# 隐私模型

Clash 是运行在设备上的客户端。你直接配置自己选择的配置地址、服务器与
网络服务；免账户架构让整个使用过程保持本地优先。

## 留在设备上的内容

配置、设置、连接历史、日志与诊断均在本机处理。本地代理共享凭据保存在
设备钥匙串中；配置文件保存在受相应 Apple 平台数据保护的 App 容器内。

## 由你决定的请求

Clash 只会为你配置或主动启动的功能发出外部请求，包括：

- 配置中指定的远程配置、Provider、代理与 DNS 服务器；
- App 资源页面显示的更新来源；
- 在相应平台上由你选择的网络质量、STUN 与延迟测试端点；
- 在支持 iCloud Drive 备份的平台上，由你明确使用的个人 iCloud 账户。

这些服务会收到完成请求所需的网络信息，例如你的 IP 地址；数据直接流向
你选择的服务，整条链路由你掌控。

## 由你控制

你可以断开连接、删除配置、关闭已配置的更新、删除本机数据与平台支持的
iCloud 备份，并决定是否导出任何诊断信息。

## 可以验证

Clash [客户端源码](https://github.com/TokenPLS/Hako-Client)与
[Hako 内核源码](https://github.com/TokenPLS/Hako)公开可审查。隐私模型不只
是一份承诺，也可以通过客户端与内核实际执行的代码进行核对。

[隐私政策](/zh/privacy)是完整且具约束力的数据处理说明。
