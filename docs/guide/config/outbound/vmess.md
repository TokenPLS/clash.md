---
title: VMess
---

# VMess

This example uses VMess over WebSocket and TLS. For plain TCP transport, use `network: tcp` and remove `ws-opts`; retain TLS only if the server uses it. See [transports](./transport) for other formats.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: vmess
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    alterId: 0
    cipher: auto
    tls: true
    servername: proxy.example.com
    network: ws
    ws-opts:
      path: /proxy
      headers:
        Host: proxy.example.com
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `uuid` | Replace the example UUID with the server-issued value. |
| `alterId` | Use 0 for typical AEAD configurations; match older servers when needed. |
| `cipher` | Match auto, none, zero, aes-128-gcm, or chacha20-poly1305 to the service. |
| `network` / `ws-opts` | This example uses WebSocket; match its path and Host. |
| `tls` / `servername` | TLS enablement and handshake name; VMess uses servername. |
| `packet-encoding` | Use packetaddr or xudp only to match the server UDP encoding. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/vmess/).
