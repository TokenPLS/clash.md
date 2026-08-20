---
title: 日常使用
description: 理解 Clash 的 Profile、出站模式、策略组、节点与活动连接，并确认设置何时真正作用在新连接上。
keywords:
  - Clash日常使用
  - Clash Profile
  - Clash选择节点
  - Rule Global Direct
  - Clash活动连接
  - Clash设置生效
pageClass: clash-everyday-page
jsonLd:
  "@context": https://schema.org
  "@type": FAQPage
  mainEntity:
    - "@type": Question
      name: Rule、Global 与 Direct 有什么区别？
      acceptedAnswer:
        "@type": Answer
        text: Rule 按 Profile 规则处理每条连接，Global 将流量交给全局代理组，Direct 不经过代理。
    - "@type": Question
      name: 为什么切换模式或节点后，出口没有立即变化？
      acceptedAnswer:
        "@type": Answer
        text: 已建立的连接不会迁移到新路线；它们结束或重新建立后，才会使用新的模式或节点。
    - "@type": Question
      name: 如何确认 Clash 的新设置已经生效？
      acceptedAnswer:
        "@type": Answer
        text: 核对当前 Profile、出站模式与策略组中的选中节点，再确保建立一条新连接，并在 Connections 中查看实际命中的规则和代理链。
---

# 日常使用

具体按钮在哪里，取决于你使用的设备；但日常判断“现在用了哪份配置、哪种模式、
哪条线路”，逻辑是相同的。先理解下面几层关系，再按设备查看完整操作。

## 按设备查看完整操作

<nav class="guide-platform-grid" aria-label="按设备查看完整使用指南">
  <a href="/zh/guide/ios"><strong>iOS</strong><span>iPhone 与 iPad 完整指南</span></a>
  <a href="/zh/guide/macos"><strong>macOS</strong><span>Mac 完整指南</span></a>
  <a href="/zh/guide/tvos"><strong>tvOS</strong><span>Apple TV 完整指南</span></a>
</nav>

## 先看懂四层关系

<nav class="everyday-task-grid" aria-label="Clash 日常使用中的四层关系">
  <a href="#profile-决定可用内容"><strong>Profile</strong><span>节点、策略组、规则与 DNS</span></a>
  <a href="#模式决定如何选路"><strong>出站模式</strong><span>Rule、Global 与 Direct</span></a>
  <a href="#策略组与节点决定具体线路"><strong>策略组与节点</strong><span>从规则结果到实际线路</span></a>
  <a href="#connections-显示真实结果"><strong>Connections</strong><span>查看每条连接实际去了哪里</span></a>
</nav>

### Profile 决定可用内容

一个 Profile 是一整套可以独立使用的配置，其中可以包含节点、策略组、规则、
DNS 与个性化设置。切换 Profile，相当于切换这整套内容，而不只是更换一个节点。

### 模式决定如何选路

| 模式 | 作用 |
|---|---|
| 规则（Rule） | 按当前 Profile 的规则，为每条连接决定直连、代理或拒绝 |
| 全局（Global） | 将流量交给 `GLOBAL` 策略组及其中选中的线路 |
| 直连（Direct） | 不经过代理，直接连接目标 |

Rule 是日常使用最常见的模式。不同连接可能命中不同策略组，因此不存在一个可以
代表全部流量的“唯一当前节点”。Direct 不使用代理，节点页面不显示策略组和节点
是正常状态。

### 策略组与节点决定具体线路

规则可以把不同连接交给不同策略组，再由策略组决定使用哪个节点。延迟测试适合
比较当前网络下的响应速度，但延迟更低不等于所有时间和所有网络下都拥有更高吞吐。

自动选择类策略组会按照 Profile 中的健康检查自行选择；手动选择类策略组则使用
你当前选中的节点。

### Connections 显示真实结果

Connections 显示正在经过 Tunnel 的活动连接，包括目标、匹配规则、出站目标、
代理链和传输量。它比单看出口 IP 更适合判断 Rule 模式下某一条连接实际使用了
哪条路线。

## 确认新设置已经生效

不要只判断“按钮已经点过”。按下面的顺序，从界面状态核对到真实流量：

1. **核对 Profile**：当前项和首页名称已经切到目标 Profile。
2. **核对模式**：Outbound Mode 的选择标记位于目标模式。
3. **核对节点**：目标策略组中的节点显示选中或 `In use`。
4. **建立新连接**：单纯刷新网页可能继续复用 HTTP/2、HTTP/3 或 QUIC。
5. **查看 Connections**：确认新连接实际命中的规则、出站目标和代理链。

iPhone、iPad 与 Mac 的 External IP 卡片只能说明这一次出口查询走了哪里；在
Rule 模式下，它不能代表所有目标都使用同一线路。Apple TV 当前没有该卡片。

## 更改设置后，已有连接怎么办？

**已有连接不会迁移到新路线。** 它们通常会继续使用建立时的规则与出口，直到
自然结束、被关闭或重新建立。不同操作还会触发下面这些客户端行为：

| 操作 | 已有连接 | 什么时候使用新设置 |
|---|---|---|
| iPhone、iPad 与 Mac 切换 Profile | 通常结束当前活动连接 | App 自行建立新连接后使用新 Profile |
| Apple TV 切换 Profile | Tunnel 先断开，全部连接中断 | 新 Tunnel 使用所选 Profile |
| Rule 与 Direct 之间切换 | 模式切换本身不主动关闭 | 新连接使用新模式；后续运行配置刷新仍可能结束旧连接 |
| iPhone、iPad 与 Mac 切换到 Global | 只有还需调整 `GLOBAL` 组且默认关闭连接设置开启时，现有连接才会结束 | App 自行建立新连接后使用新模式 |
| iPhone、iPad 与 Mac 手动切换节点 | 默认关闭连接设置开启时，现有连接会结束 | App 自行建立新连接后使用新节点 |
| Apple TV 切换模式或节点 | 不主动关闭，继续使用原路线 | 自然结束或重新建立后 |
| 停止并重新连接 Tunnel | 全部连接中断 | 新 Tunnel 中的连接使用当前设置 |

系统仍显示 VPN Connected，并不代表下载、视频、WebSocket、游戏或语音连接
没有重新建立。反过来，界面已经显示新模式，也不代表一条长期存在的连接会在
中途换出口。

### UDP、QUIC 与 DNS

UDP 与 QUIC 通常会复用已有映射，直到映射超时、关闭或重新创建。DNS 也可能
复用已有的 DoH、DoT 或 DoQ 连接；新的 DNS 查询不一定等于新的 DNS 连接。
因此这些流量可能比界面状态更晚使用新路线。

### 需要立即使用新设置？

- iPhone、iPad 与 Mac 可以在 Connections 中关闭对应旧连接或使用 Close All，
  再让目标 App 建立新连接。
- Apple TV 的 Connections 是只读视图；需要让现有连接全部退出时，可以停止并
  重新连接 Tunnel。
- 重要下载、通话、游戏或播放进行中，避免切换 Profile 或 Tunnel。

具体入口、可用操作和平台限制，请回到对应的
[iPhone 与 iPad](/zh/guide/ios)、[Mac](/zh/guide/macos)或
[Apple TV](/zh/guide/tvos)指南。
