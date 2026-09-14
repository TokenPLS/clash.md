---
title: SOCKS5
---

# SOCKS5

Write `type: socks5`, not `socks`. Remove both credential fields if the server requires no authentication.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: socks5
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `username` / `password` | Supply credentials when the server requires authentication. |
| `udp` | Enable UDP forwarding only with server support for UDP ASSOCIATE. |
| `tls` | Enable only for TLS-wrapped SOCKS5. The TLS name uses server; this type has no sni field. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/socks/).
