---
title: Profile 状态、NTP 与实验配置
description: Hako 的 Profile 状态保存、NTP 与 experimental mihomo 配置在 iOS、macOS、tvOS 上的支持边界。
---

# Profile 状态、NTP 与实验配置

`profile.store-selected` 与 `profile.store-fake-ip` 用于保存选择和 Fake IP 状态。
iOS 与 macOS 支持文件状态；tvOS 的文件数据应按“可能被系统清理并重新生成”
设计。

## NTP

NTP 可以为需要准确时间的协议提供时间偏移，但 Hako 会保持
`write-to-system: false`，不会修改 Apple 设备的系统时间。

## Experimental

`experimental` 字段可以被当前内核识别，但它们会随内核版本变化。新配置不应
依赖实验项完成基础连接。

<ConfigFieldMatrix lang="zh" category="profile" />
<ConfigFieldMatrix lang="zh" category="ntp" />
<ConfigFieldMatrix lang="zh" category="experimental" />
