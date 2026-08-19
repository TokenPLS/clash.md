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

- Only macOS Packet Tunnel exposes usable process name, path, and UID metadata.
  iOS and tvOS do not pretend that missing process identity is available.
- Geodata works through Hako-managed resources. iOS and tvOS prioritize memory
  use, and tvOS caches must be treated as rebuildable.
- Upstream removed `global-client-fingerprint`; use per-outbound
  `client-fingerprint` where the protocol supports it.

<ConfigFieldMatrix category="general" />
