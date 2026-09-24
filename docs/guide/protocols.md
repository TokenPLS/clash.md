---
title: Supported proxy protocols in Clash
description: The 24 proxy and network outbound types in Hako SDK v1.19.31-hako.1, including macOS-only EasyTier and configuration paths for Apple platforms.
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
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Which proxy protocols does Clash support?","acceptedAnswer":{"@type":"Answer","text":"Hako SDK v1.19.31-hako.1 defines 24 proxy and network outbound types plus DIRECT, DNS, REJECT, and REMATCH. EasyTier is implemented only in the macOS SDK; iOS, iPadOS, and tvOS retain 23 protocol implementations and use a REJECT placeholder for EasyTier."}},{"@type":"Question","name":"How do I use ss:// and other share links with Clash?","acceptedAnswer":{"@type":"Answer","text":"Convert standalone share links or Base64 node lists to mihomo YAML, or enter the server, port, credentials, and protocol parameters in the node editor on iPhone, iPad, and Mac."}},{"@type":"Question","name":"How do I move a configuration from another app?","acceptedAnswer":{"@type":"Answer","text":"Prefer a Profile URL that returns mihomo YAML. Nodes from sing-box, Surge, or Quantumult X can also be recreated in Clash from their protocol parameters."}},{"@type":"Question","name":"What do I need to start using Clash?","acceptedAnswer":{"@type":"Answer","text":"Bring a mihomo configuration or HTTPS Profile URL that you choose and trust, then add it to Clash."}}]}'
---

# Supported proxy protocols in Clash

Hako SDK **v1.19.31-hako.1** defines **24 proxy and network outbound types**.
They use mihomo YAML, supplied directly or through an HTTPS Profile URL.
[EasyTier](/guide/config/outbound/easytier) is the new type and is implemented
only in the macOS SDK. iOS, iPadOS, and tvOS retain 23 implementations;
EasyTier nodes there are REJECT placeholders that refuse connections.

The parser recognizes 28 outbound types in total. This page lists the 24
configurable protocol families; `DIRECT`, `DNS`, `REJECT`, and `REMATCH`
are routing or control outbounds rather than server protocols. A published SDK
does not mean every App Store version already includes it.

## Complete protocol list

- [HTTP](/guide/config/outbound/http) · [SOCKS](/guide/config/outbound/socks5) · [Shadowsocks](/guide/config/outbound/ss) · [ShadowsocksR](/guide/config/outbound/ssr) · [Snell](/guide/config/outbound/snell)
- [VMess](/guide/config/outbound/vmess) · [VLESS](/guide/config/outbound/vless) · [Trojan](/guide/config/outbound/trojan) · [AnyTLS](/guide/config/outbound/anytls) · [Mieru](/guide/config/outbound/mieru)
- [Sudoku](/guide/config/outbound/sudoku) · [Hysteria](/guide/config/outbound/hysteria) · [Hysteria2](/guide/config/outbound/hysteria2) · [TUIC](/guide/config/outbound/tuic) · [ShadowQUIC](/guide/config/outbound/shadowquic)
- [GOST Relay](/guide/config/outbound/gost-relay) · [WireGuard](/guide/config/outbound/wireguard) · [Tailscale](/guide/config/outbound/tailscale) · [ZeroTier](/guide/config/outbound/zerotier) · [SSH](/guide/config/outbound/ssh)
- [EasyTier (macOS)](/guide/config/outbound/easytier) · [MASQUE](/guide/config/outbound/masque) · [TrustTunnel](/guide/config/outbound/trusttunnel) · [OpenVPN](/guide/config/outbound/openvpn)

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

### Can I use EasyTier on iPhone or Apple TV?

No. In SDK v1.19.31-hako.1, EasyTier is included only in the macOS slice.
iOS, iPadOS, and tvOS accept its configuration as a REJECT placeholder and
refuse traffic through it. On Mac, use a client containing this SDK and follow
the [EasyTier guide](/guide/config/outbound/easytier).

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
