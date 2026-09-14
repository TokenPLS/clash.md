---
title: Proxy groups
---

# Proxy groups

A group gives routing rules a named outbound choice. Here `Proxy` lets you select automatic latency-based routing or direct access. Define `Subscription` under [proxy providers](./proxy-providers).

```yaml
proxy-groups:
  - name: Proxy
    type: select
    proxies: [Auto, DIRECT]
  - name: Auto
    type: url-test
    use: [Subscription]
    url: https://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
rules:
  - MATCH,Proxy
```

## Selection types

| `type` | Selection | Configuration |
| --- | --- | --- |
| `select` | Choose a node or group in the app | `proxies` or `use` |
| `url-test` | Select using measured latency | Members, `url`, `interval`; `tolerance` is the switching margin in milliseconds |
| `fallback` | First healthy member in order | Members, `url`, `interval`; put the preferred node first |
| `load-balance` | Distribute connections | Members, `url`, `interval`, `strategy` |

Load balancing supports `consistent-hashing`, `round-robin`, and `sticky-sessions` for hash-based allocation, rotation, and session affinity. Use a node's [`dialer-proxy`](./outbound/dialer-proxy) for chained connections.

## Membership and health checks

| Field | How to configure it |
| --- | --- |
| `name` | Unique group name referenced by rules and groups |
| `proxies` | List of node names, other groups, or built-ins such as `DIRECT`; avoid cycles |
| `use` | List of proxy-provider names |
| `include-all-proxies` / `include-all-providers` | Include all nodes or providers; `include-all` includes both |
| `filter` / `exclude-filter` | Include or exclude imported candidates by name, using regular expressions |
| `url` | Health-check URL reachable through the tested node |
| `interval` / `timeout` | Check interval in seconds; timeout in milliseconds |
| `lazy` | Allows unused groups to skip scheduled checks when enabled |
| `expected-status` | Expected HTTP status, such as `204` or `200/204` |
| `disable-udp` | Disable UDP for this group |

Set `health-check` explicitly on providers. A group with an explicit `url` can also register checks for providers referenced through `use`; existing check URLs, intervals, and `lazy` affect scheduling.

## Platform behavior and field status

Health checks depend on lazy behavior, system suspension, and resources; an interval does not guarantee a complete check every time. Legacy relay groups are removed; use dialer-proxy for chaining.

<ConfigFieldMatrix category="proxy-groups" />

Reference: [mihomo](https://wiki.metacubex.one/config/proxy-groups/).
