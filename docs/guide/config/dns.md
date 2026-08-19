---
title: DNS configuration
description: Hako DNS, Fake IP, DoH, DoT, policy, and cache fields on iOS, macOS, and tvOS.
---

# DNS configuration

Hako keeps DNS enabled inside Apple Packet Tunnel and routes TUN-hijacked
queries into mihomo's resolver. Fake IP, DoH, DoT, policy resolution, fallback,
hosts, and caches are handled by the core.

## Practical guidance

- Override `nameserver` only for a concrete need. A resolver can observe your
  queries, so use one you trust.
- Desktop-dependent `system:` and `dhcp:` sources may be removed or repaired.
- `dns.listen` opens a local service and is an advanced feature. Never expose
  it through `allow-lan` without explicit access control.
- Resolver URLs, request headers, and authentication are sensitive data.

<ConfigFieldMatrix category="dns" />
