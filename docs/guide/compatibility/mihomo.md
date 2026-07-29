---
title: Clash compatibility with mihomo, Clash Verge Rev, FlClash, Clash Nyanpasu, ClashMi and OpenClash
description: Migrate mihomo YAML and subscriptions from Clash Verge Rev, FlClash, Clash Nyanpasu, ClashMi, OpenClash or ShellCrash to Clash for iPhone and iPad.
head:
  - - meta
    - name: keywords
      content: mihomo iOS,Clash Verge Rev iOS,FlClash subscription,Clash Nyanpasu config,ClashMi config,OpenClash subscription,ShellCrash config
  - - link
    - rel: canonical
      href: https://clash.md/guide/compatibility/mihomo
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/compatibility/mihomo
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which mihomo client configurations work with Clash?","acceptedAnswer":{"@type":"Answer","text":"Standard mihomo YAML configurations and subscriptions that return mihomo YAML can be imported directly, including configurations used by Clash Verge Rev, FlClash, Clash Nyanpasu, ClashMi, OpenClash and ShellCrash."}},{"@type":"Question","name":"Can I use a Clash Verge Rev subscription in Clash for iOS?","acceptedAnswer":{"@type":"Answer","text":"Yes. Add the same mihomo subscription URL to Clash. When the panel offers multiple formats, change the subscription User-Agent to select Clash / mihomo output."}},{"@type":"Question","name":"How do I use an OpenClash configuration in Clash for iOS?","acceptedAnswer":{"@type":"Answer","text":"Import the standard mihomo YAML directly and recreate the matching experience with Clash rules and iOS settings. OpenWrt plugin settings continue to be managed by the router."}}]}'
---

# Full compatibility with mihomo clients

A **standard mihomo YAML configuration**, or a subscription that returns mihomo YAML, can be imported directly into Clash. Nodes, policy groups, rules, providers and supported configuration fields continue to work, saving the step of recreating every node.

“Full compatibility” here means mihomo configuration and subscription compatibility. Interface preferences, system proxy, TUN and backup settings can be configured for your preferred workflow in Clash for iOS.

## Popular mihomo clients

These are representative community projects:

| Client | Common platforms | Moving to Clash |
| --- | --- | --- |
| [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) | Windows, macOS, Linux | Import the mihomo YAML or add the same subscription |
| [FlClash](https://github.com/chen08209/FlClash) | Windows, macOS, Linux, Android | Import the mihomo YAML or add the same subscription |
| [Clash Nyanpasu](https://github.com/libnyanpasu/clash-nyanpasu) | Windows, macOS, Linux | Import the mihomo YAML or add the same subscription |
| [ClashMi](https://github.com/KaringX/clashmi) | iOS, macOS, Android, Windows, Linux | Import the mihomo YAML or add the same subscription |
| [OpenClash](https://github.com/vernesong/OpenClash) | OpenWrt | Import standard mihomo YAML; keep plugin settings managed by OpenWrt |
| [ShellCrash](https://github.com/juewuy/ShellCrash) | Routers and shell environments | Import standard mihomo YAML; keep installation and service settings in the original environment |

See the mihomo documentation for the broader [third-party tools and clients list](https://wiki.metacubex.one/startup/client/client/).

## What moves directly?

- mihomo YAML configuration files;
- subscription URLs that return mihomo YAML;
- nodes and proxy providers;
- policy groups and health checks;
- routing rules and rule providers;
- DNS and supported long-tail fields.

## Connect platform settings

Nodes, policy groups and rules move with mihomo YAML. Platform settings such as themes, window layouts, keyboard shortcuts, system proxy, TUN, launch at login, WebDAV backups and router plugins stay managed by their platform, with matching preferences available in Clash for iOS.

If the original client uses Merge, Mixin, overrides or scripts to generate its final configuration, export the generated standard mihomo YAML or use the original subscription URL.

## Fastest migration path

1. Find the active subscription URL in the original client.
2. Add that URL to Clash.
3. When the panel offers multiple formats, change the subscription User-Agent and select Clash / mihomo output.
4. Update the profile and confirm that groups, rules and nodes are present.
5. Test latency, choose a node and connect.

## Apple platform differences

iPhone and iPad use Apple's Packet Tunnel network-layer capabilities. Express desktop process- or app-routing goals with domain, IP and Rule Set policies; keep router interfaces, transparent proxy and firewall settings managed by the router.

Return to the [compatibility overview](/guide/compatibility).
