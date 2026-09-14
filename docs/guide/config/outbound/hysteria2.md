---
title: Hysteria2
---

# Hysteria2

Authentication and obfuscation passwords are separate. Ordinary setups do not need manual QUIC receive-window tuning; first confirm the endpoint, authentication, and UDP connectivity.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: hysteria2
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `password` | Server authentication password. |
| `ports` / `hop-interval` | Enable hopping only over server-opened ports, for example ports: "443,8443"; interval is seconds. |
| `up` / `down` | Set bandwidth-based rate control when needed, such as "20 Mbps"; use realistic bandwidth. |
| `obfs` / `obfs-password` | Set salamander or gecko with its password only if enabled on the server. |
| `sni` / `alpn` | Match TLS name and application protocol negotiation to the service. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/hysteria2/).
