---
title: Getting started
description: Add your own Clash or mihomo configuration or profile URL on iPhone, iPad, Mac, or Apple TV, choose a route, and connect.
keywords:
  - Clash guide
  - import Clash profile on iPhone
  - import mihomo YAML
  - Clash node latency test
  - Clash Rule mode
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to use Clash on Apple platforms
  description: Add your own Clash or mihomo configuration or profile URL, choose a route, and connect.
  inLanguage: en-US
  supply:
    - "@type": HowToSupply
      name: A working Clash or mihomo configuration or profile URL
  step:
    - "@type": HowToStep
      position: 1
      name: Add a profile
      text: Add a profile URL or import YAML on iPhone, iPad, or Mac. Enter a profile URL on Apple TV.
      url: https://clash.md/guide/#_1-add-a-profile
    - "@type": HowToStep
      position: 2
      name: Choose a route
      text: Open a policy group, check latency, and select the route you want.
      url: https://clash.md/guide/#_2-choose-a-route
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from Home, Control Center or Shortcuts on iPhone and iPad, or the menu bar on Mac.
      url: https://clash.md/guide/#_3-connect
---

# Getting started

Clash does not include servers or proxy lines. Bring a Clash / mihomo
configuration or profile URL you choose and trust, then add it, choose a route,
and connect.

::: tip Profiles may contain credentials
Treat profile files, profile URLs, and backups as sensitive. When asking for
help publicly, never post real URLs, usernames, passwords, or unredacted logs.
:::

## Start in three steps

### 1. Add a profile

Open **Profiles** to add a remote profile URL or use the file, share sheet, QR,
and clipboard options available on the current device. Apple TV uses a profile
URL and does not import local YAML files.

### 2. Choose a route

Open **Proxies** or **Nodes**, choose a policy group, check latency, and select a
route. Automatic groups follow the health-check behavior defined by the profile.

### 3. Connect

Return to Home and connect. The first time, approve the system request to add a
VPN configuration. Rule mode applies the active profile to decide whether each
connection goes direct, uses a proxy, or is rejected. Global and Direct remain
available when you need them.

::: info Need a configuration starting point?
Most people only need the [configuration best practices and minimal template](/guide/config/best-practice).
The [complete Hako reference](/guide/config/) is available when you need to
check a specific field or platform difference.
:::

## Choose your device

<nav class="guide-platform-grid" aria-label="Getting-started steps by device">
  <a href="#iphone-and-ipad"><strong>iOS</strong><span>iPhone and iPad</span></a>
  <a href="#macos"><strong>macOS</strong><span>Window and menu bar</span></a>
  <a href="#tvos"><strong>tvOS</strong><span>Apple TV and Siri Remote</span></a>
</nav>

## iPhone and iPad

1. In **Profiles**, paste a profile URL, scan a QR code, open or paste YAML, or
   share a configuration from another app.
2. In **Proxies**, test latency and select a route.
3. Connect from Home. After setup, Control Center, Shortcuts, and Siri provide
   quicker access.

Use On Demand conditions when you want Clash to respond to Wi-Fi or cellular
changes. Profiles can be exported locally; on devices with iCloud Drive,
backups can also be created and restored explicitly.

## macOS

1. In **Profiles**, add a profile URL, open a YAML file, import from the
   clipboard, or start with a blank profile.
2. In **Proxies**, refresh policy groups, check latency, and choose a route.
3. Connect from Home or the menu bar. The menu bar can also switch modes,
   select routes, and show live speed.

Use the main window for connections, rules, DNS, and diagnostics. For regular
use, configure On Demand behavior and create local or personal iCloud Drive
backups when needed.

## tvOS

1. Add a profile URL from the welcome screen or **Profiles**. Enter it with the
   Apple TV keyboard, or use the system keyboard when it appears on a nearby
   iPhone.
2. Open **Nodes**, browse policy groups, and select a member where manual choice
   is supported.
3. Return to Home, choose Rule, Global, or Direct, then connect.

The Apple TV app is designed for the Siri Remote and across-the-room use.
Connections, rules, DNS, and diagnostics remain visible on the television. It
adds configurations through Profile URLs; local YAML import and iCloud Drive
backup are not currently available.

## Profile compatibility

iPhone, iPad, and Mac read mihomo YAML directly and can add HTTPS profile URLs
that return mihomo YAML. Apple TV retrieves its profile from a URL.

Whether material from another client works directly depends on its format,
protocols, and parameters. See the [complete compatibility guide](/guide/compatibility).
Profiles and configurations are supplied by you. Clash does not provide servers,
proxy lines, or a network service.

## Supported protocols

Clash currently supports 23 outbound protocol families, including HTTP, SOCKS,
Shadowsocks, VMess, VLESS, Trojan, Hysteria2, TUIC, WireGuard, MASQUE,
TrustTunnel, and OpenVPN. See the [supported protocol list](/guide/protocols)
for the complete range, the distinction between protocol and control outbounds,
and configuration methods.

## Privacy and support

Clash needs no account. Profiles and operational information remain on the
device, and external requests serve only features you configure or start. Read
the [privacy model](/guide/privacy-model) and [Privacy Policy](/privacy) for the
details.

For non-confidential help, use the
[Clash client issue tracker](https://github.com/TokenPLS/Hako-Client/issues).
