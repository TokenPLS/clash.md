---
title: Tailscale
---

# Tailscale

This outbound does not use ordinary server and port fields. Replace the exit-node address with your own; omit it for Tailnet or subnet-only access. Device authorization and route permissions must also be granted by the control service.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: tailscale
    hostname: hako-device
    auth-key: YOUR_TAILSCALE_AUTH_KEY
    accept-routes: true
    exit-node: 100.64.0.10
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `hostname` | Device name in the Tailnet. |
| `auth-key` | Authorization key for joining the network. |
| `control-url` | Set for a custom control server; omit for ordinary Tailscale. |
| `accept-routes` | Accept advertised subnet routes. |
| `exit-node` | Approved exit-node address or name for public internet access. |
| `state-dir` / `ephemeral` | Optional state directory and ephemeral-node flag; persistent identity needs retained storage. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/tailscale/).
