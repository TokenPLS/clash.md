---
title: Rule providers
---

# Rule providers

Rule providers collect matching conditions. Their entries contain conditions; a `RULE-SET` routing rule chooses the outbound. Replace `Proxy` below with a defined node or group.

```yaml
rule-providers:
  Work:
    type: inline
    behavior: classical
    payload:
      - DOMAIN-SUFFIX,example.com
      - IP-CIDR,192.0.2.0/24,no-resolve
rules:
  - RULE-SET,Work,DIRECT
  - MATCH,Proxy
```

## Choosing a format

| `behavior` | Example entry | Purpose |
| --- | --- | --- |
| `domain` | `+.example.com` | Domain patterns |
| `ipcidr` | `192.0.2.0/24` | IP ranges |
| `classical` | `DOMAIN-SUFFIX,example.com` | Routing-rule conditions without an outbound name |

Remote `format: yaml` files wrap entries in `payload:`. `format: text` uses one entry per line. `format: mrs` is binary and supports `domain` or `ipcidr`; do not write it as plain text.

## Remote rule provider

```yaml
rule-providers:
  Work:
    type: http
    url: https://rules.example.com/work.yaml
    interval: 86400
    behavior: domain
    format: yaml
```

The downloaded `work.yaml` contains:

```yaml
payload:
  - '+.example.com'
  - 'intranet.example.net'
```

| Field | How to configure it |
| --- | --- |
| `type` | `http`, `file`, or `inline` |
| `url` | HTTP resource address |
| `path` | Local file or cache path; HTTP providers can omit it. Use separate paths |
| `interval` | Update interval in seconds |
| `proxy` | Existing node or group for downloading |
| `header` | HTTP headers with list values |
| `size-limit` | Download limit in bytes; `0` imposes no limit here |
| `payload` | Embedded rules for `inline` |

Match `behavior` to the resource content. If a downloaded set does not match traffic, check its format, the provider name in `RULE-SET`, and rule ordering.

## Platform behavior and field status

Remote rules may be prepared by the app or loaded after startup. Precompiled rule updates may apply at the next configuration activation. tvOS may clear caches, so resources must remain downloadable.

<ConfigFieldMatrix category="rule-providers" />

Reference: [mihomo](https://wiki.metacubex.one/config/rule-providers/).
