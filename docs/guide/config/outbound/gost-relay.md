---
title: GOST Relay
---

# GOST Relay

Use `type: gost-relay` for a GOST Relay server. This is a separate feature from the removed relay policy group.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

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

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `username` / `password` | Server credentials; omit if not required. |
| `tls` / `sni` | Enable tls and a matching sni for TLS Relay services. |
| `mux` | Enable only when the server supports the matching multiplexing mode. |
| `forward` | Fixed-forwarding mode; match the server configuration. |
| `udp` | Allow UDP forwarding when supported by the server. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)
