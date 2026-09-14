---
title: TrustTunnel
---

# TrustTunnel

先使用用户名、密码和证书域名建立连接，再按服务端支持情况启用 QUIC 或调整复用参数。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: trusttunnel
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `username` / `password` | 服务端认证用户与密码。 |
| `sni` | TLS 服务器名称。 |
| `quic` | true 使用 QUIC；默认 false。服务端必须支持所选方式。 |
| `health-check` | 是否使用协议的健康检查。 |
| `max-connections` / `min-streams` / `max-streams` | 连接复用限制；max-streams 与另外两项不要同时配置。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/trusttunnel/).
