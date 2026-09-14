---
title: Routing rules
---

# Routing rules

A rule contains a type, a condition, and an outbound. Define a `Proxy` node or group before using this example. It proxies `example.com` and subdomains, sends specified LAN ranges direct, rejects other UDP port 443 traffic, then sends the rest direct.

```yaml
rules:
  - DOMAIN-SUFFIX,example.com,Proxy
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - AND,((NETWORK,UDP),(DST-PORT,443)),REJECT
  - MATCH,DIRECT
```

## Ordering and outbounds

Rules run from top to bottom, so the domain rule precedes the UDP 443 rule. Put specific conditions first and `MATCH` last. Use a node, group, `DIRECT`, or `REJECT` as the outbound. To proxy remaining traffic, change the final rule to `MATCH,Proxy`.

## Common conditions

| Type | Example condition | Matches |
| --- | --- | --- |
| `DOMAIN` | `www.example.com` | Exact domain |
| `DOMAIN-SUFFIX` | `example.com` | Domain and subdomains |
| `DOMAIN-KEYWORD` | `example` | Text within a domain |
| `DOMAIN-WILDCARD` | `*.example.com` | `*` / `?` wildcard pattern |
| `DOMAIN-REGEX` | `^api[0-9]+\.example\.com$` | Regular expression |
| `IP-CIDR` / `IP-CIDR6` | `192.0.2.0/24` / `2001:db8::/32` | Destination IP ranges |
| `GEOIP` / `IP-ASN` | `CN` / `13335` | IP region or autonomous system; requires data |
| `GEOSITE` | `category-ads-all` | Available domain dataset category |
| `DST-PORT` / `SRC-PORT` | `443` / `10000-20000` | Destination or source ports |
| `NETWORK` | `TCP` / `UDP` | Transport type |
| `RULE-SET` | `Work` | Reference a [rule provider](./rule-providers) |
| `SUB-RULE` | `(NETWORK,UDP),UDP-Traffic` | Enter [sub-rules](./sub-rules) |

Append `no-resolve` to a destination-IP rule to avoid resolving a domain solely for that rule. Already available IP information can still match; this does not disable DNS.

## Combined conditions and source metadata

`AND` requires all conditions, `OR` any condition, and `NOT` inverts one. Put the outbound after the nested conditions, as in `AND,((NETWORK,UDP),(DST-PORT,443)),REJECT`.

`SRC-IP-CIDR`, `SRC-GEOIP`, and `SRC-IP-ASN` match source addresses. `IN-NAME`, `IN-TYPE`, `IN-PORT`, and `IN-USER` match inbound metadata, whose availability depends on the actual entry point. They do not identify an app. See process-routing platform differences below.

## Process routing

**macOS supports process name, process path, and UID routing**, although process
information may be unavailable for some connections.

iOS/iPadOS and tvOS cannot reliably route by these process identities. Use destination
domains, IPs, ports, or network types instead. Process regex or wildcard rules can
still match empty identities; `.*` or `*` does not prove an app was identified.
Unsupported UID rules are removed on these platforms; a logical rule containing
a UID condition may also be removed in full.

App signatures and Team IDs are unavailable for rule matching here.

See [rule providers](./rule-providers) for rule resources and [sub-rules](./sub-rules) for named rule groups.

<ConfigFieldMatrix category="rules" />

Reference: [mihomo](https://wiki.metacubex.one/config/rules/).
