---
title: VLESS
---

# VLESS

This example uses ordinary VLESS over TLS. A REALITY public key is not a certificate fingerprint; see [TLS and REALITY](./tls) for a complete combination. Do not combine mutually exclusive TLS wrappers.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: vless
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    tls: true
    servername: proxy.example.com
    network: tcp
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `uuid` | Server-issued UUID. |
| `flow` | Set xtls-rprx-vision only when the server enables Vision. |
| `tls` / `servername` | TLS switch and name; VLESS uses servername. |
| `reality-opts` | REALITY requires the server public-key, short-id, and matching servername. |
| `network` | Match tcp, ws, http, h2, grpc, or xhttp and its options to the server. |
| `packet-encoding` / `encryption` | Use server-supplied UDP encoding and VLESS Encryption settings; omit when unused. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/vless/).
