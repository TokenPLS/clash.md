---
title: iOS、macOS 与 tvOS 配置差异
description: 对比 Hako 配置在 iPhone、iPad、Mac 与 Apple TV 上的进程路由、文件、TUN、Provider 和高级能力。
---

# 三个平台，三种系统边界

三端使用同一套 Hako 数据面，但 Apple 提供给每个平台的网络元数据、文件环境和
交互入口不同。共同内核不等于所有系统能力完全相同。

| 能力 | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| mihomo YAML 核心语义 | 支持 | 支持 | 支持 |
| Packet Tunnel | 支持 | 支持 | 支持 |
| `tun.stack` | gVisor / System / Mixed | gVisor / System / Mixed | gVisor / System / Mixed |
| 进程名 / 路径 / UID 分流 | 无法可靠按进程识别 | 支持，取决于连接信息 | 无法可靠按进程识别 |
| App signing / team ID 规则 | 不支持 | 不支持 | 不支持 |
| 添加配置 | Profile 地址或本地 YAML | Profile 地址或本地 YAML | Profile 地址 |
| 远程 Profile | 支持 | 支持 | 支持 |
| HTTP Provider | Hako 管理 | Hako 管理 | Hako 管理 |
| 策略选择与 Fake IP 状态 | 按开关与缓存条件保存 | 按开关与缓存条件保存 | 缓存可能丢失 |
| Linux iptables / mark / TPROXY | 不适用 | 不适用 | 不适用 |

iOS/macOS 实际开启 Include All Networks 时，System/Mixed 会改为 gVisor；tvOS 固定关闭该选项。
三端的 `tun.include-uid`、包名与来源网卡筛选都不会执行；macOS 的进程/UID 分流规则属于另一条机制。
详见 [NE 与 TUN 三端差异及源码版本范围](/zh/guide/config/inbound#platforms)。

iOS/tvOS 的进程通配或正则规则可能匹配空身份，UID 规则另有移除处理。详见[进程分流说明](/zh/guide/config/rules)。

## 系统版本

- iOS / iPadOS 15 或更高版本
- macOS 13 或更高版本
- tvOS 17 或更高版本

查某个具体字段时，使用[完整字段表](/zh/guide/config/)的平台和状态筛选器。
