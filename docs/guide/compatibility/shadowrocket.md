---
title: Is Clash compatible with Shadowrocket?
description: How to move Shadowrocket remote profiles, QR codes, node parameters, rules, and module needs to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/shadowrocket
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/shadowrocket
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can I use a Shadowrocket remote profile in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from an HTTPS profile URL. Change the Profile User-Agent when necessary."}},{"@type":"Question","name":"How do I use ss:// and other Shadowrocket node parameters in Clash?","acceptedAnswer":{"@type":"Answer","text":"Organize standalone link or Base64 list parameters as mihomo YAML, or enter them in the node editor. A QR code can add an HTTPS profile URL."}},{"@type":"Question","name":"How do I move Shadowrocket rules and modules?","acceptedAnswer":{"@type":"Answer","text":"Recreate the original rules, modules, rewrites and script needs with mihomo configuration, Clash rules and matching features."}}]}'
---

# Is Clash compatible with Shadowrocket?

**Remote profiles and common nodes continue to work, while the original routing experience can be recreated in Clash.**

If you already use a provider profile URL in Shadowrocket and the provider
returns mihomo YAML from an HTTPS URL, you can usually add the same profile
URL to Clash. The same server can be used when its protocol and parameters match.

## How do I import a Shadowrocket remote profile?

1. Copy the active profile URL from Shadowrocket.
2. Add it as a remote configuration in Clash.
3. Update the profile and check its nodes and policy groups.
4. When the provider offers multiple formats, change the Profile User-Agent and select Clash / mihomo output.
5. Test latency, choose a node and connect.

## How to use share links and QR codes

QR codes offer a quick way to add an HTTPS profile URL that returns mihomo
YAML. For `ss://`, `ssr://`, `vmess://`, `vless://`, `trojan://`,
`hysteria2://`, `tuic://`, `anytls://` and Base64 node lists, organize the
server, port, credentials, TLS and transport parameters as mihomo YAML, or add
them in the node editor.

## What to recreate in Clash

- express the original routing logic with Clash rules;
- recreate module, rewrite and script needs with matching features;
- set node groups and scenarios to match your workflow;
- use Clash profile management and backup options for your setup.

This keeps your existing nodes useful while giving the configuration a clear structure that matches Clash.

## Use standalone node parameters

Inspect or export the node parameters in Shadowrocket, then recreate the node in
Clash from its server, port, authentication, TLS, and transport parameters, or
organize them as mihomo YAML.

## Can I keep using the same server?

The same server can work when Clash supports the protocol and the protocol version, transport, TLS, authentication and other parameters match.

Return to the [compatibility overview](/guide/compatibility), or see [all supported protocols](/guide/protocols).
