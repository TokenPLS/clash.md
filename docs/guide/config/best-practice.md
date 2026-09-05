---
title: Clash configuration best practices
description: "A beginner-friendly Clash guide to choosing, importing, and checking the single-provider, dual-provider, and per-service community templates."
keywords: [Clash best configuration, mihomo YAML template, Hako Profile, Clash configuration template]
jsonLd:
  "@context": https://schema.org
  "@type": HowTo
  name: Choose and import a Clash configuration template
  description: Choose a community template, add a trusted subscription URL, import it into Clash, and verify DNS, rule matches, and the actual exit route.
  inLanguage: en-US
  step:
    - "@type": HowToStep
      position: 1
      name: Choose a template
      text: Choose a regional template for one provider, the dual-provider version for two, or the per-service version for independent service routes.
    - "@type": HowToStep
      position: 2
      name: Download and import
      text: Download the YAML file locally, then import it into Clash as a local configuration.
    - "@type": HowToStep
      position: 3
      name: Add the subscription URL
      text: Open Edit Source, find proxy-providers, and paste the subscription URL between the quotation marks for the matching url field.
    - "@type": HowToStep
      position: 4
      name: Save and enable
      text: Save the file, select it as the current configuration, and connect from Home.
    - "@type": HowToStep
      position: 5
      name: Verify behavior
      text: Check DNS and WebRTC behavior, rule matches, and the actual exit route on every network and node you use.
    - "@type": HowToStep
      position: 6
      name: Protect secrets
      text: Back up before updates and redact subscription URLs, credentials, keys, and logs before sharing.
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
needs a second “optimization template” layered on top. When you use a single
source, adding its complete Profile directly in Clash is the simplest path.
Each community template below is a **complete configuration** that consumes
your subscription as a Proxy Provider; do not paste one into another complete
Profile.

When you maintain your own rules or combine several outbound sources under one
policy, use the Provider structure below.

## Choose one of three community templates

All three use the same DNS, ad-blocking, and mainland-China direct-routing
rules. They differ only in the number of subscription sources and how policy
groups are organized. No subscription URL is prefilled.

| Template | Sources | Best for | Download |
| --- | ---: | --- | --- |
| Regional, single provider | 1 | Choosing routes by region, such as the US, Singapore, Hong Kong, Japan, Taiwan, or Europe | <a href="/configs/region-single-provider.yaml" download>Download YAML</a> |
| Regional, dual provider | 2 | Combining a primary and backup provider with regional failover between them | <a href="/configs/region-dual-provider.yaml" download>Download YAML</a> |
| Per-service, single provider | 1 | Giving YouTube, Netflix, GPT, Telegram, and other services independent route choices | <a href="/configs/service-single-provider.yaml" download>Download YAML</a> |

Start with the **regional, single-provider** template if YAML is new to you.
Use the dual-provider version only when you need two subscriptions, and the
per-service version only when different services really need different routes.
The comments inside the downloadable files are in Chinese.

::: warning Community-maintained configurations
These files were shared publicly by community members. Clash does not endorse
the third-party DNS services, icons, rule sets, or subscription providers they
reference. Remote content can change, and behavior varies by provider,
self-hosted node, network, and operating system. Back up your current Profile
and add only a subscription URL you chose and trust.
:::

The files target general mihomo clients, so they retain cross-platform fields
such as `mixed-port`, `tun`, and `external-controller`. In Clash, the system
tunnel, provider paths, and control channel remain constrained by the App and
Apple platform. Beginners do not need to change these fields. Do not enable
`allow-lan` or expose a controller to the LAN; see the
[security boundaries](/guide/config/security).

## First use, step by step

1. Download the required `.yaml` file from the table. Do not copy fragments
   from a browser preview.
2. Import the local file on Clash's configuration page.
3. Select the exclamation-mark button beside the file, then choose Edit Source.
4. Find `proxy-providers`. A single-provider file needs only `Primary-VPS`;
   the dual-provider file also needs `Backup-VPS`. Paste the URL between the
   quotation marks after `url`:

   ```yaml
   proxy-providers:
     Primary-VPS:
       type: http
       url: "https://example.com/your-private-subscription"
   ```

   Keep the quotation marks. Subscription URLs often contain `?`, `&`, or `#`,
   and quoting prevents YAML from treating part of the URL as a comment. Do not
   use the example URL above.
5. Save, return to the configuration list, select the edited file, and connect
   from Home.
6. First activation downloads nodes, rule sets, and icons, so it can take longer
   than a small Profile. If a download fails, check Provider and rule-set status
   before repeatedly trying to connect.
7. Confirm that policy-group references loaded, then check DNS, rule matches,
   and the real exit route.

A subscription URL commonly contains a token that can consume account traffic.
Treat it like a password. Remove the whole URL before sharing a screenshot,
posting to a group, filing an issue, or sending the configuration to anyone.

## How the templates route traffic

Rules match once, from top to bottom. In simplified form:

1. Local and private-network addresses go direct.
2. Apple Push, GitHub, and explicitly listed overseas services follow their
   template policies.
3. Advertising and privacy-list matches are rejected.
4. Mainland-China traffic matched by `ChinaMax`, `GEOSITE,CN`, or `GEOIP,CN`
   goes direct.
5. Anything still unmatched reaches `MATCH,PROXY-Gate` and uses the proxy.

The goal is therefore to keep mainland-China traffic direct **where the rules
can identify it**, not to guarantee that every mainland request always stays
direct. Rule lists change, shared CDNs are ambiguous, and a new mainland domain
can reach the final proxy fallback before an upstream list learns about it.

Each YAML contains only dozens to a few hundred entry rules. Most coverage comes
from 11 remote Rule Providers. The community publisher estimates roughly
200,000 expanded rules, but the live count changes as upstream lists update and
some sets overlap. More rules do not automatically mean more accurate routing;
use Clash's actual match records as the source of truth.

## Choosing policy groups

- `PROXY-Gate` is the default exit for traffic without a dedicated service
  group. Selecting `DIRECT` makes that unmatched traffic direct; beginners
  should not use it as a generic “fix the network” switch.
- Regional Auto groups such as `US-Auto` and `SG-Auto` regularly test nodes
  whose names match that region and choose one automatically. They do not pin a
  specific server. A node whose name lacks a recognized region keyword will not
  appear in that Auto group.
- `Global-Manual`, or `Primary-Manual` and `Backup-Manual`, pins a node manually.
  The dual-provider regional Fallback groups compare each provider's regional
  Auto result and fail over between the two sources.
- YouTube, Netflix, GPT, Telegram, and the other groups in the per-service
  template are independent. Choosing `GPT → US-Auto` and
  `Netflix → SG-Auto` means changing `PROXY-Gate` does not override them. To pin
  one service to a single node, choose that node under
  `PROXY-Gate → Global-Manual`, then set the service to `PROXY-Gate`.

## DNS, WebRTC, and self-hosted VPS nodes

The community publisher reports no observed DNS or WebRTC leak, and working
policy-group references, across tests with eight provider URLs. That is a result
from particular devices, networks, nodes, and test methods—**not a security
guarantee for every environment**. Retest after changing a network, node,
browser, or DNS setting.

Take extra care with a self-hosted VPS. When the proxy server uses a hostname,
the DNS path that resolves it can depend on the local network,
`proxy-server-nameserver`, and `proxy-server-nameserver-policy`. This can make
the observed resolver or answer change unexpectedly. If that happens:

1. Stop using the community template and verify that the VPS's original,
   simpler Profile is stable.
2. Do not add more public resolvers at random. Identify which resolver handles
   the server hostname, then add only a precise policy that matches your trust
   boundary.
3. Test Wi-Fi and cellular separately, and recheck DNS, WebRTC, and the actual
   exit after switching nodes.
4. If the DNS path remains unexplained, use the original Profile or the minimal
   template below rather than carrying sensitive traffic with these files.

The templates also contact third-party DNS services, download rule sets from
GitHub, and fetch policy-group icons from CDNs. Those endpoints and maintainers
become part of your trust boundary. Read the source before importing when you
need the exact list.

## Prefer a minimal template when you maintain it yourself

If you do not need regional groups, per-service routing, or roughly 200,000
remote rules, the smaller template below is easier to inspect, troubleshoot,
and maintain over time.

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

## Why TUN and controllers are absent from the minimal template

Hako runs inside Apple Network Extension. The client manages virtual
interfaces, routes, DNS hijacking, provider paths, and resource caches for the
current platform. The minimal template therefore does not preconfigure mixed ports,
`allow-lan`, an external controller, a TUN device name, strict process mode, or
custom geodata download URLs.

Use macOS when routing by process name, path, or UID. On iOS and tvOS, use
domain, IP, port, or network-type rules instead.

## Check before saving

- YAML parses, and outbound names exactly match group and rule references.
- A final rule closes the policy, such as `MATCH,PROXY`.
- No real credentials appear in a public repository, screenshot, or issue.
- iOS and tvOS do not depend on process rules; use macOS for process routing.

When you need more, continue to the [complete field reference](/guide/config/).
