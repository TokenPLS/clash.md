---
title: SSH
---

# SSH

The SSH server must permit TCP forwarding. The example uses password authentication; set private-key for key authentication. Obtain host-key from the server administrator: leaving it empty accepts any host key. SSH does not forward UDP.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: ssh
    server: proxy.example.com
    port: 22
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `username` / `password` | SSH login credentials. |
| `private-key` | Private key content or readable path for key authentication. |
| `private-key-passphrase` | Passphrase for an encrypted private key. |
| `host-key` | Server host-key list for verifying its identity. |
| `host-key-algorithms` | List of allowed host-key algorithms when required. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/ssh/).
