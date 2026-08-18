---
title: Is Clash compatible with Surge?
description: How to move Surge profiles, Snell, Shadowsocks, Trojan, WireGuard nodes and routing policies to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/surge
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/surge
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move a Surge profile to Clash?","acceptedAnswer":{"@type":"Answer","text":"Organize nodes and routing policies as mihomo YAML, or add a provider profile URL that returns Clash / mihomo YAML. Recreate modules, scripts and rewrites with the corresponding Clash rules and features."}},{"@type":"Question","name":"Does Clash support Surge Snell nodes?","acceptedAnswer":{"@type":"Answer","text":"Yes. Add a Snell node through mihomo YAML, a compatible profile URL, or the node editor."}}]}'
---

# Is Clash compatible with Surge?

**Shared node protocols continue to work, while routing policies can be organized as mihomo YAML.**

[Surge uses its own profile format](https://manual.nssurge.com/overview/quick-start.html), with sections such as `[General]`, `[Proxy]`, `[Proxy Group]` and `[Rule]`. For migration, organize nodes and policy groups as mihomo YAML, then use Clash rules and matching features to recreate the routing experience.

## Which Surge nodes can be reused?

Clash supports Snell and multiple protocols shared by both products, including:

- HTTP and SOCKS;
- Shadowsocks;
- VMess and Trojan;
- WireGuard;
- Snell.

Snell is normally added through mihomo YAML, a compatible profile URL that
returns mihomo YAML, or the node editor. Other nodes can be recreated from their
server and protocol parameters.

## How to migrate

1. Prefer a provider profile URL that returns mihomo / Clash YAML.
2. If only a Surge profile is available, recreate the required nodes from their parameters.
3. Rewrite Surge policy groups and rules as mihomo YAML.
4. Use Clash rules and matching features to recreate the needs expressed by modules, scripts and rewrites.

## What to configure during migration

- organize Surge nodes and policies as mihomo YAML;
- express the original routing logic with Clash rules;
- recreate module, rewrite, MITM and script needs with matching Clash features;
- set app preferences to match your workflow.

The same server can be used directly once its protocol and parameters match.

Return to the [compatibility overview](/guide/compatibility).
