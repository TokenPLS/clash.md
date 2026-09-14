---
title: Domain sniffing
---

# Domain sniffing

Sniffing attempts to recover a domain from visible HTTP, TLS, or QUIC metadata so domain rules can handle IP-only connections. This example enables detection while retaining the original connection destination.

```yaml
sniffer:
  enable: true
  parse-pure-ip: true
  override-destination: false
  sniff:
    HTTP:
      ports: [80, 8080]
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443]
  skip-domain:
    - '+.lan'
    - '+.local'
```

| Field | Usage |
| --- | --- |
| `enable` | Enable sniffing |
| `sniff` | Configure `ports` for `HTTP`, `TLS`, and `QUIC`; lists accept ports or ranges such as `8000-9000` |
| `parse-pure-ip` | Try sniffing traffic with no known domain |
| `force-dns-mapping` | Force attempts for redir-host DNS-mapped traffic |
| `override-destination` | Allow the detected domain to replace the connection target; a protocol-level value overrides the global setting |
| `force-domain` | Force attempts for listed domains |
| `skip-domain` | Skip listed domains |
| `skip-src-address` / `skip-dst-address` | Skip source or destination IP ranges |

If a service fails after enabling sniffing, try excluding it or disabling destination override. Sniffing cannot guarantee a domain when encrypted handshakes hide it.

## Platform behavior and field status

Use sniffer.sniff for new configurations. Legacy sniffing and port-whitelist apply only when sniff is empty, and are not merged with it.

<ConfigFieldMatrix category="sniffer" />

Reference: [mihomo](https://wiki.metacubex.one/config/sniff/).
