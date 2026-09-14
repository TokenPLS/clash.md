---
title: AnyTLS
---

# AnyTLS

Start with the server password and hostname. AnyTLS does not support a REALITY combination.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: anytls
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `password` / `sni` | Server password and TLS name. |
| `client-fingerprint` | Optional TLS client fingerprint, for example chrome. |
| `idle-session-check-interval` | Idle-session check interval in seconds; default 30. |
| `idle-session-timeout` | Idle session lifetime in seconds; default 30. |
| `min-idle-session` | Minimum retained idle sessions; default 0. |
| `client-metadata` | Set client metadata only when required by the service. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/anytls/).
