---
title: TUIC
---

# TUIC

示例为 TUIC v5。若服务器为 v4，删除 `uuid` 与 `password`，改写 `token: YOUR_TOKEN`，不要同时保留两套认证。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: tuic
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    password: YOUR_PASSWORD
    sni: proxy.example.com
    alpn: [h3]
    udp-relay-mode: native
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `uuid` / `password` | TUIC v5 使用这两项，不能同时填写 token。 |
| `token` | TUIC v4 的认证值；使用时删除 uuid 和 password。 |
| `udp-relay-mode` | native 或 quic，按服务端和网络需要选择。 |
| `congestion-controller` | cubic、new_reno 或 bbr。 |
| `heartbeat-interval` / `request-timeout` | 心跳间隔和请求超时，单位毫秒。 |
| `reduce-rtt` / `disable-sni` | reduce-rtt 控制早期握手；disable-sni 不仅省略 SNI，还关闭常规 TLS 校验，通常保持 false。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/tuic/).
