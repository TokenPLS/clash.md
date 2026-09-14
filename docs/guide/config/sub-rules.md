---
title: Sub-rules
---

# Sub-rules

Sub-rules name a rule list that runs when a condition matches. This example sends UDP traffic to `UDP-Traffic`: port 443 is rejected and other UDP traffic goes direct. Other traffic uses `Proxy`, which must be a defined node or group.

```yaml
rules:
  - SUB-RULE,(NETWORK,UDP),UDP-Traffic
  - MATCH,Proxy
sub-rules:
  UDP-Traffic:
    - DST-PORT,443,REJECT
    - MATCH,DIRECT
```

Use `SUB-RULE,(condition),sub-rule-name`, including the parentheses. The name must match a key under `sub-rules`. Rules inside the list run in order; add `MATCH` to handle remaining traffic explicitly. Avoid circular sub-rule references.

## Platform behavior and field status

Process-identity limits are the same as for [routing rules](./rules); avoid relying on process identity to identify apps on iOS/tvOS.

<ConfigFieldMatrix category="sub-rules" />

Reference: [mihomo](https://wiki.metacubex.one/config/sub-rule/).
