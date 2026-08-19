---
title: Clash configuration best practices
description: "A simple Hako and mihomo YAML best-practice guide: begin with a trusted Profile and keep configuration minimal, inspectable, and maintainable."
keywords: [Clash best configuration, mihomo YAML template, Hako Profile, Clash configuration template]
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: Build a minimal, maintainable Clash configuration
  description: Start with a trusted Profile, keep Rule mode, verify behavior, and protect credentials.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Choose a trusted Profile
      text: Add a Profile URL or mihomo YAML that you chose and trust.
    - "@type": HowToStep
      position: 2
      name: Keep Rule mode
      text: Use policy groups for routine route selection.
    - "@type": HowToStep
      position: 3
      name: Verify behavior
      text: Check DNS behavior, rule matches, and the actual exit route.
    - "@type": HowToStep
      position: 4
      name: Protect secrets
      text: Back up before updates and redact Profile URLs, credentials, keys, and logs before sharing.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/config/best-practice
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/config/best-practice
---

# Configuration best practices

You do not need to master every configuration field before using Clash with
confidence. Begin with a trusted configuration that works, then adjust it as
your needs become clear. A good configuration is one where every change has a
reason to exist.

## Begin with a trusted configuration

If you already have a Profile URL or mihomo YAML, this is a reliable starting
path:

1. Add the configuration you chose and trust.
2. Use Rule mode and let its policy groups handle routine route selection.
3. After the first connection, check that DNS, rule matches, and the actual
   exit route meet your expectations.
4. Keep a backup before changes or updates, and redact Profile URLs,
   credentials, keys, and logs before asking for public help.

If your Profile already includes outbounds, policy groups, and rules, it rarely
needs an unknown “optimization template” layered on top. When you use a single
source, adding its complete Profile directly in Clash is the simplest path.

When you maintain your own rules or combine several outbound sources under one
policy, use the Provider structure below.

## A template built to remain maintainable

```yaml
# General
mode: rule
log-level: warning
ipv6: true
unified-delay: true
tcp-concurrent: true

# Remember the selected route. File-backed tvOS state may be cleared.
profile:
  store-selected: true
  store-fake-ip: true

# Hako keeps DNS enabled inside Apple Packet Tunnel.
dns:
  enable: true
  ipv6: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  use-hosts: true
  fake-ip-filter:
    - "+.lan"
    - "+.local"

# Hako accepts a standard Proxy Provider or a complete mihomo Profile with
# top-level proxies. It validates and extracts the proxy collection, then
# atomically materializes it inside the App's private directory.
proxy-providers:
  provider-a:
    type: http
    url: "https://example.com/profile-a.yaml"
    path: ./providers/provider-a.yaml
    interval: 21600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 600
      lazy: true
    override:
      additional-prefix: "[A] "

  provider-b:
    type: http
    url: "https://example.com/profile-b.yaml"
    path: ./providers/provider-b.yaml
    interval: 21600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 600
      lazy: true
    override:
      additional-prefix: "[B] "

  provider-c:
    type: http
    url: "https://example.com/profile-c.yaml"
    path: ./providers/provider-c.yaml
    interval: 21600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 600
      lazy: true
    override:
      additional-prefix: "[C] "

proxy-groups:
  # Daily entry: choose a node manually or hand selection to AUTO.
  - name: PROXY
    type: select
    proxies:
      - AUTO
      - DIRECT
    use:
      - provider-a
      - provider-b
      - provider-c

  # Automatically select by health-check result.
  - name: AUTO
    type: url-test
    use:
      - provider-a
      - provider-b
      - provider-c
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50

rules:
  # Keep private networks direct and send everything else to PROXY.
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR6,fc00::/7,DIRECT,no-resolve
  - MATCH,PROXY
```

## Adapt it deliberately

- Replace the three examples with Provider or complete mihomo Profile URLs you
  chose and trust. If you need fewer sources, remove the extra Providers and
  their names from both `use` lists.
- Give every Provider a unique name, `path`, and prefix. Prefixes keep identical
  node names distinguishable. During activation, Hako rewrites each relative
  `path` to an absolute file path inside the App's private directory.
- `lazy: true` triggers Provider health checks on demand; it does not mean every
  node is tested immediately after import. Keep the source type as `http`.
  The `file` form is Hako's internal result after download, validation, and
  atomic materialization.
- Health checks create real requests. Replace the example with a small file or
  `generate_204` endpoint that is reliably reachable through your nodes.
- Add custom DNS only when you need it. A resolver can observe DNS queries, so
  choose one you trust and can reach on the current network.
- Automatic selection can use `url-test`, `fallback`, or `load-balance`.
  The current upstream no longer supports the `relay` group type.
- `warning` is suitable for daily logs; switch temporarily to `info` while
  diagnosing a problem.
- Do not copy `allow-lan`, local ports, listeners, external controllers, or
  certificate-verification bypasses without understanding their attack surface.

## Why TUN and controllers are absent

Hako runs inside Apple Network Extension. The client manages virtual
interfaces, routes, DNS hijacking, provider paths, and resource caches for the
current platform. The template therefore does not preconfigure mixed ports,
`allow-lan`, an external controller, a TUN device name, strict process mode, or
custom geodata download URLs.

macOS can expose process name, path, and UID for process routing. iOS and tvOS
do not pretend that identity metadata unavailable from the system exists.

## Check before saving

- YAML parses, and outbound names exactly match group and rule references.
- A final rule closes the policy, such as `MATCH,PROXY`.
- No real credentials appear in a public repository, screenshot, or issue.
- iOS and tvOS do not depend on process rules; use macOS for process routing.

When you need more, continue to the [complete field reference](/guide/config/).
