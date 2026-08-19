---
title: Configuration security boundary
description: Identify sensitive credentials, remote resources, local listeners, controllers, certificates, and high-risk fields in Clash and Hako configurations.
---

# Configuration security boundary

A proxy should solve a problem, not become a new one. Configuration decides
who receives traffic and can contain enough credentials to take over a route or
control surface. Treat it as a password file, not ordinary text.

## Never publish

- Profile and provider URLs, query parameters, request headers, and Bearer tokens
- Usernames, passwords, UUIDs, private keys, Reality keys, and Age secrets
- WireGuard, Tailscale, and ZeroTier identities
- Controller secrets, TLS private keys, client certificates, and custom CAs
- Unredacted connection logs, DNS credentials, and authenticated health checks

## Fields that expand attack surface

`allow-lan`, local ports, `dns.listen`, listeners, tunnels, server
configurations, external controllers, CORS, External UI, and External DoH can
all open a new access path. Keep them disabled unless needed. If enabled, bind
to loopback, use strong authentication, and verify firewall and LAN boundaries.

`skip-cert-verify: true` gives up server-certificate verification. It is not a
routine connection fix.

## Files and tvOS

Configuration can only reach Hako-managed container paths. tvOS may clear file
caches, so providers, geodata, and other resources must be safely rebuildable.
Never keep the only copy of a key in a cache.

<ConfigFieldMatrix category="security" />
