---
title: Getting started
description: Add your own Clash or mihomo configuration on iPhone, iPad, Mac, or Apple TV, choose a route, and make your first connection.
keywords:
  - Clash guide
  - add Clash profile on iPhone
  - import mihomo YAML
  - Clash node latency test
  - Clash Rule mode
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: How to get started with Clash on Apple platforms
  description: Add your own Clash or mihomo configuration, choose a route, and make your first connection.
  inLanguage: en-US
  supply:
    - "@type": HowToSupply
      name: A working Clash or mihomo configuration, or a Profile URL
  step:
    - "@type": HowToStep
      position: 1
      name: Add a Profile
      text: Add a Profile URL or import YAML on iPhone, iPad, or Mac. Enter a Profile URL on Apple TV.
      url: https://clash.md/guide/#_1-add-a-profile
    - "@type": HowToStep
      position: 2
      name: Choose a route
      text: Open a policy group, check latency, and select the route you want.
      url: https://clash.md/guide/#_2-choose-a-route
    - "@type": HowToStep
      position: 3
      name: Connect
      text: Connect from Home; iPhone and iPad also support Control Center and Shortcuts, while Mac supports the menu bar.
      url: https://clash.md/guide/#_3-connect
---

# Getting started

Clash does not include servers or routes. Bring a Clash / mihomo configuration
you choose and trust, then add it, choose a route, and connect.

::: tip Profiles may contain credentials
Treat configuration files, Profile URLs, and backups as sensitive. When asking
for help publicly, never post real URLs, usernames, passwords, keys, or
unredacted logs.
:::

## Connect in three steps

### 1. Add a Profile

Open **Profiles** and choose **Add Profile**. iPhone, iPad, and Mac can start
from a Profile URL, configuration file, pasted content, or a blank Profile;
iPhone and iPad can also scan a QR code. Apple TV uses an HTTP or HTTPS Profile
URL.

### 2. Choose a route

Open **Proxies** or **Nodes**, find the policy group responsible for the traffic
you want to change, check latency, and select a route. Automatic groups follow
the health-check behavior defined by the Profile.

### 3. Connect

Return to Home and connect. The first time, approve the system request to add a
VPN configuration. **Rule** is the recommended everyday mode: the active
Profile decides whether each connection goes direct, uses a proxy, or is
rejected.

::: info Need a configuration starting point?
Start with the [configuration best practices and minimal template](/guide/config/best-practice).
When you need a specific field or platform difference, continue to the
[complete configuration reference](/guide/config/).
:::

## Connected. What next?

<section class="guide-next-card" aria-labelledby="everyday-use-title-en">
  <span>Everyday use</span>
  <h3 id="everyday-use-title-en">Go from connected to in control.</h3>
  <p>Manage Profiles, choose nodes, change outbound modes, inspect active connections, and confirm when a new setting is actually in use.</p>
  <a href="/guide/everyday-use">Explore everyday use →</a>
</section>

## Continue with your device

<nav class="guide-platform-grid" aria-label="View usage instructions by device">
  <a href="/guide/ios"><strong>iOS</strong><span>Complete iPhone and iPad guide</span></a>
  <a href="/guide/macos"><strong>macOS</strong><span>Complete Mac guide</span></a>
  <a href="/guide/tvos"><strong>tvOS</strong><span>Complete Apple TV guide</span></a>
</nav>

## Keep exploring

<nav class="config-topic-grid" aria-label="More Clash guides">
  <a href="/guide/everyday-use"><strong>Everyday use</strong><span>Profiles, nodes, modes, and active connections</span></a>
  <a href="/guide/config/best-practice"><strong>Configuration best practices</strong><span>Start with a trusted, minimal configuration</span></a>
  <a href="/guide/config/"><strong>Configuration reference</strong><span>Fields, platform differences, and security boundaries</span></a>
  <a href="/guide/compatibility"><strong>Compatibility</strong><span>Bring existing configurations and nodes</span></a>
  <a href="/guide/protocols"><strong>Supported protocols</strong><span>See the complete outbound protocol range</span></a>
  <a href="/guide/privacy-model"><strong>Privacy model</strong><span>Learn what stays on your device</span></a>
</nav>
