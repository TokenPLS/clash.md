---
title: OpenVPN
---

# OpenVPN

The CA placeholder is not a valid certificate and must be replaced. The server determines password and client-certificate requirements; supply valid authentication. Both forms can coexist, with cert and key supplied as a pair. Only dev: tun is supported, not TAP. Certificate and static-key fields take content rather than paths. Map the relevant .ovpn fields to YAML rather than pasting an entire .ovpn file into proxies.

## Node example

Merge this node into the configuration’s proxies list. Replace example addresses, identities, and credentials. If you rename Node, update group references too.

```yaml
proxies:
  - name: Node
    type: openvpn
    server: proxy.example.com
    port: 1194
    proto: udp
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    ca: |
      -----BEGIN CERTIFICATE-----
      REPLACE_WITH_CA_CERTIFICATE_BODY
      -----END CERTIFICATE-----
```

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `proto` | udp or tcp, matching the .ovpn transport. |
| `ca` | Copy the complete certificate from the .ovpn `<ca>` block into a YAML block string. |
| `username` / `password` | Credentials for auth-user-pass authentication. |
| `cert` / `key` | Complete `<cert>` and `<key>` content when the server requires client certificates. |
| `tls-auth` / `key-direction` | Static TLS authentication key and direction, when required. |
| `tls-crypt` / `tls-crypt-v2` | Use the matching control-channel key from the source config; avoid mixing modes. |
| `cipher` / `data-ciphers` / `auth` | Data cipher, negotiated cipher list, and authentication digest from the service. |
| `ping` / `ping-restart` / `handshake-timeout` | Ping, restart, and handshake timeouts in seconds. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/openvpn/).
