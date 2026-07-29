---
title: 隐私模型
description: Clash iOS 的本地优先隐私模型：配置、日志和诊断留在设备上，只有用户配置或主动启动的功能才会发出网络请求。
keywords:
  - Clash隐私
  - iOS代理隐私
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

Clash 是运行在设备上的客户端。你直接配置自己选择的订阅、服务器与网络
服务；免账户架构让整个使用过程保持本地优先。

## 留在设备上的内容

配置、设置、连接历史、日志与诊断均在本机处理。本地代理共享凭据保存在
设备钥匙串中；配置文件保存在受 iOS 数据保护的 App 容器内。

## 由你决定的请求

Clash 只会为你配置或主动启动的功能发出外部请求，包括：

- 配置中指定的订阅、Provider、代理与 DNS 服务器；
- App 资源页面显示的更新来源；
- 你选择的网络质量、STUN 与延迟测试端点；
- 你明确创建 iCloud 备份时使用的个人 iCloud 账户。

这些服务会收到完成请求所需的网络信息，例如你的 IP 地址；数据直接流向
你选择的服务，整条链路由你掌控。

## 由你控制

你可以断开连接、删除配置、关闭已配置的更新、删除本机数据与 iCloud
备份，并决定是否导出任何诊断信息。

[隐私政策](/zh/privacy)是完整且具约束力的数据处理说明。
