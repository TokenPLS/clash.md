---
title: ZeroTier
---

# ZeroTier

Replace network with your ZeroTier network ID and authorize the client in its controller. Network routes determine reachable destinations; joining alone does not provide an internet exit. Cleared identity storage may require reauthorization.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: zerotier
    network: "0123456789abcdef"
    udp: true
```

Keep `udp: true` explicitly when UDP is needed; omission does not enable it in this reference version.

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `network` | 16-digit hexadecimal network ID; quote it to preserve the string. |
| `state-dir` | Optional node-identity storage directory. |
| `planet` | App-readable private Planet file path, if required. |
| `mtu` / `physical-mtu` | Tunnel and physical UDP payload MTUs; normally leave defaults. |
| `remote-dns-resolve` / `dns` | Use DNS reachable through the virtual network when remote resolution is needed. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/zerotier/).
