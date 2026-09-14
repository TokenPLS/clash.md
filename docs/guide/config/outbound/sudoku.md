---
title: Sudoku
---

# Sudoku

This example disables HTTPMask for a corresponding raw connection. For a CDN or reverse proxy, configure httpmask from the server settings rather than only changing the port to 443.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: sudoku
    server: proxy.example.com
    port: 443
    key: YOUR_CLIENT_KEY
    aead-method: chacha20-poly1305
    padding-min: 2
    padding-max: 7
    table-type: prefer_ascii
    httpmask:
      disable: true
    enable-pure-downlink: false
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `key` | Use the shared key or protocol-specific hexadecimal key material supplied by the service, not a generic PEM private key. |
| `aead-method` | chacha20-poly1305, aes-128-gcm, or none, matching the server. |
| `padding-min` / `padding-max` | Padding percentages 0–100; maximum must not be below minimum. |
| `table-type` | prefer_ascii, prefer_entropy, up_ascii_down_entropy, or up_entropy_down_ascii. |
| `httpmask` | Enable for HTTP wrapping; match mode, tls, host, and path-root to the server. |
| `enable-pure-downlink` | Downlink mode must match the server. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/sudoku/).
