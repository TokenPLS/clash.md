---
title: Snell
---

# Snell

Match the server version explicitly. ShadowTLS, Restls, or JLS wrapping also requires its own password, version, and related parameters.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: snell
    server: proxy.example.com
    port: 443
    psk: YOUR_PSK
    version: 4
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `psk` | Server pre-shared key. |
| `version` | Match the server version; this example explicitly uses v4. Version 5 uses the v4 compatibility path, not a native v5 client. |
| `udp` | UDP needs v3 or the v4-compatible path; v1/v2 do not support it. |
| `reuse` | Optional connection reuse for v4/v5. |
| `obfs-opts` | Add only for server-side obfuscation, including the matching mode, host, and other options. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/snell/).
