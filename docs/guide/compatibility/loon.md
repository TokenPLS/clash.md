---
title: Is Clash compatible with Loon?
description: How to move Loon subscriptions, nodes, configuration, plugin, rewrite and script needs to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/loon
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/loon
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can I use a Loon subscription in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from an HTTPS subscription URL. Parameters from Loon node text, standalone links or Base64 lists can also be organized as YAML or entered manually."}},{"@type":"Question","name":"Can Loon nodes be used in Clash?","acceptedAnswer":{"@type":"Answer","text":"Shared protocols including Shadowsocks, ShadowsocksR, VMess, VLESS, Trojan, HTTP, SOCKS, WireGuard, Hysteria2 and AnyTLS can be reused with matching parameters."}},{"@type":"Question","name":"How do I move Loon plugins, rewrites and scripts?","acceptedAnswer":{"@type":"Answer","text":"Recreate the original plugin, rewrite and script needs with mihomo configuration, Clash rules and matching features."}}]}'
---

# Is Clash compatible with Loon?

**Shared node protocols continue to work, while the original routing experience can be recreated in Clash.**

Loon has its own syntax for nodes, rules, policies, rewrites, scripts and plugins. When moving to Clash, continue using provider subscriptions and nodes through compatible formats, then recreate rules and extension features with matching Clash capabilities.

## Which Loon nodes can be reused?

According to the [official Loon node documentation](https://nsloon.app/docs/Node/), protocols shared by both apps include:

- Shadowsocks and ShadowsocksR;
- VMess and VLESS;
- Trojan;
- HTTP / HTTPS and SOCKS5;
- WireGuard;
- Hysteria2;
- AnyTLS.

Match the transport, TLS, Reality, obfuscation, encryption, authentication and UDP options to get the complete protocol experience.

## How do I migrate a Loon subscription?

1. Try adding the same subscription URL to Clash.
2. If the provider selects output by client, change the subscription User-Agent and choose Clash / mihomo output.
3. When the provider offers Loon-specific text, select its mihomo YAML output.
4. Organize standalone link parameters as mihomo YAML, or add them in the node editor.

## What to recreate in Clash

- organize nodes, rules and policy groups as mihomo YAML;
- recreate plugin, rewrite and JavaScript needs with matching Clash features;
- express Custom by JS connection needs with protocols available in Clash;
- set app preferences, certificates and local data to match your workflow.

Loon defines a plugin as a collection of rules, rewrites and scripts. In Clash, map those needs to rules and matching features for a clear, maintainable setup.

## Can I keep using the same server?

The same node can work when both apps support its protocol and every required parameter has an equivalent.

Return to the [compatibility overview](/guide/compatibility), or see [all supported protocols](/guide/protocols).
