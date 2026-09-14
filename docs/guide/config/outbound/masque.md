---
title: MASQUE
---

# MASQUE

Use service-issued keys and addresses, not ordinary HTTP proxy credentials. h3-l4proxy requires its matching service and does not support UDP; set udp to false for that mode.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: masque
    server: proxy.example.com
    port: 443
    private-key: YOUR_BASE64_EC_PRIVATE_KEY
    public-key: SERVER_BASE64_PUBLIC_KEY
    ip: 10.10.0.2/32
    network: h3
    udp: true
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `private-key` | Service-issued Base64 SEC1 EC private key in DER form, not a WireGuard key. |
| `public-key` | Remote Base64 ECDSA public key in PKIX DER form. |
| `ip` / `ipv6` | Client tunnel addresses, optionally in CIDR form. |
| `network` | h3 or h2 for IP tunnels; h3-l4proxy selects a different forwarding mode. |
| `sni` / `mtu` | Service TLS name and tunnel MTU. |
| `remote-dns-resolve` / `dns` | DNS servers for destination resolution inside this outbound. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/masque/).
