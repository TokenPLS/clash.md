---
title: Core runtime state, NTP, and experimental configuration
description: Hako behavior for route selection, Fake IP state, NTP, and experimental mihomo configuration on iOS, macOS, and tvOS.
---

# Core runtime state, NTP, and experimental configuration

`profile.store-selected` and `profile.store-fake-ip` retain route selection and
Fake IP mappings; they do not store Clash Profiles themselves. iOS and macOS
retain this runtime state, while tvOS rebuilds it when needed.

## NTP

NTP can provide a time offset to protocols that need accurate time. Hako keeps
`write-to-system: false` and never changes the Apple system clock.

## Experimental

The current core may parse `experimental` fields, but they can change with the
core version. A basic connection should never depend on them.

<ConfigFieldMatrix category="profile" />
<ConfigFieldMatrix category="ntp" />
<ConfigFieldMatrix category="experimental" />
