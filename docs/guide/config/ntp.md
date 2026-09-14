---
title: NTP
---

# NTP

Enable NTP when the core needs a clock offset for protocols. Default settings are usually sufficient.

```yaml
ntp:
  enable: true
  server: time.apple.com
  port: 123
  interval: 30
  write-to-system: false
  dialer-proxy: DIRECT
```

| Field | How to configure it |
| --- | --- |
| `enable` | Enable time synchronization |
| `server` / `port` | NTP server and UDP port; this example uses `time.apple.com:123` |
| `interval` | Synchronization interval in **minutes**, 30 here |
| `dialer-proxy` | Outbound for requests; another node must support UDP |
| `write-to-system` | Always disabled on Apple platforms; device time is unchanged |

If synchronization fails, check UDP connectivity and the selected outbound.

## Platform behavior and field status

NTP supplies a clock offset to protocols without changing device time.

<ConfigFieldMatrix category="ntp" />

Reference: [mihomo](https://wiki.metacubex.one/config/ntp/).
