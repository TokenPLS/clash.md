---
title: Profile state, NTP, and experimental configuration
description: Hako support boundaries for Profile state, NTP, and experimental mihomo configuration on iOS, macOS, and tvOS.
---

# Profile state, NTP, and experimental configuration

`profile.store-selected` and `profile.store-fake-ip` retain route selection and
Fake IP state. iOS and macOS support file-backed state; tvOS files must be
treated as clearable and rebuildable.

## NTP

NTP can provide a time offset to protocols that need accurate time. Hako keeps
`write-to-system: false` and never changes the Apple system clock.

## Experimental

The current core may parse `experimental` fields, but they can change with the
core version. A basic connection should never depend on them.

<ConfigFieldMatrix category="profile" />
<ConfigFieldMatrix category="ntp" />
<ConfigFieldMatrix category="experimental" />
