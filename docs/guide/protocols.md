---
title: Supported proxy protocols in Clash
description: The 23 proxy and network outbound types supported by Hako 1.19.30, with configuration paths for iOS, macOS, and tvOS.
head:
  - - link
    - rel: canonical
      href: https://clash.md/guide/protocols
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/protocols
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which proxy protocols does Clash support?","acceptedAnswer":{"@type":"Answer","text":"Hako 1.19.30 supports 23 proxy and network outbound types plus the DIRECT, DNS, REJECT, and REMATCH routing or control outbounds."}},{"@type":"Question","name":"How do I use ss:// and other share links with Clash?","acceptedAnswer":{"@type":"Answer","text":"Convert standalone share links or Base64 node lists to mihomo YAML, or enter the server, port, credentials, and protocol parameters in the node editor on iPhone, iPad, and Mac."}},{"@type":"Question","name":"How do I move a configuration from another app?","acceptedAnswer":{"@type":"Answer","text":"Prefer a Profile URL that returns mihomo YAML. Nodes from sing-box, Surge, or Quantumult X can also be recreated in Clash from their protocol parameters."}},{"@type":"Question","name":"What do I need to start using Clash?","acceptedAnswer":{"@type":"Answer","text":"Bring a mihomo configuration or HTTPS Profile URL that you choose and trust, then add it to Clash."}}]}'
---

# Supported proxy protocols in Clash

Hako supports **23 proxy and network outbound types** across Apple platforms.
All can be defined in mihomo YAML or supplied through an HTTPS Profile URL that
returns mihomo YAML.

Hako 1.19.30 recognizes 27 outbound types in total. This page lists the 23
configurable proxy protocol families; `DIRECT`, `DNS`, `REJECT`, and `REMATCH`
are routing or control outbounds rather than server protocols.

## Complete protocol list

- HTTP · SOCKS · Shadowsocks · ShadowsocksR · Snell
- VMess · VLESS · Trojan · AnyTLS · Mieru
- Sudoku · Hysteria · Hysteria2 · TUIC · ShadowQUIC
- GOST Relay · WireGuard · Tailscale · ZeroTier · SSH
- MASQUE · TrustTunnel · OpenVPN

## Configuration paths

All three platforms accept an HTTPS Profile URL whose response is valid mihomo
YAML. Other entry points are platform-specific:

- iPhone and iPad: YAML files, the share sheet, clipboard content, QR codes
  containing a Profile URL, and the node editor;
- Mac: YAML files, clipboard content, blank configurations, and the node editor;
- Apple TV: Profile URLs and the nodes contained in those Profiles.

For standalone node links such as `ss://`, `ssr://`, and `vmess://`, or a
Base64 node list, convert the source to mihomo YAML. On iPhone, iPad, and Mac,
you can also recreate the node from its server, port, credentials, and protocol
parameters in the node editor.

## Move nodes from another app

Clash uses mihomo YAML as its configuration format. When moving from sing-box
JSON, a Surge profile, or Quantumult X, prefer a profile URL that returns mihomo YAML or recreate
the node in Clash from its protocol parameters.

For recommended migration paths by app, read the
[compatibility guide](/guide/compatibility).

## Configuration essentials

- Use a server, credentials, and protocol parameters you choose and trust.
- Match TLS, transport, obfuscation, UDP, and authentication options to the
  server.
- Choose a transport and UDP mode supported by the protocol.
- Run latency and live connection tests after saving.

## Frequently asked questions

### Does Clash support ShadowsocksR?

Yes. ShadowsocksR is available through mihomo YAML, a compatible profile URL
that returns mihomo YAML, or by entering the parameters from an `ssr://` link
in the node editor.

### Does Clash support WireGuard, OpenVPN and Tailscale?

They are available as outbound types. Their credentials, addresses, routes,
and other required fields must be configured correctly, and real connectivity
still depends on the server, network, and Apple platform.

### Does Clash support Hysteria2, TUIC and AnyTLS?

Yes. All three are supported through mihomo YAML, compatible profile URLs that
return mihomo YAML, or manual node entry.

### Does Clash support Snell for Surge servers?

Yes. Configure a compatible Snell server in Clash, then recreate its policy
groups and rules in mihomo YAML.
