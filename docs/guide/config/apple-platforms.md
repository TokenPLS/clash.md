---
title: iOS, macOS, and tvOS configuration differences
description: Compare process routing, storage, TUN, provider, and advanced Hako configuration support on iPhone, iPad, Mac, and Apple TV.
---

# Three platforms, three system boundaries

All three use the same Hako data plane, but Apple exposes different network
metadata, storage, and interaction surfaces on each platform. A shared core
does not make every operating-system capability identical.

| Capability | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| Core mihomo YAML semantics | Supported | Supported | Supported |
| Packet Tunnel | Supported | Supported | Supported |
| Process name, path, and UID rules | No match | Supported | No match |
| App signing or team-ID rules | Unsupported | Unsupported | Unsupported |
| Add configuration | Profile URL or local YAML | Profile URL or local YAML | Profile URL |
| Remote Profile | Supported | Supported | Supported |
| HTTP providers | Client-managed | Client-managed | Client-managed, rebuildable cache |
| File state and caches | App container | App container | May be cleared |
| Linux iptables / mark / TPROXY | Not applicable | Not applicable | Not applicable |

## Product deployment targets

- iOS and iPadOS 15 or later
- macOS 13 or later
- tvOS 17 or later

Use the platform and status filters in the [complete field table](/guide/config/)
when you need one exact field.
