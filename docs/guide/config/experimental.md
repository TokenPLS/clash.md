---
title: Experimental configuration
---

# Experimental configuration

Experimental options address specific compatibility needs. Omit the entire section unless you need one of these behaviors.

```yaml
experimental:
  quic-go-disable-gso: false
  quic-go-disable-ecn: false
  dialer-ip4p-convert: false
```

| Field | Effect |
| --- | --- |
| `quic-go-disable-gso` | `true` requests disabling GSO packet segmentation in the QUIC implementation |
| `quic-go-disable-ecn` | `true` requests disabling ECN congestion notification in QUIC |
| `dialer-ip4p-convert` | Enable IP4P encoded-address conversion only for a server that uses it |
| `fingerprints` | Legacy field with no effect; configure certificate fingerprints on the relevant node |

Change only the option relevant to the problem, then check with new connections.

## Platform behavior and field status

Flags set by quic-go-disable-ecn and quic-go-disable-gso may persist until the extension process exits. Setting false, reloading, or reconnecting does not guarantee immediate restoration.

<ConfigFieldMatrix category="experimental" />

Reference: [mihomo](https://wiki.metacubex.one/config/experimental/).
