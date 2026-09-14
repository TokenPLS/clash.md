---
title: 全局配置
---

# 全局配置

全局设置写在 YAML 顶层。下面的片段使用规则分流，保留策略选择和 Fake IP 缓存；把它与节点、代理组、DNS 和规则段合并即可。

```yaml
mode: rule
log-level: info
ipv6: false
unified-delay: true
tcp-concurrent: true
profile:
  store-selected: true
  store-fake-ip: true
```

## 模式与日志

| 字段 | 可选值或单位 | 怎么选 |
| --- | --- | --- |
| `mode` | `rule`、`global`、`direct` | 按规则分流、使用全局出口、全部直连；日常通常选 `rule` |
| `log-level` | `silent`、`error`、`warning`、`info`、`debug` | 日常用 `info`；排查时临时改为 `debug` |
| `ipv6` | `true` / `false` | 是否使用 IPv6，还需与 App 的 IP Stack 设置配合 |
| `unified-delay` | `true` / `false` | 使用统一延迟测试方式；本客户端省略时默认开启 |
| `tcp-concurrent` | `true` / `false` | 多个解析地址可并发尝试 TCP 连接 |
| `find-process-mode` | `strict`、`always`、`off` | 按需查进程、始终尝试、关闭；进程规则主要用于 macOS |
| `keep-alive-idle` / `keep-alive-interval` | 秒 | TCP 保活的空闲等待和探测间隔；没有明确需求时保留默认 |
| `disable-keep-alive` | `true` / `false` | 是否关闭 TCP 保活 |

代理端口放在[入站](./inbounds)中说明，域名映射 `hosts` 见 [DNS](./dns)，自定义证书与控制器访问见[安全说明](./security)。

## 平台说明与字段状态

- **IPv6**：`ipv6` 和 `dns.ipv6` 还会受 App 的 IP Stack 设置影响；TUN IPv6 接管单独控制。
- **延迟测试**：`unified-delay` 未填写时默认开启，明确写 `false` 可以关闭。
- **进程分流**：macOS 支持查询进程名、路径和 UID；iOS/tvOS 请使用目标域名、IP、端口或网络类型规则。详见[规则说明](/zh/guide/config/rules)。
- **geodata**：资源由 Clash 管理，`geo-auto-update` 固定关闭，`geo-update-interval` 不会启用自动更新。iOS/tvOS 使用预编译资源，部分加载器和匹配器选项不会按 YAML 原样使用。
- **指纹**：旧的 `global-client-fingerprint` 不再产生全局效果，请在支持的节点协议中使用 `client-fingerprint`。

日常连接无需配置外部控制器和控制面板；需要时请阅读[访问保护说明](/zh/guide/config/security)。

<ConfigFieldMatrix lang="zh" category="general" />

## 保存运行状态

`profile.store-selected` 保存内核的策略选择，`profile.store-fake-ip` 保存 Fake IP 映射。
两者未填写时默认开启，明确写 `false` 可关闭对应缓存；它们不是保存 Profile 配置文件的开关。

保存还需要可用的持久缓存。tvOS 的缓存可能被清理，原选择和映射不保证能恢复。

<ConfigFieldMatrix lang="zh" category="profile" />

参考：[mihomo](https://wiki.metacubex.one/config/general/).
