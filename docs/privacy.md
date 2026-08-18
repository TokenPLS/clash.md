---
title: Privacy Policy
description: Clash collects no app or VPN data. Learn how profiles, credentials, logs, diagnostics, iCloud backups, and user-directed network requests are handled.
keywords:
  - Clash Privacy Policy
  - Clash VPN data
  - iOS proxy data collection
  - VPN privacy policy
  - local profile privacy
jsonLd:
  "@context": https://schema.org
  "@type": WebPage
  name: Clash Privacy Policy
  description: Clash collects no app or VPN data and explains local profiles, diagnostics, and user-directed requests.
  url: https://clash.md/privacy
  inLanguage: en-US
  about:
    - VPN data
    - local profiles
    - diagnostics
    - iCloud backup
  publisher:
    "@type": Organization
    name: OmniWide Media Limited
    email: legal@omniwide.media
---

# Privacy Policy

**Last updated: 18 August 2026**

This policy explains how Clash handles information on iPhone, iPad, Mac, and
Apple TV, with a separate section for visits to this website. Clash is an
on-device network utility, not a proxy service. It has no developer-operated
traffic relay or account backend and connects only to services **you** configure.

Clash is published by, and “we” in this policy means,
**OmniWide Media Limited**.

## What we collect in the app

The Developer collects nothing from the Clash apps.

Clash has no account system, analytics, telemetry, advertising SDK, tracking
SDK, third-party crash reporter, or automatic diagnostics uploader. Its
privacy manifest declares no collected data types, no tracking, and no
tracking domains.

Under Apple's App Privacy definition, information processed only on the device
is not collected. We do not transmit app or VPN data to ourselves or to
analytics, advertising, or data-broker partners.

## VPN data commitment

We do not collect or sell user data, use it for our own purposes, or disclose
it to third parties. Clash processes network traffic on the device only as
necessary to provide the functionality you request.

The proxy, DNS, profile, provider, and test services you configure are
user-directed external services, not services operated by us and not data
recipients selected by us.

## What stays on your device

- **Profiles and configurations** are stored byte for byte as you supplied
  them, including credentials contained in those files. They are protected by
  the corresponding Apple platform's data protection and app container.
- **App settings** are stored locally in the app container. Sensitive local
  proxy-sharing credentials are stored in the device Keychain.
- **Connection and request activity** is bounded operational information shown
  in the app. Live and recent connection data is capped, held locally, and is
  not uploaded by Clash. Clash does not record the contents of your traffic.
- **Logs and diagnostics** remain local. On platforms that support MetricKit,
  Clash can receive privacy-filtered Apple diagnostics on the device, but it
  has no automatic uploader. Data leaves the device only when you explicitly
  use an export or share action, in which case you choose the destination.

## User-directed network connections

Clash makes network connections to provide features you configure or start:

- **Profile, rule-provider, proxy-provider, proxy, and DNS services**
  named by your configuration. Depending on the service, it may receive your
  IP address, request time, authentication information, DNS queries, traffic
  metadata, and the content that the selected protocol can access.
- **Resource updates** from the URLs shown on the Resources page. Default geo
  database sources point to the MetaCubeX `meta-rules-dat` releases on GitHub.
- **Diagnostics you start.** On platforms that provide the corresponding
  feature, the network-quality test contacts Apple's measurement endpoint,
  STUN contacts the server you enter, and latency tests contact the URL
  configured for the selected group.
- **Configured background updates.** When enabled, Clash may check configured
  remote profiles and resources in the background for the purpose you selected.

These external services operate under their own terms and privacy policies. We
do not control them and do not receive the data they process.

Clash does not contact any service in the background for our benefit.
Automatic profile and resource updates run only when you configure or enable
them.

## iCloud backup

On platforms that support iCloud Drive backup, a backup you explicitly create
is stored in **your** iCloud account under Apple's terms. We do not have access
to it. Apple TV does not use iCloud Drive for profile backups.

## Retention, deletion, and privacy choices

Because we collect no data and provide no account, there is no server-side user
profile or developer-held personal data to retain or delete.

- Local profiles, settings, credentials, logs, and diagnostics remain on the
  device until you delete the relevant item or uninstall Clash.
- On platforms that provide **Clear All Local Data**, that action removes local
  profiles, settings, and Keychain credentials. It does not delete iCloud
  backups.
- Current iCloud backups can be deleted from Clash's **Backup & Restore** page.
- You can stop user-directed processing by disconnecting, removing a profile,
  disabling configured updates, or choosing not to run or export diagnostics.

## Website visits

`clash.md` is a static website. We have not added an account system, analytics,
advertising, tracking scripts, or marketing cookies to it. The site is hosted
on GitHub Pages. GitHub states that a visitor's IP address is logged and stored
for security purposes when a Pages site is visited. That processing is governed
by the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

GitHub Pages hosting logs are not Clash app or VPN data. We do not connect a
website visit with profiles, traffic, or device activity in the app.

## Open source and verifiability

The [Clash client](https://github.com/TokenPLS/Hako-Client) and
[Hako core](https://github.com/TokenPLS/Hako) source are public for inspection.
Anyone can examine the data-handling logic the client and core actually execute
instead of relying only on the promises in this policy.

## Children

Clash is a general network utility and is not directed at children. We do not
knowingly collect personal data from anyone, including children.

## Changes to this policy

We may update this policy when the app, website hosting, or data practices
change. The current version and update date will be published at this URL.
Material changes will also be reflected in the app or its release information.

## Contact

If you wish to contact us regarding this Privacy Policy or any privacy-related
matters, please contact us via email at
[legal@omniwide.media](mailto:legal@omniwide.media), or via postal mail at
**OmniWide Media Limited, 128 City Road, London, United Kingdom, EC1V 2NX**.

For non-confidential questions, you may use the
[Clash client issue tracker](https://github.com/TokenPLS/Hako-Client/issues).
Never post profile URLs, credentials, server addresses, private logs, or
other sensitive information in a public issue.
