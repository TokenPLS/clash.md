---
title: HTTP / HTTPS
---

# HTTP / HTTPS

Use an HTTP CONNECT proxy. The example enables HTTPS; remove TLS settings for a plain HTTP service. This type carries TCP; adding `udp: true` does not add UDP support.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: http
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    tls: true
    sni: proxy.example.com
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `username` / `password` | Supply the server credentials; omit for an unauthenticated server. |
| `tls` | Use true for an HTTPS proxy; omit or use false for plain HTTP, with the matching server port. |
| `sni` | TLS server name, normally the certificate hostname. |
| `headers` | Custom HTTP request headers as a mapping. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/http/).
