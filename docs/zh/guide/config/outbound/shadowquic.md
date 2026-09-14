---
title: ShadowQUIC
---

# ShadowQUIC

ShadowQUIC 已内置 JLS 认证，不需要再添加 `jls-opts`。优先使用默认窗口和连接数；先用关闭 0-RTT 的配置确认连通。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: shadowquic
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    sni: proxy.example.com
    alpn: [h3]
    zero-rtt: false
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `username` / `password` | ShadowQUIC 认证用户和密码。 |
| `quic-versions` | 版本列表，v1 或 v2；与服务端相符。 |
| `udp-over-stream` | 是否通过流传 UDP，默认 false。 |
| `zero-rtt` | 是否启用早期数据；示例保留关闭。 |
| `keep-alive-interval` | 保活间隔，单位毫秒。 |
| `congestion-controller` | cubic、new_reno 或 bbr；默认 cubic。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/shadowquic/).
