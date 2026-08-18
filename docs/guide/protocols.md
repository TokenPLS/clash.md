---
title: Supported proxy protocols in Clash
description: The complete list of 23 outbound protocol families supported by Clash on Apple platforms, including Shadowsocks, VMess, VLESS, Trojan, Hysteria2, TUIC, WireGuard and OpenVPN.
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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which proxy protocols does Clash support?","acceptedAnswer":{"@type":"Answer","text":"Clash supports 23 configurable proxy protocol families: HTTP, SOCKS, Shadowsocks, ShadowsocksR, Snell, VMess, VLESS, Trojan, AnyTLS, Mieru, Sudoku, Hysteria, Hysteria2, TUIC, ShadowQUIC, GOST Relay, WireGuard, Tailscale, ZeroTier, SSH, MASQUE, TrustTunnel and OpenVPN. Hako 1.19.30 recognizes 27 outbound types in total; DIRECT, DNS, REJECT and REMATCH are routing or control outbounds rather than server protocols."}},{"@type":"Question","name":"How do I use ss:// and other share links with Clash?","acceptedAnswer":{"@type":"Answer","text":"Convert standalone share links or Base64 node lists to mihomo YAML, or enter the server, port, credentials and protocol parameters in the node editor. The Profile importer accepts HTTPS profile URLs and complete mihomo YAML."}},{"@type":"Question","name":"How do I move a configuration from another app?","acceptedAnswer":{"@type":"Answer","text":"Prefer a provider profile URL that returns mihomo YAML. Nodes from sing-box, Surge, or Quantumult X can also be recreated in Clash from their protocol parameters."}},{"@type":"Question","name":"What do I need to start using Clash?","acceptedAnswer":{"@type":"Answer","text":"Bring a mihomo configuration or HTTPS profile URL that you choose and trust, then import it into Clash."}}]}'
---

# Supported proxy protocols in Clash

Clash supports **23 outbound protocol families** across Apple platforms. Configure
them through mihomo YAML, an HTTPS profile URL that returns mihomo YAML, or the
node editor.

Hako 1.19.30 recognizes 27 outbound types in total. This page lists the 23
configurable proxy protocol families; `DIRECT`, `DNS`, `REJECT`, and `REMATCH`
are routing or control outbounds rather than server protocols.

## Complete protocol list

| Protocol | Available import paths |
| --- | --- |
| HTTP | mihomo YAML · profile URL · manual node |
| SOCKS | mihomo YAML · profile URL · manual node |
| Shadowsocks | mihomo YAML · compatible profile URL · manual node |
| ShadowsocksR | mihomo YAML · compatible profile URL · manual node |
| Snell | mihomo YAML · profile URL · manual node |
| VMess | mihomo YAML · compatible profile URL · manual node |
| VLESS | mihomo YAML · compatible profile URL · manual node |
| Trojan | mihomo YAML · compatible profile URL · manual node |
| AnyTLS | mihomo YAML · compatible profile URL · manual node |
| Mieru | mihomo YAML · profile URL · manual node |
| Sudoku | mihomo YAML · profile URL · manual node |
| Hysteria | mihomo YAML · profile URL · manual node |
| Hysteria2 | mihomo YAML · compatible profile URL · manual node |
| TUIC | mihomo YAML · compatible profile URL · manual node |
| ShadowQUIC | mihomo YAML · profile URL · manual node |
| GOST Relay | mihomo YAML · profile URL · manual node |
| WireGuard | mihomo YAML · profile URL · manual node |
| Tailscale | mihomo YAML · manual node |
| ZeroTier | mihomo YAML · manual node |
| SSH | mihomo YAML · profile URL · manual node |
| MASQUE | mihomo YAML · profile URL · manual node |
| TrustTunnel | mihomo YAML · profile URL · manual node |
| OpenVPN | mihomo YAML · profile URL · manual node |

## Configuration paths

Clash accepts these Profile sources:

- an HTTPS profile URL whose response is valid mihomo YAML;
- a `.yaml` or `.yml` configuration file;
- complete mihomo YAML from the clipboard;
- a QR code containing an HTTPS profile URL.

For standalone node links such as `ss://`, `ssr://`, and `vmess://`, or a
Base64 node list, convert the source to mihomo YAML or recreate the node from
its server, port, credentials, and protocol parameters in the node editor.

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

Yes. They are available as outbound types. Their credentials, addresses,
routes and other required fields must be configured correctly.

### Does Clash support Hysteria2, TUIC and AnyTLS?

Yes. All three are supported through mihomo YAML, compatible profile URLs that
return mihomo YAML, or manual node entry.

### Does Clash support Snell for Surge servers?

Yes. Configure a compatible Snell server in Clash, then recreate its policy
groups and rules in mihomo YAML.

### Are these protocols available on every supported Apple platform?

Yes. Clash uses the same Hako data plane on iPhone, iPad, Mac, and Apple TV.
