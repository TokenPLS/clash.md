---
title: Inbound
---

# Inbound

Device traffic is captured through [TUN / Network Extension](./inbound). Add local proxy ports when software needs to connect explicitly using HTTP or SOCKS.

## Local proxy ports

```yaml
mixed-port: 7890
allow-lan: false
bind-address: 127.0.0.1
```

In the software's proxy settings, enter host `127.0.0.1`, port `7890`, and HTTP or SOCKS5. This address refers to the same device, not a remote proxy server.

| Field | Purpose |
| --- | --- |
| `port` | HTTP proxy port |
| `socks-port` | SOCKS proxy port |
| `mixed-port` | HTTP and SOCKS on one port |
| `allow-lan` | Request LAN access; the app must also allow sharing |
| `bind-address` | Binding address; use `127.0.0.1` for local-only access |
| `authentication` | Credentials list, such as `["user:YOUR_PASSWORD"]` |
| `skip-auth-prefixes` | Source ranges allowed to bypass entry authentication, only when needed |
| `lan-allowed-ips` / `lan-disallowed-ips` | Allowed or denied source IP ranges |

## Custom listeners

This creates another local mixed entry with a separate port to avoid conflicting with `7890` above:

```yaml
listeners:
  - name: Local-Proxy
    type: mixed
    listen: 127.0.0.1
    port: 7891
    users:
      - username: user
        password: YOUR_PASSWORD
```

`name` identifies the entry, `type` selects its protocol, `listen` is the local address, and `port` is the listening port. `users` configures this entry's credentials. Normal device capture does not require listeners. Custom services must also meet protocol certificate, authentication, and system listening requirements.

## Platform behavior and field status

redir-port, tproxy-port, and Linux iptables settings do not operate on Apple platforms. Proxy authentication and allow-lan do not uniformly protect DNS or controllers; see [Security](./security).

<ConfigFieldMatrix category="inbound" />

Reference: [mihomo](https://wiki.metacubex.one/config/inbound/).
