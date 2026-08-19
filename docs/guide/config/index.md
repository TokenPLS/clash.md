---
title: Hako configuration reference
description: A mihomo YAML reference for Hako 1.19.30, covering 185 fields and their support status on iOS, macOS, and tvOS.
keywords: [Hako configuration, mihomo YAML, Clash configuration, iOS Clash, macOS Clash, tvOS Clash]
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/config/
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/config/
---

# Hako configuration reference

Use this reference whenever you need to inspect mihomo YAML. A first
configuration does not need to begin with 185 fields: start with the
[best-practice template](/guide/config/best-practice), then return to the exact
field when a specific need appears.

::: tip Keep the configuration understandable
A trusted configuration that contains only what you need is easier to verify
and less likely to produce surprising behavior after an update.
:::

## Browse by topic

<nav class="config-topic-grid" aria-label="Configuration reference topics">
  <a href="/guide/config/general"><strong>General</strong><span>Mode, logs, connections, and geodata</span></a>
  <a href="/guide/config/dns"><strong>DNS</strong><span>Fake IP, resolvers, and policy</span></a>
  <a href="/guide/config/inbound"><strong>Inbound and TUN</strong><span>The real Network Extension boundary</span></a>
  <a href="/guide/config/proxies"><strong>Proxies and providers</strong><span>Outbounds, groups, and remote resources</span></a>
  <a href="/guide/config/rules"><strong>Rules and sniffer</strong><span>Routing, identity fields, and sniffing</span></a>
  <a href="/guide/config/profile"><strong>State and advanced</strong><span>Profile, NTP, and experimental fields</span></a>
  <a href="/guide/config/apple-platforms"><strong>Apple platforms</strong><span>iOS, macOS, and tvOS differences</span></a>
  <a href="/guide/config/security"><strong>Security boundary</strong><span>Credentials, listeners, and control surfaces</span></a>
</nav>

## Field support status

- **Supported**: consumed directly by the Hako core.
- **Managed / limited**: accepted, but repaired, forced, or replaced for Apple networking.
- **Advanced**: recognized by the core but may open a local service or control surface.
- **Unsupported**: removed or ineffective inside Apple Packet Tunnel.
- **Not applicable**: belongs to Android, Linux, or another environment.

<ConfigFieldMatrix />

## Version and sources

This page describes the shipping **Hako / mihomo 1.19.30** core. The field list
comes from Hako's current configuration pipeline and is informed by the pinned
[MetaCubeX configuration documentation](https://github.com/MetaCubeX/Meta-Docs/tree/e848aefb77e0cddbf3f0dde1016ec4904924fcbd/docs/config).
Upstream documentation defines mihomo semantics; Hako's adaptation and tests
determine the Apple-platform status shown here.

The table is a sanitized public snapshot. It excludes internal code paths,
audit notes, and test-infrastructure details.
