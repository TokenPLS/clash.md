---
title: 开始使用
description: 在 iPhone 或 iPad 上将自己的订阅或 mihomo YAML 导入 Clash，选择节点并开始连接的三步指南。
keywords:
  - Clash iOS使用教程
  - Clash iPhone导入订阅
  - mihomo YAML导入
  - Clash节点测速
  - Clash规则模式
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 iPhone 或 iPad 上使用 Clash
  description: 导入自己的订阅或配置，选择节点并开始连接。
  inLanguage: zh-CN
  supply:
    - "@type": HowToSupply
      name: 可用的代理服务器配置或订阅地址
  step:
    - "@type": HowToStep
      position: 1
      name: 导入
      text: 添加 HTTPS 订阅地址、扫描订阅二维码、打开 YAML 文件，或通过系统共享导入 YAML 配置。
      url: https://clash.md/zh/guide/#_1-导入
    - "@type": HowToStep
      position: 2
      name: 选择节点
      text: 测试延迟、按延迟排序，然后选择需要使用的节点。
      url: https://clash.md/zh/guide/#_2-选择节点
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 通过首页开关、控制中心或快捷指令连接。
      url: https://clash.md/zh/guide/#_3-连接
---

# 开始使用

Clash 是一款由 Hako 驱动的规则分流网络工具。把自己的配置或订阅导入
进来后，Clash 会按照规则为每一个网络连接选择直连、代理或拦截策略。

::: tip 使用自己的配置
导入由你选择并信任的服务器配置或订阅，即可开始使用 Clash 的测速、选线
与规则分流能力。
:::

## 1. 导入

添加 HTTPS 订阅地址、扫描包含 HTTPS 订阅地址的二维码、打开 YAML 文件，
或在任意 App 中通过“共享”把 YAML 配置发送给 Clash。

配置中可能包含凭据，请将配置文件与备份视为敏感信息妥善保管。

## 2. 选择节点

测试延迟、按延迟排序，然后轻点需要使用的节点。

## 3. 连接

通过首页开关、控制中心或快捷指令连接。

## 兼容性概览

Clash 可以直接读取 mihomo 格式的 YAML 配置，以及返回 mihomo YAML 的 HTTPS
订阅。如果你的节点来自 `ss://` 等单节点分享链接或 Base64 节点列表，可以
先整理为 mihomo YAML，或根据参数在节点编辑器中添加。

Stash 使用的标准 Clash / mihomo YAML 可以直接导入。来自 sing-box、Surge、
Quantumult X、Shadowrocket 与 Loon 的节点，也可以通过 mihomo 订阅或在
节点编辑器中按参数添加，同一台服务器通常可以继续使用。

具体兼容关系与迁移方式请参阅[完整兼容性说明](/zh/guide/compatibility)，其中
分别提供 mihomo 系列客户端、sing-box、Surge、Quantumult X、
Shadowrocket（小火箭）、Stash 与 Loon 的独立说明。

## 支持的协议

Clash 目前支持 21 类出站协议，从 HTTP、SOCKS、Shadowsocks、VMess、
VLESS、Trojan，到 Hysteria2、TUIC、WireGuard、MASQUE、TrustTunnel 与
OpenVPN。

全部协议及其配置方式请参阅[支持的协议](/zh/guide/protocols)。

## 默认保护隐私

Clash 采用免账户、本地优先的架构。配置与运行数据保留在设备上，网络请求
由你配置或主动发起。

完整说明请参阅[隐私政策](/zh/privacy)。

## 社区支持

欢迎到
[Clash 客户端 Issue](https://github.com/TokenPLS/Hako-Client/issues)。
提交公开 Issue 时，请使用脱敏后的订阅示例、服务器地址与日志。
