---
title: ShadowsocksR
---

# ShadowsocksR

SSR encryption, protocol, and obfuscation are separate settings. Preserve each value from the server; do not swap protocol and obfs or use `type: ss`.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: ssr
    server: proxy.example.com
    port: 443
    cipher: chacha20-ietf
    password: YOUR_PASSWORD
    protocol: auth_sha1_v4
    obfs: tls1.2_ticket_auth
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `cipher` / `password` | Server cipher and password. |
| `protocol` / `protocol-param` | SSR protocol and its parameter; omit an unused protocol-param. |
| `obfs` / `obfs-param` | Obfuscation method and parameter matching the server. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/ssr/).
