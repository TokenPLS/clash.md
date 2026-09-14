---
title: WireGuard
---

# WireGuard

This is the single-peer form. For multiple peers, move each remote server, port, public-key, and allowed-ips into a peers list; retain client addresses and private-key at node level. Replace the example keys before use.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: wireguard
    server: proxy.example.com
    port: 443
    ip: 10.10.0.2
    private-key: YOUR_BASE64_PRIVATE_KEY
    public-key: SERVER_BASE64_PUBLIC_KEY
    allowed-ips: [0.0.0.0/0]
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `ip` / `ipv6` | Tunnel addresses assigned to this client. |
| `private-key` | Client private key, a Base64-encoded 32-byte key. |
| `public-key` | Remote peer public key, not the client public key. |
| `pre-shared-key` | Additional PSK if configured by the server. |
| `allowed-ips` | Destination ranges carried by this peer; 0.0.0.0/0 covers IPv4. |
| `mtu` / `persistent-keepalive` | MTU in bytes and keep-alive interval in seconds. |
| `remote-dns-resolve` / `dns` | Enable resolution inside this outbound with DNS servers reachable through the tunnel. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/wg/).
