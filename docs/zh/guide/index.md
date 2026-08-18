---
title: 开始使用
description: 在 iPhone、iPad、Mac 或 Apple TV 上添加自己的 Clash 或 mihomo 配置，选择线路并开始连接。
keywords:
  - Clash使用教程
  - Clash iPhone导入配置
  - mihomo YAML导入
  - Clash节点测速
  - Clash规则模式
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Apple 平台上使用 Clash
  description: 添加自己的 Clash 或 mihomo 配置，选择线路并开始连接。
  inLanguage: zh-CN
  supply:
    - "@type": HowToSupply
      name: 可用的 Clash 或 mihomo 配置，或配置地址
  step:
    - "@type": HowToStep
      position: 1
      name: 添加配置
      text: 在 iPhone、iPad 或 Mac 上添加配置地址或导入 YAML；在 Apple TV 上输入配置地址。
      url: https://clash.md/zh/guide/#_1-添加配置
    - "@type": HowToStep
      position: 2
      name: 选择线路
      text: 打开策略组，查看延迟并选择要使用的线路。
      url: https://clash.md/zh/guide/#_2-选择线路
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 从首页连接；iPhone 与 iPad 还可使用控制中心或快捷指令，Mac 可使用菜单栏。
      url: https://clash.md/zh/guide/#_3-连接
---

# 开始使用

Clash 不附带服务器或线路。准备一份你自己选择并信任的 Clash / mihomo
配置，之后只需要添加配置、选择线路并连接。

::: tip 配置可能包含凭据
请把配置文件、配置地址与备份视为敏感信息。公开求助时，不要贴出真实地址、
用户名、密码或未脱敏日志。
:::

## 三步开始

### 1. 添加配置

进入“配置（Profiles）”添加远程配置地址，或使用当前设备支持的文件、共享、
二维码及剪贴板入口。Apple TV 使用配置地址，不从本地导入 YAML 文件。

### 2. 选择线路

进入“代理（Proxies）”或“节点（Nodes）”，打开需要的策略组，查看延迟并
选择线路。自动选择类策略组会按照配置中的健康检查决定结果。

### 3. 连接

回到首页连接。首次连接时，按照系统提示允许 Clash 添加 VPN 配置。规则模式
会按照当前配置决定每条连接直连、使用代理或拒绝；也可临时切换到全局或直连。

## 按设备查看

<nav class="guide-platform-grid" aria-label="按设备查看开始步骤">
  <a href="#iphone-与-ipad"><strong>iOS</strong><span>iPhone 与 iPad</span></a>
  <a href="#macos"><strong>macOS</strong><span>窗口与菜单栏</span></a>
  <a href="#tvos"><strong>tvOS</strong><span>Apple TV 与遥控器</span></a>
</nav>

## iPhone 与 iPad

1. 在“配置（Profiles）”中粘贴配置地址、扫描二维码、打开 YAML 文件、粘贴
   YAML，或从其他 App 通过系统共享发送配置。
2. 在“代理（Proxies）”中测试延迟并选择线路。
3. 从首页连接；之后也可以通过控制中心、快捷指令或 Siri 操作。

需要自动处理网络变化时，可以按 Wi-Fi 或蜂窝网络设置按需连接条件。配置可
导出到本地文件；在支持 iCloud Drive 的设备上，也可以主动创建与恢复备份。

## macOS

1. 在“配置（Profiles）”中添加配置地址、打开 YAML 文件、从剪贴板导入，
   或从空白配置开始。
2. 在“代理（Proxies）”中刷新策略组、查看延迟并选择线路。
3. 从首页或菜单栏连接；菜单栏也可切换模式、选择线路并查看实时速度。

主窗口适合查看连接、规则、DNS 与诊断。需要长期使用时，可设置按需连接，
并在本机或自己的 iCloud Drive 中创建配置备份。

## tvOS

1. 在欢迎页或“配置（Profiles）”中添加配置地址。可以使用 Apple TV 键盘，
   也可以在系统键盘出现在附近 iPhone 上时用手机输入。
2. 打开“节点（Nodes）”，浏览策略组并选择支持手动切换的成员。
3. 回到首页选择规则、全局或直连模式，然后连接。

Apple TV 版以遥控器操作和客厅距离为前提。连接、规则、DNS 与诊断可以直接
在电视上查看；当前不承诺本地 YAML 文件导入或 iCloud Drive 备份。

## 配置兼容性

iPhone、iPad 与 Mac 可以直接读取 mihomo YAML，也可以添加返回 mihomo YAML
的 HTTPS 配置地址。Apple TV 通过配置地址获取配置。

来自其他客户端的配置是否能直接使用，取决于配置格式、协议及参数。请参阅
[完整兼容性说明](/zh/guide/compatibility)。配置由用户自行提供；Clash 不提供
服务器、线路或网络服务。

## 支持的协议

Clash 当前支持 23 类出站协议，包括 HTTP、SOCKS、Shadowsocks、VMess、
VLESS、Trojan、Hysteria2、TUIC、WireGuard、MASQUE、TrustTunnel 与
OpenVPN。完整范围、协议与控制出站的区别及配置方式请参阅
[支持的协议](/zh/guide/protocols)。

## 隐私与支持

Clash 无需账户，配置与运行信息留在设备上；外部请求只服务于你配置或主动
启动的功能。详细说明请参阅[隐私模型](/zh/guide/privacy-model)与
[隐私政策](/zh/privacy)。

非保密问题可以提交到
[Clash 客户端 Issue](https://github.com/TokenPLS/Hako-Client/issues)。
