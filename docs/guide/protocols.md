---
title: Supported proxy protocols in Clash for iPhone and iPad
description: The complete list of 21 outbound protocol families supported by Clash, including Shadowsocks, VMess, VLESS, Trojan, Hysteria2, TUIC, WireGuard and OpenVPN.
head:
  - - meta
    - name: keywords
      content: Clash supported protocols,Clash iOS Shadowsocks,VMess,VLESS,Trojan,Hysteria2,TUIC,WireGuard,OpenVPN,AnyTLS,Snell
  - - link
    - rel: canonical
      href: https://clash.md/guide/protocols
  - - link
    - rel: alternate
      hreflang: zh-CN
      href: https://clash.md/zh/guide/protocols
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which proxy protocols does Clash support?","acceptedAnswer":{"@type":"Answer","text":"Clash supports 21 outbound protocol families: HTTP, SOCKS, Shadowsocks, ShadowsocksR, Snell, VMess, VLESS, Trojan, AnyTLS, Mieru, Sudoku, Hysteria, Hysteria2, TUIC, ShadowQUIC, WireGuard, Tailscale, SSH, MASQUE, TrustTunnel and OpenVPN."}},{"@type":"Question","name":"How do I use ss:// and other share links with Clash?","acceptedAnswer":{"@type":"Answer","text":"Convert standalone share links or Base64 node lists to mihomo YAML, or enter the server, port, credentials and protocol parameters in the node editor. The Profile importer accepts HTTPS subscription URLs and complete mihomo YAML."}},{"@type":"Question","name":"How do I move a configuration from another app?","acceptedAnswer":{"@type":"Answer","text":"Prefer a provider-supplied mihomo YAML subscription. Nodes from sing-box, Surge, or Quantumult X can also be recreated in Clash from their protocol parameters."}},{"@type":"Question","name":"What do I need to start using Clash?","acceptedAnswer":{"@type":"Answer","text":"Bring a server configuration or HTTPS subscription that you choose and trust, then import it into Clash."}}]}'
---

# Supported proxy protocols in Clash

Clash for iPhone and iPad supports **21 outbound protocol families**. Configure
them through mihomo YAML, an HTTPS subscription that returns mihomo YAML, or the
node editor.

## Complete protocol list

| Protocol | Available import paths |
| --- | --- |
| HTTP | mihomo YAML · subscription · manual node |
| SOCKS | mihomo YAML · subscription · manual node |
| Shadowsocks | mihomo YAML · compatible subscription · manual node |
| ShadowsocksR | mihomo YAML · compatible subscription · manual node |
| Snell | mihomo YAML · subscription · manual node |
| VMess | mihomo YAML · compatible subscription · manual node |
| VLESS | mihomo YAML · compatible subscription · manual node |
| Trojan | mihomo YAML · compatible subscription · manual node |
| AnyTLS | mihomo YAML · compatible subscription · manual node |
| Mieru | mihomo YAML · subscription · manual node |
| Sudoku | mihomo YAML · subscription · manual node |
| Hysteria | mihomo YAML · subscription · manual node |
| Hysteria2 | mihomo YAML · compatible subscription · manual node |
| TUIC | mihomo YAML · compatible subscription · manual node |
| ShadowQUIC | mihomo YAML · subscription · manual node |
| WireGuard | mihomo YAML · subscription · manual node |
| Tailscale | mihomo YAML · manual node |
| SSH | mihomo YAML · subscription · manual node |
| MASQUE | mihomo YAML · subscription · manual node |
| TrustTunnel | mihomo YAML · subscription · manual node |
| OpenVPN | mihomo YAML · subscription · manual node |

## Configuration paths

The current iOS client accepts these Profile sources:

- an HTTPS subscription URL whose response is valid mihomo YAML;
- a `.yaml` or `.yml` configuration file;
- complete mihomo YAML from the clipboard;
- a QR code containing an HTTPS subscription URL.

For standalone node links such as `ss://`, `ssr://`, and `vmess://`, or a
Base64 node list, convert the source to mihomo YAML or recreate the node from
its server, port, credentials, and protocol parameters in the node editor.

## Move nodes from another app

Clash uses mihomo YAML as its configuration format. When moving from sing-box
JSON, a Surge profile, or Quantumult X, prefer a mihomo subscription or recreate
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

Yes. ShadowsocksR is available through mihomo YAML, a compatible subscription
that returns mihomo YAML, or by entering the parameters from an `ssr://` link
in the node editor.

### Does Clash support WireGuard, OpenVPN and Tailscale?

Yes. They are available as outbound types. Their credentials, addresses,
routes and other required fields must be configured correctly.

### Does Clash support Hysteria2, TUIC and AnyTLS?

Yes. All three are supported through mihomo YAML, compatible subscriptions that
return mihomo YAML, or manual node entry.

### Does Clash support Snell for Surge servers?

Yes. Configure a compatible Snell server in Clash, then recreate its policy
groups and rules in mihomo YAML.

### Are these protocols available on both iPhone and iPad?

Yes. Clash is a universal iOS/iPadOS app and uses the same Hako data plane on
both device families.
