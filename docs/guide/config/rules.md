---
title: Rules and traffic sniffing
description: Hako mihomo rules, sub-rules, process identity, and sniffer configuration, including Apple-platform differences.
---

# Rules and traffic sniffing

Domain, IP, port, network, logical, provider, sub-rule, and final `MATCH` rules
are processed by the shared Hako core. Sniffing can recover a domain name, but
it cannot create App or process identity that Apple did not provide.

## Identity-rule boundary

| Rule metadata | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| Process name and path | Does not match | Supported | Does not match |
| UID | Unsupported | Supported | Unsupported |
| App signing or team ID | Unsupported | Unsupported | Unsupported |
| Per-App VPN / MDM | Not configured by YAML | Not configured by YAML | Not configured by YAML |

iOS and tvOS can parse `PROCESS-*` rules, but lack the system metadata required
to match them. Import success is not evidence that the rule will match.

<ConfigFieldMatrix category="rules" />
<ConfigFieldMatrix category="sniffer" />
