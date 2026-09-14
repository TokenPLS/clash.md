---
title: Mieru
---

# Mieru

Use the Mieru field `transport`, not the `network` field used by other protocols. This example uses a single TCP port.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: mieru
    server: proxy.example.com
    port: 443
    transport: TCP
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    multiplexing: MULTIPLEXING_LOW
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `port` / `port-range` | Choose one port or a range. Remove port when using port-range: "4000-4010". |
| `transport` | TCP or UDP, matching the server. |
| `username` / `password` | Mieru username and password. |
| `multiplexing` | MULTIPLEXING_OFF, MULTIPLEXING_LOW, MULTIPLEXING_MIDDLE, or MULTIPLEXING_HIGH. |
| `handshake-mode` | HANDSHAKE_STANDARD or HANDSHAKE_NO_WAIT; the latter does not wait for handshake completion. |
| `traffic-pattern` | Use supplied Base64 traffic-pattern settings when required. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/mieru/).
