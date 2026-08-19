---
title: Clash 配置最佳实践
description: 面向普通用户的 Hako 与 mihomo YAML 最佳实践：先使用可信 Profile，再用一份最小、可检查、易维护的配置模板。
keywords: [Clash 最佳配置, mihomo YAML 模板, Hako Profile, Clash 配置模板]
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 建立一份最小、可维护的 Clash 配置
  description: 从可信 Profile 开始，使用规则模式，验证实际行为，并保护配置凭据。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 选择可信 Profile
      text: 添加自己选择并信任的 Profile 地址或 mihomo YAML。
    - "@type": HowToStep
      position: 2
      name: 保持规则模式
      text: 让策略组处理日常线路选择。
    - "@type": HowToStep
      position: 3
      name: 验证实际行为
      text: 检查 DNS、规则命中和真实出口。
    - "@type": HowToStep
      position: 4
      name: 保护敏感信息
      text: 更新前备份，分享前隐藏 Profile 地址、凭据、密钥与日志。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/config/best-practice
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/config/best-practice
---

# 配置最佳实践

你不必先弄懂全部配置项，才能安心使用 Clash。先让一份来源可信的配置稳定
运行，再按自己的需要逐步调整；每一项改动都清楚为什么存在，就已经是一份好
配置。

## 从一份可信配置开始

如果你已经有 Profile 地址或 mihomo YAML，可以沿着这条路径开始：

1. 添加自己选择并信任的配置。
2. 使用“规则（Rule）”模式，让策略组按照配置处理日常线路选择。
3. 首次连接后，看一眼 DNS、规则命中和实际出口是否符合自己的预期。
4. 调整或更新前保留备份；公开求助时隐藏 Profile 地址、用户名、密码和密钥。

现有 Profile 如果已经包含节点、策略组和规则，通常不需要再叠加来源不明的
“优化模板”。只使用一个来源时，直接在 Clash 中添加完整 Profile 最省心。

需要自己维护规则，或把多个节点来源放进同一套策略时，可以使用下面的
Provider 结构。

## 一份能长期维护的模板

```yaml
# 常规设置
mode: rule
log-level: warning
ipv6: true
unified-delay: true
tcp-concurrent: true

# 记住手动选择和 Fake IP 映射。
# tvOS 的文件状态可能被系统清理，Hako 会按需重建。
profile:
  store-selected: true
  store-fake-ip: true

# Hako 在 Apple Packet Tunnel 内管理 DNS 与 TUN。
dns:
  enable: true
  ipv6: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  use-hosts: true
  fake-ip-filter:
    - "+.lan"
    - "+.local"

# Hako 同时接受标准 Proxy Provider，以及含顶层 proxies 的完整 mihomo Profile。
# 激活时会校验并提取代理集合，再原子写入 App 私有目录。
proxy-providers:
  provider-a:
    type: http
    url: "https://example.com/profile-a.yaml"
    path: ./providers/provider-a.yaml
    interval: 21600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 600
      lazy: true
    override:
      additional-prefix: "[A] "

  provider-b:
    type: http
    url: "https://example.com/profile-b.yaml"
    path: ./providers/provider-b.yaml
    interval: 21600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 600
      lazy: true
    override:
      additional-prefix: "[B] "

  provider-c:
    type: http
    url: "https://example.com/profile-c.yaml"
    path: ./providers/provider-c.yaml
    interval: 21600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 600
      lazy: true
    override:
      additional-prefix: "[C] "

proxy-groups:
  # 日常入口：可以手动选节点，也可以交给 AUTO。
  - name: PROXY
    type: select
    proxies:
      - AUTO
      - DIRECT
    use:
      - provider-a
      - provider-b
      - provider-c

  # 按健康检查结果自动选择。
  - name: AUTO
    type: url-test
    use:
      - provider-a
      - provider-b
      - provider-c
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50

rules:
  # 局域网保持直连，其他连接交给 PROXY。
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR6,fc00::/7,DIRECT,no-resolve
  - MATCH,PROXY
```

## 按自己的情况替换

- 把三个示例地址替换成自己选择并信任的 Provider 或完整 mihomo Profile 地址；
  不需要三个来源时，删除多余 Provider 及两个 `use` 列表中的对应名称。
- 每个 Provider 必须使用唯一的名称、`path` 和前缀。前缀可以避免同名节点混在
  一起；Hako 激活时会把相对 `path` 改写为 App 私有目录中的绝对文件路径。
- `lazy: true` 表示按需触发 Provider 健康检查，并不代表导入后会立即探测全部
  节点。不要把模板里的 `type: http` 改成 `file`；本地文件是 Hako 下载、校验和
  原子写入后的内部运行形态。
- 健康检查会产生真实网络请求。示例地址不可用时，请换成当前网络与节点都能
  稳定访问的小文件或 `generate_204` 地址。
- 只在确实需要时添加自定义 DNS。解析器会看到你的 DNS 查询，应选择你信任
  且在当前网络可用的服务。
- 自动选择可以使用 `url-test`、`fallback` 或 `load-balance`；`relay` 策略组已
  从当前上游移除。
- 日常使用 `warning` 日志即可；排查问题时可以临时改为 `info`，结束后再改回。
- 不要照抄 `allow-lan`、本地端口、监听器、外部控制器或证书跳过校验。它们会
  扩大攻击面，详见[安全边界](/zh/guide/config/security)。

## 为什么模板里没有 TUN 和控制器

Hako 运行在 Apple Network Extension 中。虚拟接口、路由、DNS 劫持、Provider
文件路径与资源缓存应由客户端按当前平台管理。模板因此不预设 `mixed-port`、
`allow-lan`、`external-controller`、TUN 设备名、严格进程模式或自定义 geodata
下载地址。

需要按进程路由时使用 macOS；iOS 与 tvOS 请使用域名、IP、端口或网络类型
规则。

## 保存前检查

- YAML 能否解析，节点名称是否与策略组和规则完全一致。
- 最后一条规则是否明确收口，例如 `MATCH,PROXY`。
- 没有真实凭据被写进公开仓库、截图或 Issue。
- iOS / tvOS 没有依赖按进程规则；需要按进程路由时使用 macOS。

需要进一步调整时，再进入[完整字段参考](/zh/guide/config/)。
