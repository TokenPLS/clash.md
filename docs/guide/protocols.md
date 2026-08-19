---
title: Supported proxy protocols in Clash
description: The 23 proxy and network outbound types recognized by Hako 1.19.30, with validation scope and Apple-platform configuration notes.
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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which proxy protocols does Clash recognize?","acceptedAnswer":{"@type":"Answer","text":"Hako 1.19.30 recognizes 23 proxy and network outbound types plus DIRECT, DNS, REJECT and REMATCH. Twenty-two proxy or network types have controlled interoperability coverage; ZeroTier still requires lab validation."}},{"@type":"Question","name":"How do I use ss:// and other share links with Clash?","acceptedAnswer":{"@type":"Answer","text":"Convert standalone share links or Base64 node lists to mihomo YAML, or enter the server, port, credentials and protocol parameters in the node editor. The Profile importer accepts HTTPS profile URLs and complete mihomo YAML."}},{"@type":"Question","name":"How do I move a configuration from another app?","acceptedAnswer":{"@type":"Answer","text":"Prefer a Profile URL that returns mihomo YAML. Nodes from sing-box, Surge, or Quantumult X can also be recreated in Clash from their protocol parameters."}},{"@type":"Question","name":"What do I need to start using Clash?","acceptedAnswer":{"@type":"Answer","text":"Bring a mihomo configuration or HTTPS Profile URL that you choose and trust, then import it into Clash."}}]}'
---

# Supported proxy protocols in Clash

Hako recognizes **23 proxy and network outbound types** across Apple platforms. Configure
them through mihomo YAML, an HTTPS profile URL that returns mihomo YAML, or the
node editor.

Hako 1.19.30 recognizes 27 outbound types in total. This page lists the 23
configurable proxy protocol families; `DIRECT`, `DNS`, `REJECT`, and `REMATCH`
are routing or control outbounds rather than server protocols.

Twenty-two of the 23 proxy and network types pass controlled interoperability
tests. ZeroTier is recognized but still requires lab validation. A shared core
means the configuration vocabulary is the same; it does not replace
protocol-by-protocol, end-to-end validation on every device and network.

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
| ZeroTier | mihomo YAML · manual node · lab validation required |
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

They are available as outbound types. Their credentials, addresses, routes,
and other required fields must be configured correctly, and real connectivity
still depends on the server, network, and Apple platform.

### Does Clash support Hysteria2, TUIC and AnyTLS?

Yes. All three are supported through mihomo YAML, compatible profile URLs that
return mihomo YAML, or manual node entry.

### Does Clash support Snell for Surge servers?

Yes. Configure a compatible Snell server in Clash, then recreate its policy
groups and rules in mihomo YAML.

### Are these protocols identical on every supported Apple platform?

The same Hako core recognizes the same configuration types on iPhone, iPad,
Mac, and Apple TV. End-to-end validation is not identical: 22 proxy or network
types have controlled interoperability coverage, ZeroTier still needs lab
validation, and Hako does not publish a complete per-protocol Mac and Apple TV
device matrix. See the [Apple-platform configuration differences](/guide/config/apple-platforms).
