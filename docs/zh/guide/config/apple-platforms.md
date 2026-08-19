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
| 进程名 / 路径 / UID 规则 | 不匹配 | 支持 | 不匹配 |
| App signing / team ID 规则 | 不支持 | 不支持 | 不支持 |
| 添加配置 | Profile 地址或本地 YAML | Profile 地址或本地 YAML | Profile 地址 |
| 远程 Profile | 支持 | 支持 | 支持 |
| HTTP Provider | 客户端管理 | 客户端管理 | 客户端管理，可重建缓存 |
| 文件状态与缓存 | App 容器 | App 容器 | 可能被清理 |
| Linux iptables / mark / TPROXY | 不适用 | 不适用 | 不适用 |

## 产品支持下限

- iOS / iPadOS 15 或更高版本
- macOS 13 或更高版本
- tvOS 17 或更高版本

查某个具体字段时，使用[完整字段表](/zh/guide/config/)的平台和状态筛选器。
