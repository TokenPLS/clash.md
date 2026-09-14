---
title: Outbound proxies
---

# Outbound proxies

The proxies list defines nodes. Each entry supplies a protocol and server parameters, referenced by name from groups or rules.

## Complete configuration

This complete structure includes DNS, a Trojan node, a selection group, and routing rules. Replace the endpoint and password before importing; example addresses and credentials cannot connect.

```yaml
mode: rule
log-level: info
dns:
  enable: true
  enhanced-mode: fake-ip
  nameserver:
    - https://1.1.1.1/dns-query
proxies:
  - name: Node
    type: trojan
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
proxy-groups:
  - name: Proxy
    type: select
    proxies: [Node, DIRECT]
rules:
  - MATCH,Proxy
```

After importing and connecting, select Node in the Proxy group. Append additional nodes to the same proxies list and add their names to the group. Do not create duplicate top-level proxies keys.

## Configure by protocol

Each protocol page includes a node example and field explanations. Examples share the name Node; assign unique names when combining them.

| Protocol | YAML `type` |
| --- | --- |
| [HTTP / HTTPS](./outbound/http) | `http` |
| [SOCKS5](./outbound/socks5) | `socks5` |
| [Shadowsocks](./outbound/ss) | `ss` |
| [ShadowsocksR](./outbound/ssr) | `ssr` |
| [Snell](./outbound/snell) | `snell` |
| [VMess](./outbound/vmess) | `vmess` |
| [VLESS](./outbound/vless) | `vless` |
| [Trojan](./outbound/trojan) | `trojan` |
| [AnyTLS](./outbound/anytls) | `anytls` |
| [Mieru](./outbound/mieru) | `mieru` |
| [Sudoku](./outbound/sudoku) | `sudoku` |
| [Hysteria](./outbound/hysteria) | `hysteria` |
| [Hysteria2](./outbound/hysteria2) | `hysteria2` |
| [TUIC](./outbound/tuic) | `tuic` |
| [ShadowQUIC](./outbound/shadowquic) | `shadowquic` |
| [GOST Relay](./outbound/gost-relay) | `gost-relay` |
| [WireGuard](./outbound/wireguard) | `wireguard` |
| [Tailscale](./outbound/tailscale) | `tailscale` |
| [ZeroTier](./outbound/zerotier) | `zerotier` |
| [SSH](./outbound/ssh) | `ssh` |
| [MASQUE](./outbound/masque) | `masque` |
| [TrustTunnel](./outbound/trusttunnel) | `trusttunnel` |
| [OpenVPN](./outbound/openvpn) | `openvpn` |

## Common fields

| Field | Usage |
| --- | --- |
| `name` | Unique node name, referenced exactly by groups and rules |
| `type` | Lowercase value from the table, not the display name |
| `server` / `port` | Remote endpoint; Tailscale and ZeroTier use network-specific settings and multi-peer WireGuard has a separate structure |
| `udp` | Enable UDP where supported; HTTP and SSH do not gain UDP support from this flag |
| `ip-version` | dual, ipv4, ipv6, ipv4-prefer, or ipv6-prefer for resolved node addresses |
| `dialer-proxy` | Node or group used to connect to this node; see [chaining](./outbound/dialer-proxy) |
| `tfo` / `mptcp` | Request TCP Fast Open or multipath TCP, subject to system and connection support |
| `smux` | Configure only for services supporting sing-mux; normally leave disabled |

Authentication, TLS, and transport options are protocol-specific. Apple versions manage physical egress automatically; node interface-name and routing-mark are not applied.

## TLS, transports, and multiplexing

- [TLS and certificates](./outbound/tls): SNI, servername, verification, REALITY, and ECH.
- [Transports](./outbound/transport): WebSocket, gRPC, HTTP/2, XHTTP, and other fragments.
- [Chaining](./outbound/dialer-proxy): connect one node through another.
- [Built-ins](./outbound/built-in): DIRECT, DNS, REJECT, and rematch.

For a service supporting sing-mux, add this node-level fragment with a matching protocol:

```yaml
smux:
  enabled: true
  protocol: h2mux
  max-connections: 4
  min-streams: 4
```

Protocol accepts h2mux, smux, or yamux. max-streams is an alternative to max-connections / min-streams; do not configure both approaches. Enable padding only when required. only-tcp: true leaves UDP outside this multiplexing layer.

## Check after configuring

Confirm the node connects, the group selects it, and rules reference the correct group. For TLS errors, check certificate names; for timeouts, check the endpoint and transport; for UDP failures, check support on the node and intermediate outbounds.

[Providers](./proxy-providers) load nodes, [groups](./proxy-groups) choose outbounds, and [rules](./rules) select which connections use them.

<ConfigFieldMatrix category="proxies" />

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/).
