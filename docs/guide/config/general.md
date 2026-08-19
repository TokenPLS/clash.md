---
title: General configuration
description: Hako general mihomo YAML fields for runtime mode, logging, connections, hosts, and geodata, with Apple-platform status.
---

# General configuration

General fields control core runtime behavior. `mode: rule` is the practical
daily default; `global` and `direct` are useful for temporary diagnosis.
IPv6, logging, delay measurement, TCP concurrency, keep-alive, and hosts are
handled by the shared Hako core on all three platforms.

## Apple-platform notes

- `find-process-mode` depends on process metadata supplied by the system.
  macOS Packet Tunnel supports process name, path, and UID; use domain, IP,
  port, and network-type rules on iOS and tvOS.
- Geodata works through Hako-managed resources. iOS and tvOS prioritize memory
  use, and tvOS caches must be treated as rebuildable.
- Upstream removed `global-client-fingerprint`; use per-outbound
  `client-fingerprint` where the protocol supports it.

<ConfigFieldMatrix category="general" />
