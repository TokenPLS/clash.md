---
title: TUIC
---

# TUIC

The example uses TUIC v5. For v4, delete uuid and password and use `token: YOUR_TOKEN`. Never keep both authentication forms.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

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

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `uuid` / `password` | TUIC v5 credentials; do not also set token. |
| `token` | TUIC v4 authentication; remove uuid and password. |
| `udp-relay-mode` | native or quic, according to the service and network. |
| `congestion-controller` | cubic, new_reno, or bbr. |
| `heartbeat-interval` / `request-timeout` | Heartbeat interval and request timeout in milliseconds. |
| `reduce-rtt` / `disable-sni` | reduce-rtt controls early handshake. disable-sni also disables ordinary TLS verification; normally keep it false. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/tuic/).
