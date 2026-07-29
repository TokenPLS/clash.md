---
title: Hako
description: Hako is an open-source mihomo fork for Apple NetworkExtension, providing Clash with multi-protocol routing, DNS, policy groups, and local control.
keywords:
  - Hako core
  - mihomo iOS core
  - NetworkExtension proxy core
  - open-source network core
  - Hako xcframework
jsonLd:
  "@context": https://schema.org
  "@type": SoftwareSourceCode
  name: Hako
  description: An open-source mihomo fork for Apple NetworkExtension that provides Clash with multi-protocol, rule-based routing.
  codeRepository: https://github.com/TokenPLS/Hako
  license: https://www.gnu.org/licenses/gpl-3.0.html
  programmingLanguage: Go
  runtimePlatform:
    - iOS
    - iPadOS
    - macOS
    - tvOS
  isBasedOn: https://github.com/MetaCubeX/mihomo
  inLanguage: en-US
---

# Hako

**High-performance Adaptive Kernel — Open-source**

Hako is the open-source networking core that powers Clash. It packages a
stable fork of [mihomo](https://github.com/MetaCubeX/mihomo) as
`Hako.xcframework`, with Swift and Objective-C interfaces for Apple apps.

## Built for Apple platforms

Clash runs Hako inside Apple's NetworkExtension environment. Packet transport
uses the public `NEPacketTunnelFlow` API throughout, following Apple's public
system interfaces.

The core is tuned for the memory and energy goals of packet tunnel extensions.
It exposes local runtime state—throughput, connections,
memory and health—so the app can show what the core is doing.

## Measured on real hardware

The public Hako release evidence includes controlled tests on an iPad Pro
(M2):

| Test | Result |
| --- | --- |
| Public-network Speedtest | 924 Mbps down · 545 Mbps up · 5 ms latency |
| Core memory during that test | 18.7 MiB |
| 30-minute pressure run | 16.49 GB transferred · 0 disconnects · 0 packet loss · 0 crashes |
| 400 concurrent connections | 39.6 MiB under a 50 MiB test budget |

These figures record the measured result for the specified hardware, network,
and build. Performance varies with device, route, and configuration.

## What the core provides

- **Protocols:** Shadowsocks, VMess, VLESS, Trojan, Snell, Hysteria,
  Hysteria2, TUIC, WireGuard, AnyTLS, SSH and more.
- **DNS:** DoH, DoT, DoQ, fake-IP, traffic sniffing and per-domain resolver
  rules.
- **Routing:** domain, IP-CIDR, GEOIP, GEOSITE, RULE-SET and logical rules.
- **Policy groups:** select, url-test, fallback and load-balance, including
  health checks and remote providers.
- **Local control:** status, traffic, connections, proxies, logs, latency
  tests and connection control remain on an app-private local channel.

## Open and auditable

Hako follows a pinned stable mihomo release. Hako-specific source changes are
published under GPL-3.0 for independent review, so every implementation detail
and security question can be checked directly against the code.

The Clash & Hako Team maintains Hako as an independent fork; MetaCubeX and
SagerNet are named solely to identify its technical lineage. The SDK uses a
pre-1.0 version until the first formal `v*-hako.*` release.

## Source

- [Hako core](https://github.com/TokenPLS/Hako)
- [Complete Hako README](https://github.com/TokenPLS/Hako/blob/main/README.md)
- [mihomo upstream](https://github.com/MetaCubeX/mihomo)
- [Security policy](https://github.com/TokenPLS/Hako/blob/main/SECURITY.md)
