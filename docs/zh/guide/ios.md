---
title: iPhone 与 iPad 使用指南
description: 在 iPhone 与 iPad 上添加和切换 Clash Profile、选择模式与线路、连接、查看 Connections，并确认新设置何时生效。
keywords:
  - Clash iPhone使用指南
  - Clash iPad使用指南
  - Clash添加Profile
  - Clash选择节点
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 iPhone 与 iPad 上使用 Clash
  description: 从添加 Profile、选择模式和线路，到连接、查看活动连接并确认设置生效。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 添加 Profile
      text: 从 Profile 地址、配置文件、粘贴内容、空白配置或二维码添加配置。
    - "@type": HowToStep
      position: 2
      name: 选择模式与线路
      text: 在首页选择出站模式，并在策略组中选择线路。
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 从首页连接，并允许系统添加 VPN 配置。
    - "@type": HowToStep
      position: 4
      name: 查看 Connections
      text: 查看新连接实际命中的规则、出站目标和代理链。
---

# iPhone 与 iPad 使用指南

从第一次添加 Profile，到切换线路、查看连接和确认设置生效，这一页只讲
iPhone 与 iPad 上的操作。

<nav class="everyday-task-grid" aria-label="iPhone 与 iPad 使用主题">
  <a href="#管理-profile"><strong>管理 Profile</strong><span>添加、切换、更新与移除</span></a>
  <a href="#选择出站模式"><strong>选择出站模式</strong><span>Rule、Global 与 Direct</span></a>
  <a href="#选择线路"><strong>选择线路</strong><span>策略组、节点与延迟</span></a>
  <a href="#连接与快捷操作"><strong>连接与快捷操作</strong><span>首页、控制中心与快捷指令</span></a>
  <a href="#查看活动连接"><strong>查看活动连接</strong><span>规则、代理链与实时流量</span></a>
  <a href="#确认设置已经生效"><strong>确认设置已经生效</strong><span>检查真正的新连接</span></a>
</nav>

## 管理 Profile

### 进入配置列表

- iPhone：在首页顶部点当前 Profile 名称。
- iPad：常规宽度下从侧边栏进入“配置（Profiles）”；窄幅分屏与 iPhone 路径
  相同。

选择“添加配置（Add Profile）”后，可以使用 Profile 地址、配置文件、粘贴内容
或空白配置。iPhone 与 iPad 还可以直接扫描二维码，或从照片中读取二维码。

点配置行即可切换，点行尾信息按钮查看详情。当前 Profile 显示勾选，切换完成后
首页顶部名称同步更新。详情页可用于更新、重命名、导出或移除配置。

::: tip Profile 可能包含凭据
Profile 地址、配置文件与备份可能包含服务器凭据。公开求助时，不要贴出真实
地址、用户名、密码、密钥或未脱敏日志。
:::

## 选择出站模式

在首页“出站模式（Outbound Mode）”卡片中选择：

| 模式 | 作用 |
|---|---|
| 规则（Rule） | 按当前 Profile 的规则，为每条连接决定直连、代理或拒绝 |
| 全局（Global） | 将流量交给全局代理组及其中选中的线路 |
| 直连（Direct） | 不经过代理，直接连接目标 |

日常使用通常选择 Rule。不同连接可能命中不同策略组，因此 Rule 模式下不存在一个
代表全部流量的“唯一当前节点”。Direct 不使用代理，节点页面不显示策略组与节点
是正常状态。

## 选择线路

进入“代理（Proxies）”，找到负责这类流量的策略组，再在组内选择节点。当前节点
使用选中背景和左侧强调线表示；节点卡片会显示延迟、失败或超时状态。

连接后可以使用“全部测速（Test All）”比较当前网络下的响应速度。延迟更低不等于
任何网络和任何时间下都拥有更高吞吐，实际使用体验仍取决于线路与网络环境。

iPad 在宽屏下使用多列网格，操作方式与 iPhone 相同。

## 连接与快捷操作

回到首页连接。第一次连接时，按照系统提示允许 Clash 添加 VPN 配置。连接成功后，
首页会显示状态、持续时间和实时流量。

iPhone 与 iPad 还可以通过控制中心和快捷指令执行常用操作；是否自动连接则由你
设置的按需连接条件决定。

## 查看活动连接

- iPhone：`工具（Utilities）` → `Current Session` → `连接（Connections）`。
- iPad：常规宽度下从侧边栏直接进入；窄幅分屏使用与 iPhone 相同的路径。

Connections 会显示目标、匹配规则、出站目标、代理链与传输量。可以搜索、排序、
查看详情、关闭单条连接，或使用“全部关闭（Close All）”结束当前活动连接。发起
连接的 App 仍可能按自身逻辑自动重连。

## 确认设置已经生效

依次检查：

1. 配置列表的勾选和首页名称是否已经切到目标 Profile。
2. Outbound Mode 的选择标记是否位于目标模式。
3. 目标策略组中的节点是否显示选中样式。
4. 确保目标 App 建立一条**新连接**，再到 Connections 查看实际命中的规则和
   代理链。

单纯刷新网页可能继续复用 HTTP/2、HTTP/3 或 QUIC。需要确定时，先在
Connections 中关闭对应旧连接，再让目标 App 重新联网。

首页的“出口 IP（External IP）”卡片可以辅助判断，但它只说明这一次出口查询
走了哪里；在 Rule 模式下，不能代表所有目标都使用同一线路。

## 更改设置后，已有连接怎么办？

- **切换 Profile**：成功后通常会结束当前活动连接；仍需通信的 App 自行建立
  新连接后使用新 Profile。Tunnel 可以保持 Connected。
- **切换 Rule 与 Direct**：模式切换本身不会迁移或主动关闭旧连接，新连接使用
  新模式；客户端随后刷新运行配置时，旧连接仍可能结束。
- **切换到 Global**：只有还需要调整 `GLOBAL` 组，且保持默认的“切换节点时关闭
  连接”时，现有连接才会结束。
- **手动更换节点**：开启“切换节点时关闭连接”时会结束现有连接；关闭该设置后，
  旧连接不会被主动清理。
- **停止并重新连接 Tunnel**：全部连接中断，新 Tunnel 中的连接使用当前设置。

重要下载、通话或游戏进行中，避免切换 Profile、节点或 Tunnel。需要立刻让流量
使用新设置时，可以在 Connections 中使用 Close All，再让目标 App 建立新连接。
