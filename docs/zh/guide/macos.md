---
title: Mac 使用指南
description: 在 Mac 上添加和切换 Clash Profile、选择模式与线路、使用菜单栏、查看 Connections，并确认新设置何时生效。
keywords:
  - Clash Mac使用指南
  - Clash macOS添加Profile
  - Clash Mac选择节点
  - Clash菜单栏
  - Clash Connections
pageClass: clash-device-guide-page
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Mac 上使用 Clash
  description: 从添加 Profile、选择模式和线路，到连接、查看活动连接并确认设置生效。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 添加 Profile
      text: 从 Profile 地址、配置文件、粘贴内容、空白配置或二维码图片添加配置。
    - "@type": HowToStep
      position: 2
      name: 选择模式与线路
      text: 在首页选择出站模式，并在策略组中选择线路。
    - "@type": HowToStep
      position: 3
      name: 连接
      text: 从主窗口或菜单栏连接。
    - "@type": HowToStep
      position: 4
      name: 查看 Connections
      text: 查看新连接实际命中的规则、出站目标和代理链。
---

# Mac 使用指南

从主窗口到菜单栏，从 Profile 管理到连接检查，这一页只讲 Mac 上的完整操作。

<nav class="everyday-task-grid" aria-label="Mac 使用主题">
  <a href="#管理-profile"><strong>管理 Profile</strong><span>添加、切换、同步与导出</span></a>
  <a href="#选择出站模式"><strong>选择出站模式</strong><span>Rule、Global 与 Direct</span></a>
  <a href="#选择线路"><strong>选择线路</strong><span>策略组、节点与延迟</span></a>
  <a href="#连接与菜单栏"><strong>连接与菜单栏</strong><span>主窗口与快速控制</span></a>
  <a href="#查看活动连接"><strong>查看活动连接</strong><span>规则、代理链与连接详情</span></a>
  <a href="#确认设置已经生效"><strong>确认设置已经生效</strong><span>检查真正的新连接</span></a>
</nav>

## 管理 Profile

从侧边栏进入“配置（Profiles）”。选择“添加配置（Add Profile）”后，可以使用
Profile 地址、配置文件、粘贴内容或空白配置；二维码通过选择图片识别。

单击配置行切换，点行尾箭头进入详情。当前 Profile 和切换进度会直接显示在列表
中。右键配置行可以同步、复制、导出或删除；详情页还可查看和编辑配置属性。

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

进入“代理（Proxies）”，展开策略组并选择节点。当前节点使用选中背景和左侧
强调线表示；节点卡片会显示延迟、失败或超时状态。

搜索、全部展开与全部收起位于窗口工具栏。连接后可以使用“全部测速（Test All）”
比较当前网络下的响应速度。延迟更低不等于任何网络和任何时间下都拥有更高吞吐。

## 连接与菜单栏

从首页连接。第一次连接时，按照系统提示允许 Clash 添加 VPN 配置。连接后，首页
显示状态、持续时间和实时流量。

不打开主窗口时，可以从菜单栏连接、断开或切换模式，并查看当前线路。菜单栏
不能选择节点；需要更换节点时，从首页的 Proxies 卡片或侧边栏 Proxies 进入。
需要检查配置、规则、DNS、日志或连接详情时，再回到主窗口。

## 查看活动连接

从侧边栏 `Session` → `Connections`。列表显示目标、匹配规则、出站目标、代理链
与传输量；右侧详情可查看端点、流量和连接元数据。

可以搜索、排序、关闭单条连接，或使用 Close All 结束全部活动连接。发起连接的
App 仍可能按自身逻辑自动重连。

## 确认设置已经生效

依次检查：

1. Profiles 列表中的当前项是否已经切到目标配置。
2. Outbound Mode 的选择标记是否位于目标模式。
3. 目标策略组中的节点是否显示选中样式。
4. 确保目标 App 建立一条**新连接**，再到 Connections 查看实际命中的规则、
   出站目标和代理链。

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
