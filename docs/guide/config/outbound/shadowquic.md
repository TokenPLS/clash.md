---
title: ShadowQUIC
---

# ShadowQUIC

ShadowQUIC includes JLS authentication; no extra jls-opts is needed. Start with default windows and stream counts, and confirm connectivity with 0-RTT disabled.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

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

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `username` / `password` | ShadowQUIC credentials. |
| `quic-versions` | QUIC version list, v1 or v2, matching the server. |
| `udp-over-stream` | Whether to carry UDP over streams; default false. |
| `zero-rtt` | Enable early data; disabled in the example. |
| `keep-alive-interval` | Keep-alive interval in milliseconds. |
| `congestion-controller` | cubic, new_reno, or bbr; default cubic. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/shadowquic/).
