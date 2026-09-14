---
title: Tunnels
---

# Tunnels

A tunnel forwards connections from a local port to a fixed destination. This example forwards TCP connections on `127.0.0.1:9000` to `service.example.com:443` through `Proxy`. Define that node or group first.

```yaml
tunnels:
  - network: [tcp]
    address: 127.0.0.1:9000
    target: service.example.com:443
    proxy: Proxy
```

| Field | How to configure it |
| --- | --- |
| `network` | `[tcp]`, `[udp]`, or `[tcp, udp]` to match the service |
| `address` | Local listening address and port; `127.0.0.1` limits access to this device |
| `target` | Destination domain or IP and port |
| `proxy` | Optional node or group name |

For device traffic capture, see [TUN](./inbound). Choose a listening port that is not already in use.

## Platform behavior and field status

Listening requires available ports and system permissions. Confirm the access scope before exposing a listener to other devices; keep the loopback address for local use.

<ConfigFieldMatrix category="tunnels" />

Reference: [mihomo](https://wiki.metacubex.one/config/tunnels/).
