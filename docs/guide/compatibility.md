---
title: Clash compatibility with mihomo, sing-box, Surge, Quantumult X, Shadowrocket, Stash and Loon
description: Recommended migration paths for mihomo, sing-box, Surge, Quantumult X, Shadowrocket, Stash and Loon subscriptions, configurations and nodes.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move sing-box nodes to Clash?","acceptedAnswer":{"@type":"Answer","text":"Prefer a provider-supplied mihomo YAML subscription or recreate the node in Clash from its protocol parameters."}},{"@type":"Question","name":"How do I move Surge or Quantumult X nodes?","acceptedAnswer":{"@type":"Answer","text":"Use a subscription that returns mihomo YAML or add the node from its original server and protocol parameters."}},{"@type":"Question","name":"Can I reuse a Shadowrocket subscription in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from its HTTPS subscription URL. Recreate rules and modules with Clash rules and corresponding features."}},{"@type":"Question","name":"How do I use ss:// links or Base64 node lists?","acceptedAnswer":{"@type":"Answer","text":"Convert them to mihomo YAML or enter their server, port, credentials and protocol parameters in the Clash node editor."}}]}'
---

# Clash compatibility with popular proxy apps

**Short answer:** Clash directly reads mihomo-format YAML configurations and HTTPS subscriptions that return mihomo YAML, including standard Clash / mihomo YAML used by Stash. Servers and nodes from sing-box, Surge, Quantumult X, Shadowrocket, or Loon can be reused through a compatible subscription or parameter-based node entry.

## Choose the app you use now

| Current app | Recommended configuration path | Node path | Details |
| --- | --- | --- | --- |
| Clash / mihomo | Use standard mihomo YAML directly | Use directly | [mihomo compatibility](/guide/compatibility/mihomo) |
| sing-box | Obtain a mihomo subscription or prepare YAML | Add supported protocol parameters | [sing-box compatibility](/guide/compatibility/sing-box) |
| Surge | Obtain a mihomo subscription or recreate nodes | Shared protocols include Snell | [Surge compatibility](/guide/compatibility/surge) |
| Quantumult X | Use a mihomo subscription | Parameter-based entry also works | [Quantumult X compatibility](/guide/compatibility/quantumult-x) |
| Shadowrocket | Use a mihomo subscription | Parameter-based entry also works | [Shadowrocket compatibility](/guide/compatibility/shadowrocket) |
| Stash | Use standard Clash / mihomo YAML directly | Use directly | [Stash compatibility](/guide/compatibility/stash) |
| Loon | Use a mihomo subscription | Parameter-based entry also works | [Loon compatibility](/guide/compatibility/loon) |

## Three kinds of compatibility

1. **Configuration compatibility** — direct reuse of complete configurations.
2. **Subscription-format compatibility** — receiving mihomo YAML from an HTTPS subscription.
3. **Protocol interoperability** — connecting directly to the same server.

Clash provides broad subscription-format and protocol interoperability.
Product-specific settings can be recreated with mihomo YAML, Clash rules, and
the corresponding features.

## What can Clash import directly?

| Source | Result |
| --- | --- |
| mihomo YAML configuration | Import directly |
| Subscription returning mihomo YAML | Add the URL directly; subscription User-Agent is configurable |
| Standalone node links such as `ss://` | Convert to mihomo YAML or recreate the node from its parameters |
| Base64 node list | Convert to mihomo YAML before import |
| QR code containing an HTTPS subscription URL | Scan to add a remote configuration |

See the [complete protocol list](/guide/protocols).

## Frequently asked questions

### Can I reuse my Shadowrocket subscription?

Yes when the provider returns mihomo-compatible YAML from the HTTPS subscription
URL. Recreate Shadowrocket rules, modules, and app settings with Clash rules and
the corresponding features. See the dedicated
[Shadowrocket compatibility guide](/guide/compatibility/shadowrocket).

### Can I use the same airport or provider subscription?

Yes, if the provider can return mihomo-compatible YAML. Clash can change its subscription User-Agent for panels that select an output format by client name.

### Can I keep using the same server?

When the protocol and all required parameters are supported, the same server
works directly.

### Does compatibility mean affiliation?

Brand names identify configuration and protocol compatibility. Clash and Hako
are developed and maintained independently.
