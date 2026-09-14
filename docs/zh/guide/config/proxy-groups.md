---
title: 代理组
---

# 代理组

代理组把节点组合成一个出口，路由规则引用组名。下面的 `Proxy` 让你手动选择自动测速组或直连；`Subscription` 需要在[代理集合](./proxy-providers)中定义。

```yaml
proxy-groups:
  - name: Proxy
    type: select
    proxies: [Auto, DIRECT]
  - name: Auto
    type: url-test
    use: [Subscription]
    url: https://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
rules:
  - MATCH,Proxy
```

## 类型与选择方式

| `type` | 如何选择 | 需要配置 |
| --- | --- | --- |
| `select` | 在 App 中手动选择节点或其他组 | `proxies` 或 `use` |
| `url-test` | 根据测试延迟自动选择 | 成员、`url`、`interval`；`tolerance` 为切换容差，单位毫秒 |
| `fallback` | 按成员顺序寻找健康出口 | 成员、`url`、`interval`；把首选节点放前面 |
| `load-balance` | 为不同连接分配出口 | 成员、`url`、`interval`、`strategy` |

负载均衡的 `strategy` 可选 `consistent-hashing`、`round-robin`、`sticky-sessions`，分别用于哈希分配、轮换和会话保持。需要链式连接时使用节点的 [`dialer-proxy`](./outbound/dialer-proxy)。

## 成员与健康检查

| 字段 | 填写方式 |
| --- | --- |
| `name` | 唯一组名；规则和其他组用这个名称引用 |
| `proxies` | 节点名、其他组名或 `DIRECT` 等内置出口组成的列表；不要形成循环 |
| `use` | 代理集合名称列表 |
| `include-all-proxies` / `include-all-providers` | 分别引入全部节点或全部代理集合；`include-all` 同时引入两者 |
| `filter` / `exclude-filter` | 对引入的候选节点按名称筛选或排除；支持正则表达式 |
| `url` | 测试地址；应能通过被测节点访问 |
| `interval` / `timeout` | 检查间隔为秒，超时为毫秒 |
| `lazy` | 为 `true` 时允许未使用的组跳过定时检查 |
| `expected-status` | 期望 HTTP 状态，例如 `204` 或 `200/204` |
| `disable-udp` | 为 `true` 时禁用这个组的 UDP |

建议在代理集合中明确配置 `health-check`。代理组显式设置 `url` 时，也可为 `use` 引入的集合注册检查；已有的检查地址、间隔及 `lazy` 会影响实际检查安排。

## 平台说明与字段状态

健康检查受 `lazy`、系统暂停和资源限制影响，配置间隔不代表每次都会检查全部节点。旧 `relay` 组已移除，链式连接使用 `dialer-proxy`。

<ConfigFieldMatrix lang="zh" category="proxy-groups" />

参考：[mihomo](https://wiki.metacubex.one/config/proxy-groups/).
