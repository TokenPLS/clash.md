---
title: Clash 配置最佳实践
description: 面向普通用户的 Clash 配置指南：选择单机场、双机场或服务分类社区模板，正确填写订阅地址，并尽量让中国大陆流量直连。
keywords: [Clash 最佳配置, mihomo YAML 模板, Hako Profile, Clash 配置模板]
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: 选择并导入 Clash 配置模板
  description: 选择适合的社区模板，填写可信订阅地址，导入 Clash，并验证 DNS、规则命中与实际出口。
  inLanguage: zh-CN
  step:
    - "@type": HowToStep
      position: 1
      name: 选择配置模板
      text: 单机场选择地区分类版或服务分类版，两个机场选择双机场地区分类版。
    - "@type": HowToStep
      position: 2
      name: 下载并导入
      text: 将 YAML 下载到本地，再作为本地配置文件导入 Clash。
    - "@type": HowToStep
      position: 3
      name: 填写订阅地址
      text: 在编辑源码中找到 proxy-providers，把自己的订阅地址粘贴到对应 url 的英文双引号内。
    - "@type": HowToStep
      position: 4
      name: 保存并启用
      text: 保存文件，选中当前配置，再从主页发起连接。
    - "@type": HowToStep
      position: 5
      name: 验证实际行为
      text: 检查 DNS、WebRTC、规则命中和真实出口；不同节点与网络需要分别验证。
    - "@type": HowToStep
      position: 6
      name: 保护敏感信息
      text: 更新前备份，分享前隐藏订阅地址、凭据、密钥与日志。
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

现有 Profile 如果已经包含节点、策略组和规则，通常不需要再叠加另一份
“优化模板”。只使用一个来源时，直接在 Clash 中添加完整 Profile 最省心。
下面三份社区模板都是**完整配置**：它们把你的订阅当作 Proxy Provider 使用，
不应再粘贴到另一份完整配置里面。

需要自己维护规则，或把多个节点来源放进同一套策略时，可以使用下面的
Provider 结构。

## 三个社区模板怎么选

三个模板使用同一套 DNS、广告拦截和中国大陆直连规则，区别只在订阅数量与
策略组的组织方式。模板中没有预填订阅地址。

| 模板 | 订阅数量 | 适合谁 | 下载 |
| --- | ---: | --- | --- |
| 单机场地区分类版 | 1 | 想按美国、新加坡、香港、日本、台湾和欧洲等地区选线路 | <a href="/configs/region-single-provider.yaml" download>下载 YAML</a> |
| 双机场地区分类版 | 2 | 同时使用主力与备用机场，希望同地区能在两个来源之间故障切换 | <a href="/configs/region-dual-provider.yaml" download>下载 YAML</a> |
| 单机场服务分类版 | 1 | 希望 YouTube、Netflix、GPT、Telegram 等服务分别选择地区或线路 | <a href="/configs/service-single-provider.yaml" download>下载 YAML</a> |

如果你第一次接触 YAML，先用**单机场地区分类版**。只有确实需要两个订阅时
再用双机场版；只有确实想让不同服务走不同地区时，再用服务分类版。

::: warning 这些是社区模板
模板来自社区公开分享，不代表 Clash 官方为其中的第三方 DNS、图标、规则集或
订阅服务背书。远程内容可能更新，实际结果也会随机场、自建节点、网络和系统
环境变化。请先备份现有配置，并只填写自己选择且信任的订阅地址。
:::

::: tip 更换配置后 DNS 测试异常时
先确保 Clash 处于**启动代理状态**，然后进入
**更多 → DNS → DNS 查询**，依次点击**清空 DNS 缓存**和
**清空 Fake-IP 缓存**。清理完成后，保持当前配置运行，再重新进行
DNS Leak Test。

如果之前使用过其他配置，尤其是从旧配置切换到官网配置后出现异常，
建议先清理这两项缓存，避免旧配置遗留的 DNS 缓存和 Fake-IP 缓存
影响测试结果。Clash 未启动代理时，无法使用这里的缓存清理功能。
:::

这些文件面向通用 mihomo 客户端，因此保留了 `mixed-port`、`tun` 与
`external-controller` 等跨平台字段。在 Clash 中，系统隧道、文件路径与控制
通道仍受 App 和 Apple 平台边界管理；新手不需要改这些字段，更不要打开
`allow-lan` 或把控制器暴露到局域网。详见[安全边界](/zh/guide/config/security)。

## 第一次使用：照着做

1. 从上表下载需要的 `.yaml` 文件到本地；不要复制浏览器预览页面里的零散片段。
2. 在 Clash 的配置文件页面导入这个本地文件。
3. 点击该配置文件后面的感叹号，选择“编辑源码”。
4. 搜索 `proxy-providers`。单机场版只填写 `Primary-VPS`；双机场版还要填写
   `Backup-VPS`。把链接粘贴到 `url` 后的英文双引号内：

   ```yaml
   proxy-providers:
     Primary-VPS:
       type: http
       url: "https://example.com/your-private-subscription"
   ```

   双引号要保留。订阅地址经常含有 `?`、`&` 或 `#`；引号可以避免 YAML 把
   链接的一部分误当成注释。不要填写上面的示例地址。
5. 保存，回到配置文件列表并选中刚才编辑的文件，然后从主页开始连接。
6. 第一次启用需要下载节点、规则集和图标，可能比普通配置稍慢。下载失败时先
   检查 Provider 与规则集状态，不要连续反复启动。
7. 打开策略组确认引用正常，再检查 DNS、规则命中和实际出口。

订阅地址通常包含可使用你账户流量的 Token，安全级别等同密码。截图、发群、
提交 Issue 或分享配置前，必须把整个订阅地址删除。

## 三个模板实际怎么分流

规则从上到下只命中一次，顺序可以简化为：

1. 局域网与本机地址直连。
2. Apple 推送走独立故障转移链路，GitHub 和明确列出的海外服务
   按模板指定处理。
3. 广告与隐私规则命中后拒绝连接。
4. `ChinaMax`、`GEOSITE,CN` 与 `GEOIP,CN` 命中的中国大陆流量直连。
5. 仍未命中的流量由最后的 `MATCH,PROXY-Gate` 交给代理。

因此这里的目标是**尽可能让中国大陆流量直连**，不是承诺所有中国大陆流量
永远直连。规则集会更新，共享 CDN、域名变化和识别误差也可能改变结果；新的
中国大陆域名在规则收录前还可能落入最后的代理兜底。

三份 YAML 各自只写了几十到一百多条入口规则，主要规则来自 11 个远程
Rule Provider。社区发布者估算展开后总量约 20 万条；实际数量会随上游更新，
不同规则集之间也可能重叠。规则多不等于一定更准确，请以实际命中记录为准。

## 策略组怎么选

- `PROXY-Gate` 是没有独立指定服务时的总出口。选择 `DIRECT` 会让其负责的
  未匹配流量直连，不建议新手把它当作“修复网络”的开关。
- `Apple Push` 与 `PROXY-Gate` 相互独立。APNs 流量会先进入
  `APNs-Fallback`；该组每 300 秒检查全部机场节点，并在当前线路
  不可用时自动切换。若所有代理线路均不可用，`Apple Push` 最终
  回退到 `DIRECT`。
- `US-Auto`、`SG-Auto` 等地区 Auto 会在名称匹配该地区的节点中定期测速并
  自动选择，不是固定某一台节点。节点命名不含模板识别的国家或地区关键词时，
  不会进入相应 Auto 组。
- `Global-Manual` 或 `Primary-Manual`、`Backup-Manual` 用于手动固定节点。
  双机场版的地区 Fallback 会先比较两个机场各自的地区 Auto 组，再做故障切换。
- 服务分类版的 YouTube、Netflix、GPT、Telegram 等组彼此独立。例如把 GPT
  设为 `US-Auto`、Netflix 设为 `SG-Auto` 后，切换 `PROXY-Gate` 不会覆盖它们。
  要把某个服务固定到单一节点，可先在 `PROXY-Gate → Global-Manual` 选中节点，
  再让该服务选择 `PROXY-Gate`。

## DNS、WebRTC 与自建 VPS

社区发布者报告：使用 8 个不同机场链接测试时，没有观察到 DNS 或 WebRTC
泄漏，策略组引用也正常。这是特定设备、网络、节点与测试方式下的结果，**不是
对所有环境的安全保证**。切换网络、节点、浏览器或 DNS 后，都应重新测试。

自建 VPS 要格外谨慎。节点服务器如果使用域名，解析它所走的 DNS 可能受本地
网络、`proxy-server-nameserver` 与 `proxy-server-nameserver-policy` 共同影响，
从而出现解析器或结果意外变化的现象。遇到这种情况时：

1. 先停用社区模板，确认自建 VPS 的原始简化配置能够稳定连接。
2. 不要通过随意添加更多公共 DNS 来“碰碰运气”。先确认节点域名由哪个解析器
   查询，再按自己的信任边界设置精确策略。
3. 分别测试 Wi-Fi 与蜂窝网络，并在切换节点后复查 DNS、WebRTC 和真实出口。
4. 无法解释 DNS 路径时，继续使用原始配置或下面的最小模板，不要用这三份模板
   承载敏感流量。

模板还会连接第三方 DNS，并从 GitHub 下载规则集、从 CDN 下载策略组图标；这些
请求及维护方都在你的信任边界内。需要查看具体地址时，请在导入前直接阅读源码。

## 想自己维护：一份最小模板

不需要地区分类、服务分类或约 20 万条远程规则时，下面这份小模板更容易审查、
排错和长期维护。

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

## 为什么最小模板里没有 TUN 和控制器

Hako 运行在 Apple Network Extension 中。虚拟接口、路由、DNS 劫持、Provider
文件路径与资源缓存应由客户端按当前平台管理。最小模板因此不预设 `mixed-port`、
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
