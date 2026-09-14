---
title: Trojan
---

# Trojan

Trojan uses TLS inherently; it does not need a separate `tls: true`. For certificate failures, check SNI, device time, and the server certificate.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

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

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `password` | Trojan server password. |
| `sni` | TLS handshake name matching the server certificate. |
| `network` | TCP by default; use ws or grpc when configured on the server. |
| `ws-opts` / `grpc-opts` | Transport path, Host, or grpc-service-name. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/trojan/).
