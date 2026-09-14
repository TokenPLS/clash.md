---
title: DNS 配置
---

# DNS 配置

DNS 设置决定用谁解析域名，以及向应用返回真实 IP 还是 Fake IP。下面是一个使用 DoH 的配置片段；解析器地址可替换为你当前网络能访问的服务。

```yaml
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 1.1.1.1
  nameserver:
    - https://cloudflare-dns.com/dns-query
  proxy-server-nameserver:
    - https://cloudflare-dns.com/dns-query
  fake-ip-filter:
    - '+.lan'
    - '+.local'
```

## 各类解析器的用途

| 字段 | 解析什么 | 何时填写 |
| --- | --- | --- |
| `default-nameserver` | DNS 服务自身的域名 | 使用带域名的 DoH/DoT 地址时提供 IP 形式的引导解析器 |
| `nameserver` | 普通目标域名 | 默认解析器列表 |
| `nameserver-policy` | 符合条件的指定域名 | 需要内网域名或特定网站使用另一组 DNS 时 |
| `proxy-server-nameserver` | 代理服务器的域名 | 尤其在 DNS 需要走代理或遵循规则时，避免先有代理还是先有 DNS 的循环依赖 |
| `proxy-server-nameserver-policy` | 指定代理服务器域名 | 配合非空的 `proxy-server-nameserver` 使用 |
| `direct-nameserver` | 直连出口的域名 | 需要单独指定直连解析器时 |
| `direct-nameserver-follow-policy` | 是否让直连解析器沿用策略 | 仅在填写 `direct-nameserver` 时使用 |
| `fallback` / `fallback-filter` | 条件筛选后的备用解析 | 按域名或主解析结果决定是否采用备用结果，不能理解为只在超时后重试 |

解析器可写 `1.1.1.1`（UDP）、`tcp://1.1.1.1`、`tls://1.1.1.1`（DoT）、`https://cloudflare-dns.com/dns-query`（DoH）。非标准端口写在地址中。`system` 使用系统 DNS，Apple 平台的处理见页末。

## 特定域名、hosts 与解析模式

```yaml
hosts:
  printer.home.arpa: 192.168.1.20
dns:
  use-hosts: true
  nameserver-policy:
    '+.home.arpa': 192.168.1.1
```

将这段合并到已有配置中：`hosts` 是顶层字段；`nameserver-policy` 放进已有的 `dns`，不要重复创建两个 `dns` 段。上述内网地址需替换为自己的设备和 DNS 地址。

`enhanced-mode: fake-ip` 给应用返回映射地址；`redir-host` 使用真实解析结果。`fake-ip-filter-mode: blacklist` 时，过滤列表里的域名使用真实 IP；`whitelist` 则只有命中的域名使用 Fake IP。通常无需改动 `fake-ip-range` 和 `fake-ip-ttl`。

## 让 DNS 遵循路由规则

在现有 `dns` 中加入 `respect-rules: true`，并保留可独立解析节点域名的 `proxy-server-nameserver`。规则引用的代理必须先能建立连接。不要同时随意开启 `prefer-h3`。

`cache-algorithm` 可选 `lru` 或 `arc`。`ipv6: false` 会影响 AAAA 应答，最终还受 App 的 IP Stack 设置约束。

## 平台说明与字段状态

连接期间 DNS 保持开启。`system` / `dhcp` 优先使用连接前取得的系统 DNS 地址；不可用时会过滤或补齐列表，某条策略失去全部地址时可能返回名称不存在。`dns.ipv6` 受全局 IPv6 与 App 的 IP Stack 设置影响。

`dns.listen` 额外开放 TCP/UDP DNS 服务，日常配置无需设置。它不受代理入口的 `authentication`、`allow-lan` 或控制器 `secret` 统一保护。

<ConfigFieldMatrix lang="zh" category="dns" />

参考：[mihomo](https://wiki.metacubex.one/config/dns/).
