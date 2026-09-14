---
title: TLS and certificates
---

# TLS and certificates

Put TLS options on the node and use fields supported by that protocol. The server address, TLS name, and HTTP Host can differ; match each to the service.

## Common fields

| Field | Usage |
| --- | --- |
| `tls` | Enables optional TLS on types such as HTTP, SOCKS5, VMess, and VLESS; Trojan and AnyTLS already use TLS |
| `sni` / `servername` | TLS handshake name; VMess and VLESS use servername, most other types use sni |
| `alpn` | Protocol list such as `[h2, http/1.1]`; match the server |
| `skip-cert-verify` | Normally omit or keep false to verify certificates |
| `name-cert-verify` | Override the name used for certificate verification without changing SNI |
| `fingerprint` | Complete certificate SHA-256 fingerprint, not a public-key or browser fingerprint |
| `client-fingerprint` | Client handshake profile such as chrome on supported protocols; does not replace a server certificate |
| `certificate` / `private-key` | Paired client PEM certificate and key, or readable paths, for server-required mTLS |

## VLESS with REALITY

```yaml
proxies:
  - name: Reality-Node
    type: vless
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    network: tcp
    tls: true
    servername: cover.example.com
    client-fingerprint: chrome
    flow: xtls-rprx-vision
    reality-opts:
      public-key: SERVER_REALITY_PUBLIC_KEY
      short-id: "0123456789abcdef"
    udp: true
```

Replace uuid, servername, public-key, and short-id with service values. Keep flow only for a Vision-enabled service. Remove reality-opts for ordinary TLS: these fields cannot convert a server to REALITY.

## ECH and TLS wrappers

`ech-opts.enable: true` enables ECH. Set config to the service's Base64 ECH configuration or omit it to attempt DNS discovery. Availability depends on the protocol and server.

ShadowTLS, Restls, and JLS use shadow-tls-opts, restls-opts, and jls-opts. Each requires a matching service. For example, a supported node using ShadowTLS v3 can include:

```yaml
shadow-tls-opts:
  version: 3
  password: YOUR_SHADOWTLS_PASSWORD
```

This password is separate from the node password. SNI comes from the node's sni or servername. Do not enable multiple wrappers together. Snell uses obfs-opts, while Shadowsocks uses plugin settings.

For certificate errors, check the hostname, device time, certificate chain, and stale fingerprints before changing settings.

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/tls/).
