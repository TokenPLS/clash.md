---
title: TrustTunnel
---

# TrustTunnel

Start with credentials and the certificate hostname; enable QUIC or adjust reuse only to match server support.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

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

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `username` / `password` | Server credentials. |
| `sni` | TLS server name. |
| `quic` | true enables QUIC; default false. The server must support it. |
| `health-check` | Enable protocol health checks. |
| `max-connections` / `min-streams` / `max-streams` | Connection reuse limits; do not combine max-streams with the other two. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/trusttunnel/).
