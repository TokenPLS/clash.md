---
title: EasyTier
description: Configure the EasyTier outbound in Hako v1.19.31-hako.1 on macOS, including peers, IPv4, DNS, and platform limitations.
---

# EasyTier

EasyTier joins a virtual network through one or more peers. Use `type: easytier`
with network identity and peer URIs instead of ordinary `server` / `port` fields.
Joining a network does not automatically provide an internet exit.

::: warning Platform availability
In Hako SDK **v1.19.31-hako.1**, the macOS slice includes EasyTier. The iOS,
iPadOS, and tvOS slices do not: they accept the node as a **REJECT placeholder**
and refuse every connection routed through it. Successful configuration import
does not establish protocol support. Use a client version that includes this SDK;
the SDK release is separate from the App Store app version.
:::

## Node example

Merge this node into the configuration's existing `proxies` list on macOS.
Replace the network identity and peer address with values from your network
administrator. If you rename `Node`, update group, rule, and DNS references too.

```yaml
proxies:
  - name: Node
    type: easytier
    network-name: YOUR_NETWORK_NAME
    network-secret: YOUR_NETWORK_SECRET
    hostname: hako-mac
    dhcp: true
    peers:
      - tcp://peer.example.com:11010
    no-listener: true
    udp: true
```

The example is a node fragment, not a complete profile. Add it to a selection
group or reference it directly from rules. See the
[complete configuration structure](../proxies#complete-configuration).

## Protocol fields

| Field | How to configure it |
| --- | --- |
| `network-name` | Required network name; match the network you intend to join. |
| `network-secret` | Match the network's shared secret. |
| `peers` | Entry-peer URI list, for example `tcp://peer.example.com:11010` or `udp://peer.example.com:11010`. At least one peer is required when no listeners are configured. Hako does not implicitly connect to a public peer. |
| `hostname` | Name advertised inside the virtual network. |
| `ipv4` / `dhcp` | Set an overlay IPv4 address such as `10.144.0.2/24`, or use `dhcp: true`. DHCP is enabled automatically when `ipv4` is empty. |
| `udp` | Set `true` for UDP traffic through the outbound; omission leaves it disabled. This is separate from the transport used by a peer URI. |
| `listeners` / `no-listener` | No listeners are opened by default. `no-listener: true` cannot be combined with a nonempty `listeners` list. Explicit `no-listener: false` without a list opens `tcp://0.0.0.0:11010`. |
| `mapped-listeners` | Externally reachable listener URIs when port mapping is configured. |
| `exit-nodes` | Overlay IPv4 addresses of exit nodes. The remote node must be configured to provide the required exit routes. |
| `proxy-networks` | Local IPv4 subnet CIDRs to advertise into the virtual network; these do not replace Clash routing rules. |
| `instance-name` / `state-dir` | Instance name defaults to the node name. Storage defaults to `easytier/<name>` under the core's data directory and persists `instance_id`; it must be an allowed, writable app path. |
| `tld-dns-zone` | Overlay DNS suffix; the default is `et.net.`. See the DNS example below. |
| `secure-mode` | Enable Noise end-to-end encryption. Supplying a local key or `peer-public-key` in a peer URI enables it automatically; those fields cannot be combined with `secure-mode: false`. |
| `local-private-key` / `local-public-key` | Optional Base64 X25519 identity keys. A public key requires a private key; normally the public key can be derived. Persisting `instance_id` alone does not pin this key pair. |

Other optional controls include `accept-dns`, `enable-exit-node`,
`enable-encryption`, `encryption-algorithm`, `private-mode`, `latency-first`,
`disable-p2p`, `enable-kcp-proxy`, `disable-kcp-input`, `enable-quic-proxy`,
`disable-quic-input`, and `mtu`. Set them only for a matching network design;
enabling a local exit or advertising a subnet also depends on platform routing
and permissions.

## Overlay DNS and routing

On macOS, `easytier://Node` resolves hostnames known to the EasyTier node named
`Node`. Merge these entries into your existing DNS policy and rule list. Place
the rules before any catch-all `MATCH` rule, and replace the subnet with your
network's actual range.

```yaml
dns:
  nameserver-policy:
    '+.et.net': easytier://Node
rules:
  - DOMAIN-SUFFIX,et.net,Node
  - IP-CIDR,10.144.0.0/24,Node,no-resolve
```

This resolver answers overlay IPv4 A records and IPv4 PTR lookups; it is not a
general public DNS resolver. Change the DNS policy and domain rule together if
you change `tld-dns-zone`. For PTR lookups, also route the relevant
`in-addr.arpa` reverse zone to this resolver; the example above covers `et.net`.

On iOS, iPadOS, and tvOS, the Apple tunnel configuration removes `easytier://`
and its alias `et://` from DNS resolver lists. A domain policy left with no
resolvers returns a name error; mixed lists retain their other resolvers.
An EasyTier placeholder cannot provide overlay DNS.

The overlay currently carries **IPv4 only**. `ip-version` controls the underlying
peer connection preference and does not enable overlay IPv6. Hako runs EasyTier
without creating a second system TUN device; traffic still follows Clash's
groups and rules. Validate an actual reachable overlay service after configuring;
a parsed node or a public-internet latency probe alone does not verify the route.

## Reference version

Reviewed against [Hako v1.19.31-hako.1](https://github.com/TokenPLS/Hako/releases/tag/v1.19.31-hako.1),
revision `7ea70d15bf8b67257928efe45c12f16d4ffc9f61`, on 2026-09-24.
Sources: [node fields and runtime](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/adapter/outbound/easytier.go),
[validation and defaults](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/component/easytier/toml.go),
[mobile placeholder](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/adapter/outbound/easytier_stub.go),
[mobile DNS handling](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/bind/hako/easytier_wall.go),
and [Apple SDK build settings](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/cmd/build_libbox/main.go).
