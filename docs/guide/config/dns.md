---
title: DNS configuration
---

# DNS configuration

DNS settings choose resolvers and determine whether applications receive real or Fake IP addresses. This fragment uses DoH; replace the resolvers with services reachable from your network.

```yaml
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 1.1.1.1
  nameserver:
    - https://cloudflare-dns.com/dns-query
  proxy-server-nameserver:
    - https://cloudflare-dns.com/dns-query
  fake-ip-filter:
    - '+.lan'
    - '+.local'
```

## Resolver roles

| Field | What it resolves | When to use it |
| --- | --- | --- |
| `default-nameserver` | DNS service hostnames | IP-based bootstrap resolver for named DoH/DoT endpoints |
| `nameserver` | Ordinary destinations | Default resolver list |
| `nameserver-policy` | Matching domains | Separate DNS for intranet domains or specific sites |
| `proxy-server-nameserver` | Proxy server hostnames | Prevent DNS/proxy dependency loops, especially with rule-following DNS |
| `proxy-server-nameserver-policy` | Specific proxy hostnames | Requires nonempty `proxy-server-nameserver` |
| `direct-nameserver` | Direct outbound destinations | Separate resolvers for direct connections |
| `direct-nameserver-follow-policy` | Policy use for direct resolution | Only relevant with `direct-nameserver` |
| `fallback` / `fallback-filter` | Conditional alternative answers | Select by domain or primary answer; this is more than retrying after a timeout |

Resolver formats include `1.1.1.1` (UDP), `tcp://1.1.1.1`, `tls://1.1.1.1` (DoT), and `https://cloudflare-dns.com/dns-query` (DoH). Include nonstandard ports in the address. `system` uses system DNS; see Apple behavior below.

## Domain policies, hosts, and resolution modes

```yaml
hosts:
  printer.home.arpa: 192.168.1.20
dns:
  use-hosts: true
  nameserver-policy:
    '+.home.arpa': 192.168.1.1
```

Merge this into your configuration: `hosts` is top-level; put `nameserver-policy` inside the existing `dns` section instead of adding a duplicate section. Replace LAN addresses with your device and resolver addresses.

`enhanced-mode: fake-ip` returns mapped addresses; `redir-host` uses real answers. With `fake-ip-filter-mode: blacklist`, matching domains receive real IPs. With `whitelist`, only matching domains receive Fake IPs. Usually leave the range and TTL unchanged.

## Follow routing rules for DNS

Add `respect-rules: true` inside the existing DNS section and retain an independently reachable `proxy-server-nameserver`. The selected proxy must be able to connect first. Avoid casually combining this with `prefer-h3`.

`cache-algorithm` accepts `lru` or `arc`. `ipv6: false` affects AAAA answers, subject to the app's IP Stack setting.

## Platform behavior and field status

DNS stays enabled while connected. System and DHCP sources prefer resolver addresses captured before connection; unavailable entries are filtered or repaired, and a policy losing every address may return a name error. dns.ipv6 also depends on global IPv6 and the app IP Stack setting.

DNS listen opens an additional TCP/UDP DNS service and is unnecessary for ordinary use. Proxy authentication, allow-lan, and controller secret do not provide uniform protection for it.

<ConfigFieldMatrix category="dns" />

Reference: [mihomo](https://wiki.metacubex.one/config/dns/).
