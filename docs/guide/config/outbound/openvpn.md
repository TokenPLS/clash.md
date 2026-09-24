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
| `cipher` / `data-ciphers` | Data cipher and negotiated cipher list from the service. |
| `auth` | Authentication digest, default `SHA256`. In v1.19.31-hako.1 it also selects the `tls-auth` control-channel HMAC digest; match the server's `auth` setting even when an AEAD data cipher is used. |
| `ping` / `ping-restart` / `handshake-timeout` | Ping, restart, and handshake timeouts in seconds. |

[Groups and rules](../proxies#complete-configuration) · [Common fields](../proxies#common-fields) · [TLS](./tls) · [Transports](./transport)

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/openvpn/).

The `tls-auth` digest behavior was checked against
[Hako v1.19.31-hako.1](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/transport/openvpn/tlsauth.go#L26).
