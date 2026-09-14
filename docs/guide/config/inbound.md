---
title: TUN and network access
description: Using TUN in Clash, routing specific apps, platform differences, and which TUN settings take effect.
---

# TUN and network access

## Do I need a separate TUN mode? {#tun-mode}

**No—just connect Clash.** On iPhone, iPad, Mac, and Apple TV, Clash uses Apple
Network Extension (NE) Packet Tunnel to receive traffic and apply your rules.
Allow the system to add a VPN configuration when you first connect.

`tun.enable: false` does not stop the VPN or switch to proxy ports only.
To stop routing traffic through Clash, disconnect in the app.

## Do I need to configure TUN? {#example}

**Usually, no.** You can omit the entire `tun:` block and let Clash manage the
tunnel. To select a stack in an existing complete configuration, add:

```yaml
tun:
  stack: gvisor
```

Clash supports `gvisor`, `system`, and `mixed`, with gVisor as the default.
Mixed uses System for TCP and gVisor for UDP. Enabling Include All Networks
on iOS/macOS makes Clash use gVisor.

`stack: system` selects a network stack; Rule, Global, and Direct determine
outbound routing. For everyday rule-based use, select Rule.

After changing tunnel settings, disconnect and reconnect, then access the
service you want to use. See [configuration best practices](/guide/config/best-practice)
for a complete starting point.

## Can I proxy only a specific app? {#per-app-proxy}

Use destination domains, IPs, or rule sets to proxy services used by an app
and send other destinations to `DIRECT`. Direct means a direct outbound
connection; traffic and DNS may still pass through Clash.

- **iPhone, iPad, and Apple TV:** use destination domains, IPs, or rule sets. Process-name matching is unavailable. Apps may share destinations, so destination rules are not exact app filters.
- **Mac:** process name, process path, and UID rules are also available where the connection's process can be identified.

Sending traffic to `DIRECT` alone does not make other apps completely bypass
Clash. `tun.enable: false` and TUN filters such as `include-package` cannot
provide that behavior either.

## What differs across platforms? {#platforms}

Most TUN fields work the same way on all three platforms. The main differences are:

| Feature | iOS / iPadOS | tvOS | macOS |
| --- | --- | --- | --- |
| gVisor / System / Mixed | Supported | Supported | Supported |
| Include All Networks | Uses gVisor when enabled | Not enabled | Uses gVisor when enabled |
| Process name, path, or UID routing | Unsupported | Unsupported | Supported |

macOS process/UID routing uses routing rules; fields such as `tun.include-uid`
have no effect on any of the three platforms.

## How do I set each TUN field? {#fields}

All fields belong under `tun:`. Find the settings you need in the groups below.
Fields marked as having no effect can be omitted. Clash's runtime adjustments
do not change your saved YAML.

::: details Stacks and devices

| Field | How it works |
| --- | --- |
| `enable` | Always enabled while connected. Setting false does not stop the VPN or switch to proxy ports only; disconnect in the app. |
| `stack` | Accepts system, gvisor, and mixed; defaults to gVisor. Active Include All Networks on iOS/macOS changes System/Mixed to gVisor; tvOS does not enable that option. |
| `device` | Managed by Clash; names such as utun0 do not select a system interface. |
| `mtu` | Set by Clash at startup; the YAML value does not apply. |
| `file-descriptor` | Managed by Clash; leave it unset. |
| `gso` | No effect; Clash does not enable GSO segmentation offload. |
| `gso-max-size` | No effect; Clash does not enable GSO segmentation offload. |
| `recvmsgx` | Always off; leave it unset. |
| `sendmsgx` | Always off; leave it unset. |

:::

::: details Routes and outbound interfaces

| Field | How it works |
| --- | --- |
| `auto-route` | Set to false at runtime; Clash still configures system routes and captures traffic. |
| `auto-detect-interface` | Set to false at runtime; Clash manages the outbound interface automatically. |
| `strict-route` | Affects default-route splitting for an address family without explicit route-address entries. Separate from Include All Networks. |
| `route-address` | Sets destination ranges to include in the tunnel. Client routing options, IPv6, and system VPN settings also apply. |
| `route-exclude-address` | Sets destination ranges to exclude from tunnel routes. Client routing options, IPv6, and system VPN settings also apply. |
| `route-address-set` | Accepted, but rule sets are not converted into system routes. Ordinary RULE-SET routing remains available. |
| `route-exclude-address-set` | Accepted, but rule sets are not converted into system routes. Ordinary RULE-SET routing remains available. |
| `auto-redirect` | Linux-specific; has no effect in Clash on Apple platforms. |
| `iproute2-table-index` | Linux-specific; has no effect in Clash on Apple platforms. |
| `iproute2-rule-index` | Linux-specific; has no effect in Clash on Apple platforms. |
| `auto-redirect-input-mark` | Linux-specific; has no effect in Clash on Apple platforms. |
| `auto-redirect-output-mark` | Linux-specific; has no effect in Clash on Apple platforms. |
| `auto-redirect-iproute2-fallback-rule-index` | Linux-specific; has no effect in Clash on Apple platforms. |

:::

::: details DNS, IPv6, and connection settings

| Field | How it works |
| --- | --- |
| `dns-hijack` | Managed by Clash as 0.0.0.0:53 for TCP/UDP port-53 DNS requests entering the tunnel. Does not decrypt DoH/DoT. |
| `inet6-address` | Sets tunnel IPv6 addresses. Ignored when TUN IPv6 is disabled; automatic/enabled keeps supplied addresses or fills defaults. IP Stack settings and network conditions determine final activation. |
| `udp-timeout` | UDP session-state timeout in seconds; does not limit how long the VPN can stay connected. |
| `endpoint-independent-nat` | Accepted, but changing it does not change current NAT behavior. |
| `disable-icmp-forwarding` | Always true, with local ICMP replies. Verify the proxy by accessing a destination, rather than relying on ping alone. |
| `icmp-timeout` | ICMP state timeout in seconds; does not enable remote ICMP forwarding. |
| `loopback-address` | Used for TCP loopback address handling; does not exclude networks or select apps. |

:::

::: details Interface, user, app, and port filters

| Field | How it works |
| --- | --- |
| `include-interface` | No effect; cannot filter source interfaces or select an outbound interface. |
| `exclude-interface` | No effect; cannot filter source interfaces or select an outbound interface. |
| `include-uid` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `include-uid-range` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `exclude-uid` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `exclude-uid-range` | No effect on any platform. Use routing rules for user/process routing on macOS. |
| `include-mac-address` | No effect; cannot filter by device MAC address. |
| `exclude-mac-address` | No effect; cannot filter by device MAC address. |
| `include-android-user` | Android-specific; no effect. iOS app identifiers cannot enable per-app filtering here. |
| `include-package` | Android-specific; no effect. iOS app identifiers cannot enable per-app filtering here. |
| `exclude-package` | Android-specific; no effect. iOS app identifiers cannot enable per-app filtering here. |
| `exclude-src-port` | No effect; cannot exclude ports from tunnel capture. |
| `exclude-src-port-range` | No effect; cannot exclude ports from tunnel capture. |
| `exclude-dst-port` | No effect; cannot exclude ports from tunnel capture. |
| `exclude-dst-port-range` | No effect; cannot exclude ports from tunnel capture. |

:::

::: details Legacy fields

| Field | How it works |
| --- | --- |
| `inet4-route-address` | Still accepted and merged with route-address (IPv4) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |
| `inet6-route-address` | Still accepted and merged with route-address (IPv6) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |
| `inet4-route-exclude-address` | Still accepted and merged with route-exclude-address (IPv4) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |
| `inet6-route-exclude-address` | Still accepted and merged with route-exclude-address (IPv6) before passing to Apple. New fields do not replace legacy values; avoid duplicates. |

:::

### Which IPv6 settings are separate?

- `dns.ipv6`: whether DNS supplies IPv6 results to apps.
- IP query mode: how Clash itself resolves and selects addresses.
- TUN IPv6: whether IPv6 traffic is captured.

Changing one does not replace the others. Automatic IP Stack also considers the
current network before enabling tunnel IPv6.

## Other inbound settings

Local proxy ports, `allow-lan`, listeners, and external controllers provide local
services; configure them when needed. Linux `routing-mark`, iptables, TPROXY
routing, and selecting an outbound interface with `interface-name` do not apply here.

Search other fields in the [complete configuration reference](/guide/config/).

## Version notes {#scope}

This guide covers Clash on Apple platforms. Some settings change between
versions; use the features available in your installed version.

::: details Documentation reference version

Updated 2026-09-14, based on Hako `5bca0bcb73cd6dcb2d276be31f3a149211388c6d`.
Not every App Store version necessarily includes the same features, particularly
IP Stack's Follow Configuration option. For field names, see the
[mihomo TUN documentation](https://wiki.metacubex.one/config/inbound/tun/).

:::
