---
title: Hako
description: Hako 是面向 Apple NetworkExtension 的开源 mihomo 分叉内核，为 Clash 提供多协议、规则分流、DNS 与本机控制能力。
keywords:
  - Hako内核
  - mihomo iOS内核
  - NetworkExtension代理内核
  - 开源网络内核
  - Hako xcframework
jsonLd:
  "@context": https://schema.org
  "@type": SoftwareSourceCode
  name: Hako
  description: 面向 Apple NetworkExtension 的开源 mihomo 分叉内核，为 Clash 提供多协议与规则分流能力。
  codeRepository: https://github.com/TokenPLS/Hako
  license: https://www.gnu.org/licenses/gpl-3.0.html
  programmingLanguage: Go
  runtimePlatform:
    - iOS
    - iPadOS
    - macOS
    - tvOS
  isBasedOn: https://github.com/MetaCubeX/mihomo
  inLanguage: zh-CN
---

# Hako

**高性能 · 自适应 · 开源内核**

Hako 是驱动 Clash 的开源网络内核。它将
[mihomo](https://github.com/MetaCubeX/mihomo) 的稳定版本分叉封装为
`Hako.xcframework`，通过 Swift 与 Objective-C 接口提供给 Apple App。

## 为 Apple 平台而生

Clash 在 Apple 的 NetworkExtension 环境中运行 Hako，数据包全程通过公开的
`NEPacketTunnelFlow` API 收发，完整遵循 Apple 的公开系统接口。

Hako 针对 Packet Tunnel 的内存与能效目标进行了专门调校。内核会在
本机提供吞吐、连接数、内存与健康状态，让 App 能够如实展示运行情况。

## 真机测试数据

Hako 公开的发布证据包含 iPad Pro（M2）上的受控测试：

| 测试 | 结果 |
| --- | --- |
| 公网 Speedtest | 下行 924 Mbps · 上行 545 Mbps · 延迟 5 ms |
| 测速时内核内存 | 18.7 MiB |
| 30 分钟压力测试 | 搬运 16.49 GB · 0 掉线 · 0 丢包 · 0 崩溃 |
| 400 条并发连接 | 在 50 MiB 测试预算下使用 39.6 MiB |

这些数据记录了指定硬件、网络与构建下的实测结果，实际表现会随设备、线路
与配置而变化。

## 内核能力

- **协议：** Shadowsocks、VMess、VLESS、Trojan、Snell、Hysteria、
  Hysteria2、TUIC、WireGuard、AnyTLS、SSH 等。
- **DNS：** DoH、DoT、DoQ、fake-IP、流量嗅探与分域名解析规则。
- **路由：** domain、IP-CIDR、GEOIP、GEOSITE、RULE-SET 与逻辑规则。
- **策略组：** select、url-test、fallback、load-balance，包含健康检查与
  远程 Provider。
- **本机控制：** 状态、流量、连接、代理、日志、延迟测试与连接控制均走
  App 私有的本机通道。

## 开源与审计

Hako 跟随钉定的 mihomo 稳定版本。Hako 相对上游的源代码改动以 GPL-3.0
公开，任何人都可以独立审阅；每一处实现与安全疑问都可以直接对照代码核验。

Hako 由 Clash & Hako Team 作为独立分叉维护，MetaCubeX 与 SagerNet 名称
仅用于说明技术来源。首个正式 `v*-hako.*` Release 发布前，SDK 使用
pre-1.0 版本标识。

## 源代码

- [Hako 内核](https://github.com/TokenPLS/Hako)
- [完整中文 README](https://github.com/TokenPLS/Hako/blob/main/README.zh-CN.md)
- [mihomo 上游项目](https://github.com/MetaCubeX/mihomo)
- [安全政策](https://github.com/TokenPLS/Hako/blob/main/SECURITY.md)
