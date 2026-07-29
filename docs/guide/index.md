---
title: Getting started
description: Import your own subscription or mihomo YAML into Clash on iPhone or iPad, choose a node, and connect in three steps.
keywords:
  - Clash iOS guide
  - import Clash subscription on iPhone
  - import mihomo YAML
  - Clash node latency test
  - Clash Rule mode
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on iPhone or iPad
  description: Import your own subscription or configuration, choose a node, and connect.
  inLanguage: en-US
  supply:
    - "@type": HowToSupply
      name: A working proxy server configuration or subscription URL
  step:
    - "@type": HowToStep
      position: 1
      name: Import
      text: Add an HTTPS subscription URL, scan its QR code, open a YAML file, or import YAML through the system share sheet.
      url: https://clash.md/guide/#_1-import
    - "@type": HowToStep
      position: 2
      name: Pick a node
      text: Test latency, sort by delay, and choose the node you want to use.
      url: https://clash.md/guide/#_2-pick-a-node
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from the Home switch, Control Center, or Shortcuts.
      url: https://clash.md/guide/#_3-connect
---

# Getting started

Clash is a rule-based proxy utility powered by Hako. Import your own
configuration or subscription, and Clash applies a direct, proxy, or blocking
policy to each connection.

::: tip Use your own configuration
Import a server configuration or subscription you choose and trust, then use
Clash for testing, route selection, and rule-based traffic handling.
:::

## 1. Import

Add an HTTPS subscription URL, scan a QR code containing one, open a YAML file,
or share a YAML configuration from another app.

Profiles may include credentials, so treat configuration files and backups as
sensitive.

## 2. Pick a node

Test latency, sort by delay, and tap to switch.

## 3. Connect

Use the switch on Home, Control Center, or Shortcuts.

## Compatibility at a glance

Clash reads mihomo-format YAML configurations and HTTPS subscriptions that
return mihomo YAML. For a node supplied as an `ss://` link or in a Base64 node
list, convert it to mihomo YAML or recreate it from its parameters in the node
editor.

Standard Clash / mihomo YAML used by Stash imports directly. Nodes from
sing-box, Surge, Quantumult X, Shadowrocket, and Loon can be reused through a
mihomo subscription or recreated from their parameters in the node editor.

Read the [complete compatibility guide](/guide/compatibility) for exact
compatibility details and dedicated pages for mihomo clients, sing-box, Surge,
Quantumult X, Shadowrocket, Stash and Loon.

## Supported protocols

Clash currently supports 21 outbound protocol families, from HTTP, SOCKS,
Shadowsocks, VMess, VLESS and Trojan to Hysteria2, TUIC, WireGuard, MASQUE,
TrustTunnel and OpenVPN.

See the [supported protocol list](/guide/protocols) for every protocol and the
available configuration methods.

## Privacy by default

Clash uses an account-free, local-first architecture. Profiles and operational
data stay on your device, while network requests happen through features you
configure or start.

Read the [Privacy Policy](/privacy) for the complete data-handling explanation.

## Community support

Join the discussion in the
[Clash client issue tracker](https://github.com/TokenPLS/Hako-Client/issues).
Use redacted subscription examples, server addresses, credentials, and logs in
public issues.
