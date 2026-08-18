---
title: Is Clash compatible with sing-box?
description: How to move sing-box JSON configurations, subscriptions and VLESS, Trojan, Hysteria2, TUIC or AnyTLS nodes to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/sing-box
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/sing-box
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move a sing-box JSON configuration to Clash?","acceptedAnswer":{"@type":"Answer","text":"Clash uses mihomo YAML. Prefer a mihomo subscription or recreate the required nodes and routing intent from the sing-box configuration."}},{"@type":"Question","name":"Can sing-box nodes work in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the protocol, transport, TLS, authentication and parameters are supported by Clash. Common VLESS, Trojan, Hysteria2, TUIC and AnyTLS nodes are supported."}}]}'
---

# Is Clash compatible with sing-box?

**Reuse the node protocols and express the configuration as mihomo YAML.**

[sing-box uses JSON configurations](https://sing-box.sagernet.org/configuration/), while Clash uses mihomo YAML. Move the nodes, routing intent, and DNS behavior you need into a mihomo YAML configuration.

## Which sing-box nodes can be reused?

When their parameters match, common sing-box protocols available in Clash include:

- VLESS;
- Trojan;
- Shadowsocks;
- Hysteria2;
- TUIC;
- AnyTLS;
- WireGuard;
- SSH.

See the [complete protocol list](/guide/protocols).

## Fastest migration path

1. Prefer a mihomo / Clash subscription from the provider.
2. If only an `ss://`, `vless://`, or similar share link is available, convert it
   to mihomo YAML first or recreate the node from its parameters in Clash.
3. Use a standalone node link as a parameter source for YAML or manual entry.
4. Rebuild routing and DNS rules that only exist in the sing-box JSON.

## What to configure during migration

- express the sing-box JSON structure as mihomo YAML;
- map the required `route`, `dns`, `inbounds`, and `outbounds` behavior;
- choose corresponding stable Clash capabilities for experimental options;
- set interface and Apple system preferences in Clash.

The same server works directly when its protocol, transport, TLS,
authentication, and parameter combination is supported by Clash.

Return to the [compatibility overview](/guide/compatibility).
