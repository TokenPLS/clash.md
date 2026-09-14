---
title: Trojan
---

# Trojan

Trojan 本身使用 TLS，无需额外填写 `tls: true`。证书校验失败时先检查 `sni`、设备时间和服务器证书。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: trojan
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `password` | Trojan 服务端密码。 |
| `sni` | TLS 握手域名，应与服务端证书匹配。 |
| `network` | 默认 TCP；服务器使用 WebSocket 或 gRPC 时填写 ws 或 grpc。 |
| `ws-opts` / `grpc-opts` | 相应传输的 path、Host 或 grpc-service-name。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/trojan/).
