---
title: General configuration
---

# General configuration

Write global settings at the YAML top level. This fragment enables rule routing and persists policy selections and Fake IP mappings. Combine it with nodes, groups, DNS, and rules.

```yaml
mode: rule
log-level: info
ipv6: false
unified-delay: true
tcp-concurrent: true
profile:
  store-selected: true
  store-fake-ip: true
```

## Modes and logging

| Field | Values or units | Choosing a value |
| --- | --- | --- |
| `mode` | `rule`, `global`, `direct` | Route by rules, use the global outbound, or connect directly; normally use `rule` |
| `log-level` | `silent`, `error`, `warning`, `info`, `debug` | Use `info` normally and `debug` temporarily for diagnosis |
| `ipv6` | Boolean | IPv6 use also depends on the app's IP Stack setting |
| `unified-delay` | Boolean | Unified latency testing; enabled by default in this client |
| `tcp-concurrent` | Boolean | Try TCP connections to resolved addresses concurrently |
| `find-process-mode` | `strict`, `always`, `off` | Query as needed, always attempt, or disable; process rules mainly apply to macOS |
| `keep-alive-idle` / `keep-alive-interval` | Seconds | TCP keep-alive idle delay and probe interval; keep defaults without a specific need |
| `disable-keep-alive` | Boolean | Disable TCP keep-alive |

See [Inbound](./inbounds) for ports, [DNS](./dns) for `hosts`, and [Security](./security) for custom trust and controller access.

## Platform behavior and field status

- **IPv6:** `ipv6` and `dns.ipv6` also depend on the app's IP Stack settings; TUN IPv6 capture is separate.
- **Delay testing:** `unified-delay` defaults to enabled when omitted; an explicit `false` disables it.
- **Process routing:** macOS can query process name, path, and UID. On iOS/tvOS, use destination domains, IPs, ports, or network types. See [routing rules](/guide/config/rules).
- **Geodata:** Clash manages resources. `geo-auto-update` stays off, and `geo-update-interval` does not enable scheduled updates. iOS/tvOS use precompiled resources, so some loader and matcher choices do not apply as written.
- **Fingerprints:** legacy `global-client-fingerprint` has no global effect; use `client-fingerprint` on supported outbound protocols.

External controllers and dashboards are advanced settings, not required for normal
connections. Read [access protection guidance](/guide/config/security) before using them.

<ConfigFieldMatrix category="general" />

## Saving runtime state

`profile.store-selected` saves core policy selections; `profile.store-fake-ip`
saves Fake IP mappings. Both default to enabled when omitted; explicit `false`
disables the corresponding cache. They do not save Profile configuration files.

Saving also requires persistent storage. tvOS may clear caches, so previous
selections and mappings may be lost.

<ConfigFieldMatrix category="profile" />

Reference: [mihomo](https://wiki.metacubex.one/config/general/).
