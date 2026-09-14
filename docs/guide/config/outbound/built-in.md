---
title: Built-in outbounds
---

# Built-in outbounds

Rules can use DIRECT for direct access and REJECT to refuse connections without server credentials.

```yaml
rules:
  - DOMAIN-SUFFIX,blocked.example,REJECT
  - MATCH,DIRECT
```

Define a named node for extra settings. Type values are lowercase:

```yaml
proxies:
  - name: Direct-IPv4
    type: direct
    ip-version: ipv4
  - name: Internal-DNS
    type: dns
```

Direct connects to the destination itself. DNS sends DNS requests to the internal resolver; it cannot carry ordinary website traffic. Configure resolvers under [DNS](../dns).

## Match rules again

Rematch can attach a name and restart matching, or enter a named sub-rule through target-sub-rule. This example marks example.com traffic and then routes it directly:

```yaml
proxies:
  - name: Mark-Work
    type: rematch
    target-rematch-name: work
rules:
  - REMATCH-NAME,work,DIRECT
  - DOMAIN-SUFFIX,example.com,Mark-Work
  - MATCH,DIRECT
```

Handle the mark before the triggering rule to prevent loops. Ordinary routing can use direct rules without a rematch layer.

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/direct/).
