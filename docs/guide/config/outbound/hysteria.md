---
title: Hysteria
---

# Hysteria

This is Hysteria v1. Hysteria2 uses different authentication and obfuscation fields; do not mix their configurations.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: hysteria
    server: proxy.example.com
    port: 443
    auth-str: YOUR_PASSWORD
    protocol: udp
    up: 20 Mbps
    down: 100 Mbps
    sni: proxy.example.com
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `auth-str` | Text authentication value supplied by the server. |
| `protocol` | This example uses udp; faketcp is unsupported on all three Apple platforms. |
| `up` / `down` | Upload and download bandwidth; explicitly use Mbps and realistic values. |
| `obfs` | Set the obfuscation string only if enabled on the server. |
| `ports` | Optional port-hopping list; Hysteria v1 still requires port. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/hysteria/).
