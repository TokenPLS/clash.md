---
title: Is Clash compatible with Quantumult X?
description: How to move Quantumult X subscriptions, nodes, policies, rewrites and filtering needs to Clash for iOS.
head:
  - - meta
    - name: keywords
      content: Quantumult X to Clash,QuanX subscription,Quantumult X config,Clash iOS
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/quantumult-x
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/quantumult-x
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I move a Quantumult X configuration to Clash?","acceptedAnswer":{"@type":"Answer","text":"Start with a Clash / mihomo subscription from the provider, or organize node parameters as mihomo YAML or add them in the node editor. Recreate policies, rewrites and filtering needs with Clash rules and matching features."}},{"@type":"Question","name":"Can I use a Quantumult X subscription in Clash?","acceptedAnswer":{"@type":"Answer","text":"Yes when the provider returns mihomo YAML from an HTTPS subscription URL. Standalone node parameters can also be organized as YAML or entered manually."}}]}'
---

# Is Clash compatible with Quantumult X?

**Common nodes continue to work, while routing policies can be recreated with Clash rules.**

Quantumult X uses its own [configuration and resource syntax](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf). When moving to Clash, keep using nodes through subscriptions, mihomo YAML or the node editor, then recreate policies, rewrites, scripts and filtering needs with matching features.

## What can be reused?

- subscription URLs that can return mihomo YAML;
- the node parameters contained in `ss://`, `ssr://`, `vmess://`, and similar
  share links, after conversion to mihomo YAML or manual entry;
- servers that can be recreated from their parameters in the Clash node editor.

## How to migrate

1. Select a Clash / mihomo subscription format from the provider.
2. Add that URL to Clash; change the subscription User-Agent when necessary.
3. Organize parameters from standalone share links or Base64 lists as mihomo YAML, or add them in the node editor.
4. Express the original routing intent using Clash rules.

## What to configure during migration

- organize nodes and policies as mihomo YAML;
- recreate rewrite, filter, task and script needs with matching Clash features;
- express product-specific resource syntax with Clash rules;
- set app preferences to match your workflow.

The same server can be used directly once its protocol and parameters match.

Return to the [compatibility overview](/guide/compatibility).
