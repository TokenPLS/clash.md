---
title: Shadowsocks
---

# Shadowsocks

Confirm cipher and password first, then add any server-required plugin. For simple obfs use `plugin: obfs`, with `mode: http` or `tls` and `host` under `plugin-opts`. Plugin settings are distinct from generic node TLS.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: ss
    server: proxy.example.com
    port: 443
    cipher: chacha20-ietf-poly1305
    password: YOUR_PASSWORD
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `cipher` | Match the server cipher, such as aes-128-gcm, aes-256-gcm, or chacha20-ietf-poly1305. |
| `password` | Server password. SS2022 requires the supplied Base64 key rather than an arbitrary password. |
| `plugin` / `plugin-opts` | Set the plugin and its options only when the server uses one. |
| `udp-over-tcp` / `udp-over-tcp-version` | Use only with matching server-side UDP-over-TCP support and version. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/ss/).
