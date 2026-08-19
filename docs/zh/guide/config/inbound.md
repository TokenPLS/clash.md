---
title: 入站、监听器与 TUN
description: Hako 在 Apple Network Extension 中对 mihomo 入站、监听器、TUN、路由与服务端字段的支持边界。
---

# 入站、监听器与 TUN

Clash 使用 Apple Network Extension 建立 Packet Tunnel。Apple 系统负责虚拟
接口、路由与生命周期，因此 Linux 或桌面 mihomo 的 TUN 配置不能逐字映射到
iOS、macOS 和 tvOS。

## 支持什么

- iOS、macOS 与 tvOS 均支持 Packet Tunnel 与 TUN 配置。日常使用不需要手动
  指定虚拟网卡或桌面路由参数。
- Hako 会根据当前平台安装路由，并强制、修复或忽略不适用于 Network Extension
  的 TUN 字段。
- macOS 可提供进程名、进程路径和 UID 路由元数据；iOS / tvOS 不提供。

## 三平台 TUN 协议栈

iOS、macOS 与 tvOS 均支持 gVisor、System 与 Mixed 三种 TUN 协议栈，覆盖启动、
TCP/UDP/DNS、路由、重连、跨栈切换与停止清理。

Mixed 的运行状态当前通过配置回读、切换状态与数据面表现确认；独立运行时栈
标识将在后续内核交付中补齐。

## 不要当成默认能力

本地端口、`allow-lan`、自定义 listeners、tunnels、服务端配置与外部控制器都
可能开放设备上的服务。这些字段由内核识别，不代表适合默认开启。Apple Packet
Tunnel 也不支持 `interface-name`、`routing-mark`、iptables
和 Linux TPROXY 路由。

<ConfigFieldMatrix lang="zh" category="inbound" />
