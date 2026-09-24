---
title: Hako configuration reference
description: A mihomo YAML reference for Hako, with 185 configuration entries, protocol guides including EasyTier in v1.19.31-hako.1, and Apple platform support notes.
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

## New in v1.19.31-hako.1

[EasyTier](./outbound/easytier) adds a virtual-network outbound to the macOS SDK.
The protocol directory now lists **24 proxy and network outbound types**.
iOS, iPadOS, and tvOS retain 23 implementations; EasyTier nodes on those platforms
are REJECT placeholders that refuse connections. See the
[protocol list](/guide/protocols) and [Apple platform differences](./apple-platforms).

## Browse by topic

The sections below follow the [upstream mihomo configuration reference](https://wiki.metacubex.one/config/). Each page describes usage and platform limitations in Hako.

<nav class="config-topic-grid" aria-label="Configuration reference topics">
  <a href="/guide/config/general"><strong>General configuration</strong><span>Mode, logs, and connections</span></a>
  <a href="/guide/config/dns"><strong>DNS</strong><span>Resolution and policy</span></a>
  <a href="/guide/config/sniffer"><strong>Domain sniffing</strong><span>Protocol and domain detection</span></a>
  <a href="/guide/config/inbounds"><strong>Inbound</strong><span>Proxy ports, TUN, and listeners</span></a>
  <a href="/guide/config/proxies"><strong>Outbound proxies</strong><span>Nodes and protocol options</span></a>
  <a href="/guide/config/proxy-providers"><strong>Proxy providers</strong><span>Load and update nodes</span></a>
  <a href="/guide/config/proxy-groups"><strong>Proxy groups</strong><span>Manual selection and automatic switching</span></a>
  <a href="/guide/config/rules"><strong>Routing rules</strong><span>Route connections by condition</span></a>
  <a href="/guide/config/rule-providers"><strong>Rule providers</strong><span>Load and update rules</span></a>
  <a href="/guide/config/sub-rules"><strong>Sub-rules</strong><span>Organize reusable rules</span></a>
  <a href="/guide/config/tunnels"><strong>Tunnels</strong><span>Port forwarding</span></a>
  <a href="/guide/config/ntp"><strong>NTP</strong><span>Protocol time synchronization</span></a>
  <a href="/guide/config/experimental"><strong>Experimental configuration</strong><span>Optional experimental settings</span></a>
</nav>

Additional notes: [Apple platforms](./apple-platforms) · [Security](./security)

## Field support status

- **Supported**: available subject to the conditions in the field description.
- **Managed / limited**: affected by client settings, platform capabilities, or compatibility handling.
- **Advanced**: for advanced uses such as local services or custom trust certificates.
- **Unsupported**: removed or ineffective inside Apple Packet Tunnel.
- **Not applicable**: belongs to Android, Linux, or another environment.

<ConfigFieldMatrix />

## Version notes

This index contains 185 entries. For nested protocol parameters under entries
such as `proxies` and `listeners`, consult the relevant guide. Some behavior
changes between versions; use the features available in your installed version.

::: details Documentation reference version

The 185-entry field matrix was reviewed on 2026-09-14 against Hako
`5bca0bcb73cd6dcb2d276be31f3a149211388c6d`.

The outbound type list and EasyTier guide were checked on 2026-09-24 against
[v1.19.31-hako.1](https://github.com/TokenPLS/Hako/releases/tag/v1.19.31-hako.1),
revision `7ea70d15bf8b67257928efe45c12f16d4ffc9f61`. This protocol update does not
re-audit every field in the matrix. Store app versions may include a different
SDK; use the features available in your installed version.

:::
