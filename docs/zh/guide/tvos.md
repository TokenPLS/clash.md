---
title: Apple TV 使用指南
description: 在 Apple TV 上添加和切换 Clash Profile、选择模式与节点、连接、查看 Connections，并确认新设置何时生效。
keywords:
  - Clash Apple TV使用指南
  - Clash tvOS添加Profile
  - Clash Apple TV选择节点
  - Clash tvOS Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Apple TV 上使用 Clash
  description: 从添加 Profile、选择模式和节点，到连接、查看活动连接并确认设置生效。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 添加 Profile
      text: 使用 HTTP 或 HTTPS Profile 地址添加配置。
    - "@type": HowToStep
      position: 2
      name: 选择模式与节点
      text: 从首页的 Using 区域选择出站模式，并在节点页选择线路。
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 从首页启动 Tunnel。
    - "@type": HowToStep
      position: 4
      name: 查看 Connections
      text: 查看正在经过 Tunnel 的代理、直连与已拒绝连接。
---

# Apple TV 使用指南

从添加 Profile 到遥控器选节点、查看实时连接，这一页只讲 Apple TV 上的操作。

<nav class="everyday-task-grid" aria-label="Apple TV 使用主题">
  <a href="#管理-profile"><strong>管理 Profile</strong><span>使用地址添加、切换与更新</span></a>
  <a href="#选择出站模式"><strong>选择出站模式</strong><span>Rule、Global 与 Direct</span></a>
  <a href="#选择节点"><strong>选择节点</strong><span>策略组、焦点与当前线路</span></a>
  <a href="#连接-tunnel"><strong>连接 Tunnel</strong><span>从首页开始或停止</span></a>
  <a href="#查看活动连接"><strong>查看活动连接</strong><span>代理、直连与已拒绝</span></a>
  <a href="#确认设置已经生效"><strong>确认设置已经生效</strong><span>检查真正的新连接</span></a>
</nav>

## 管理 Profile

从首页 `Using` 区域选择当前 Profile 名称，进入配置列表与详情。Apple TV 通过
HTTP 或 HTTPS Profile 地址添加配置，不提供配置文件、粘贴 YAML、二维码或
空白配置入口。

详情页会按状态显示不同操作：当前 Profile 显示 `In use`，并提供 `Update now`、
`Rename` 和 `Remove`；非当前 Profile 提供 `Rename`、`Use this profile` 和
`Remove`，不显示 `Update now`。

::: tip Profile 可能包含凭据
Profile 地址可能包含服务器凭据。公开求助时，不要贴出真实地址、用户名、密码、
密钥或未脱敏日志。
:::

## 选择出站模式

从首页 `Using` 区域进入出站模式页面：

| 模式 | 作用 |
|---|---|
| 规则（Rule） | 按当前 Profile 的规则，为每条连接决定直连、代理或拒绝 |
| 全局（Global） | 将流量交给全局代理组及其中选中的线路 |
| 直连（Direct） | 不经过代理，直接连接目标 |

选择后以移动后的选择标记为准；页面还会显示 `In force` 或
`Currently in force`。Global 缺少可用代理时，Clash 会保留原模式并说明原因。

Direct 不使用代理，因此节点页不显示策略组和节点是正常状态。切回 Rule 或
Global 后，相应策略组会重新出现。

## 选择节点

从首页选择“节点（Node）”，或进入“工具（Utilities）”→“节点（Nodes）”。
使用遥控器在左侧浏览策略组，再在右侧网格选择节点。当前节点显示
“使用中（In use）”。

Rule 模式下，不同连接可能命中不同策略组，因此不存在一个代表全部流量的
“唯一当前节点”。

## 连接 Tunnel

回到首页启动 Tunnel。第一次连接时，按照系统提示允许 Clash 添加 VPN 配置。
连接后，首页显示当前状态、持续时间与实时流量；需要停止时从同一位置操作。

## 查看活动连接

进入“工具（Utilities）”→“连接（Connections）”。可以按全部、代理、直连或
已拒绝过滤实时列表，查看正在经过 Tunnel 的目标与传输状态。

Apple TV 的 Connections 是只读视图，不提供单条关闭、Close All 或连接详情页。

## 确认设置已经生效

依次检查：

1. Profile 详情是否显示 `In use`。
2. Outbound Mode 是否显示目标模式已经 `In force`。
3. 目标策略组中的节点是否显示 `In use`。
4. 让目标 App 建立一条**新连接**，再到 Connections 查看它属于代理、直连还是
   已拒绝。

单纯刷新页面或重新播放内容，仍可能复用已有连接。Apple TV 不提供关闭连接操作；
需要让现有连接全部退出时，可以停止并重新连接 Tunnel。

Apple TV 当前没有 External IP 卡片。Rule 模式下本来也不能用一次出口 IP 查询
代表所有目标的实际路线。

## 更改设置后，已有连接怎么办？

- **切换 Profile**：Clash 会先断开 Tunnel，再使用所选 Profile 重新连接；全部
  现有连接都会中断。
- **切换模式或节点**：不会主动关闭已有连接。旧连接继续使用建立时的路线，新连接
  使用新模式或节点。
- **停止并重新连接 Tunnel**：全部连接中断，新 Tunnel 中的连接使用当前设置。

重要播放、通话或游戏进行中，避免切换 Profile 或 Tunnel。需要确定新设置时，
让目标 App 建立新连接，并在 Connections 中核对实际分类。
