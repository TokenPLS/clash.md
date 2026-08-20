---
title: 开始使用
description: 在 iPhone、iPad、Mac 或 Apple TV 上添加自己的 Clash 或 mihomo 配置，选择线路并完成第一次连接。
keywords:
  - Clash使用教程
  - Clash iPhone添加配置
  - mihomo YAML导入
  - Clash节点测速
  - Clash规则模式
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 如何在 Apple 平台上开始使用 Clash
  description: 添加自己的 Clash 或 mihomo 配置，选择线路并完成第一次连接。
  inLanguage: zh-CN
  supply:
    - "@type": HowToSupply
      name: 可用的 Clash 或 mihomo 配置，或 Profile 地址
  step:
    - "@type": HowToStep
      position: 1
      name: 添加配置
      text: 在 iPhone、iPad 或 Mac 上添加 Profile 地址或导入 YAML；在 Apple TV 上输入 Profile 地址。
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
配置，接下来只需要添加配置、选择线路并连接。

::: tip 配置可能包含凭据
请把配置文件、Profile 地址与备份视为敏感信息。公开求助时，不要贴出真实地址、
用户名、密码、密钥或未脱敏日志。
:::

## 三步连接

### 1. 添加配置

进入“配置（Profiles）”并选择“添加配置（Add Profile）”。iPhone、iPad 与 Mac
可以使用 Profile 地址、配置文件、粘贴内容或空白配置；iPhone 与 iPad 还可以
扫描二维码。Apple TV 使用 HTTP 或 HTTPS Profile 地址。

### 2. 选择线路

进入“代理（Proxies）”或“节点（Nodes）”，找到负责这类流量的策略组，查看
延迟并选择线路。自动选择类策略组会按照配置中的健康检查自行决定结果。

### 3. 连接

回到首页连接。首次连接时，按照系统提示允许 Clash 添加 VPN 配置。日常使用
推荐“规则（Rule）”模式：每条连接按照当前配置决定直连、使用代理或拒绝。

::: info 需要一份配置起点？
可以从[配置最佳实践与最小模板](/zh/guide/config/best-practice)开始。需要查询
具体字段或平台差异时，再进入[完整配置参考](/zh/guide/config/)。
:::

## 已经连接，接下来呢？

<section class="guide-next-card" aria-labelledby="everyday-use-title-zh">
  <span>日常使用</span>
  <h3 id="everyday-use-title-zh">从会连接，到真正用顺手。</h3>
  <p>管理配置、选择节点、切换出站模式、查看活动连接，并确认新的设置什么时候真正生效。</p>
  <a href="/zh/guide/everyday-use">查看日常使用 →</a>
</section>

## 按设备继续

<nav class="guide-platform-grid" aria-label="按设备查看使用方法">
  <a href="/zh/guide/ios"><strong>iOS</strong><span>iPhone 与 iPad 完整指南</span></a>
  <a href="/zh/guide/macos"><strong>macOS</strong><span>Mac 完整指南</span></a>
  <a href="/zh/guide/tvos"><strong>tvOS</strong><span>Apple TV 完整指南</span></a>
</nav>

## 继续了解

<nav class="config-topic-grid" aria-label="继续了解 Clash">
  <a href="/zh/guide/everyday-use"><strong>日常使用</strong><span>配置、节点、模式与活动连接</span></a>
  <a href="/zh/guide/config/best-practice"><strong>配置最佳实践</strong><span>从可信、最小的配置开始</span></a>
  <a href="/zh/guide/config/"><strong>配置参考</strong><span>字段、平台差异与安全边界</span></a>
  <a href="/zh/guide/compatibility"><strong>兼容性说明</strong><span>迁移已有配置与节点</span></a>
  <a href="/zh/guide/protocols"><strong>支持的协议</strong><span>查看完整出站协议范围</span></a>
  <a href="/zh/guide/privacy-model"><strong>隐私模型</strong><span>了解哪些数据留在设备上</span></a>
</nav>
