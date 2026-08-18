---
title: Is Clash compatible with Stash?
description: How to move Stash Clash YAML, subscriptions, nodes, overrides, scripts and rules to Clash for iOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/stash
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/stash
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can a Stash configuration be used in Clash?","acceptedAnswer":{"@type":"Answer","text":"Standard Clash or mihomo YAML can be imported directly. Recreate Stash overrides, HTTP engine, MITM, rewrites, scripts and device settings with matching Clash features."}},{"@type":"Question","name":"Can I use a Stash subscription in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the subscription returns standard Clash or mihomo YAML. Add the same URL to Clash and change the subscription User-Agent when necessary."}}]}'
---

# Is Clash compatible with Stash?

**Standard Clash / mihomo YAML and subscriptions can be used directly.**

The Stash documentation says it imports [Stash / Clash formatted configurations](https://stash.wiki/en/get-started), and that [its configuration files use YAML](https://stash.wiki/en/configuration/example-config). A standard Clash or mihomo YAML configuration used in Stash can therefore be imported directly into Clash.

## What moves directly?

- standard Clash / mihomo YAML configurations;
- remote subscriptions returning Clash / mihomo YAML;
- nodes, proxy providers and rule providers;
- policy groups, health checks and routing rules;
- DNS and other fields supported by both apps.

## Fastest migration path

1. Copy the subscription URL used by the active Stash configuration.
2. Add it as a remote configuration in Clash.
3. A local YAML file can also be opened or shared into Clash.
4. Update the profile and check its nodes, groups and rules.
5. When the provider offers multiple formats, change the subscription User-Agent and select Clash / mihomo output.

## Recreate Stash features in Clash

- consolidate override files into a clear mihomo YAML configuration;
- recreate HTTP engine, MITM and certificate needs with matching features;
- express URL rewrite and script needs with Clash rules and matching features;
- set on-demand behavior, sync, remote control and app preferences to match your workflow.

If Stash combines multiple override files dynamically, export or consolidate the result as standard mihomo YAML, then map Stash extension needs to the corresponding Clash features.

## Can I keep using the same server?

The same server can be used directly when both apps use the same standard node configuration.

Return to the [compatibility overview](/guide/compatibility).
