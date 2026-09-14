---
title: GOST Relay
---

# GOST Relay

连接 GOST Relay 服务时使用 `type: gost-relay`。它与已经移除的 `relay` 代理组不是同一项。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: gost-relay
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `username` / `password` | 服务端要求的认证；无认证时省略。 |
| `tls` / `sni` | 使用 TLS Relay 服务时开启 tls 并填写匹配域名。 |
| `mux` | 只有服务端支持对应复用模式时启用。 |
| `forward` | 固定转发模式的开关；按服务端配置填写。 |
| `udp` | 允许 UDP 转发，仍需服务端支持。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)
