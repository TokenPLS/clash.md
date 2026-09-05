---
title: Privacy model
description: "Clash uses a local-first privacy model across Apple platforms: profiles, logs and diagnostics stay on the device, and network requests serve features you configure or start."
keywords:
  - Clash privacy
  - Apple platform proxy privacy
  - VPN data collection
  - on-device processing
  - NetworkExtension privacy
jsonLd:
  "@context": https://schema.org
  "@type": TechArticle
  headline: Clash's local-first privacy model
  description: What Clash keeps on the device and which external requests are configured or started by the user.
  url: https://clash.md/guide/privacy-model
  inLanguage: en-US
  about:
    - on-device data processing
    - VPN privacy
    - user-directed network requests
---

# Privacy model

Clash is an on-device client. You configure the profile URLs, servers, and
network services you choose, while its account-free architecture keeps the
experience local-first.

## On your device

Profiles, settings, connection history, logs, and diagnostics are handled
locally. Sensitive local proxy-sharing credentials are stored in the device
Keychain. Profiles are stored in the app container with the corresponding
Apple platform's data protection.

## At your direction

Clash makes external requests only to provide features you configure or start,
including:

- remote-profile, provider, proxy, and DNS servers named by your configuration;
- resource-update sources shown in the app;
- network-quality, STUN, and latency-test endpoints you select on platforms
  that provide those features;
- your iCloud account when you explicitly create a backup on a platform that
  supports iCloud Drive backup.

Those services receive the network information needed to perform the operation,
such as your IP address. Data travels directly to the services you choose, with
the developer outside that path.

## Verifiable by design

The [Clash client](https://github.com/TokenPLS/Hako-Client) and
[Hako core](https://github.com/TokenPLS/Hako) are both fully open source.
The privacy model can be checked against the code the client and core actually
execute instead of treated only as a promise.

The [Privacy Policy](/privacy) is the authoritative legal description.
