---
title: Rules and traffic sniffing
description: Hako mihomo rules, sub-rules, process identity, and sniffer configuration, including Apple-platform differences.
---

# Rules and traffic sniffing

Domain, IP, port, network, logical, provider, sub-rule, and final `MATCH` rules
are processed by the shared Hako core. Sniffing can recover a domain name;
process name, path, and UID are available for rule matching only on macOS.

## Identity rules by platform

| Rule metadata | iOS / iPadOS | macOS | tvOS |
| --- | --- | --- | --- |
| Process name and path | Does not match | Supported | Does not match |
| UID | Unsupported | Supported | Unsupported |
| App signing or team ID | Unsupported | Unsupported | Unsupported |
| Per-App VPN / MDM | Not configured by YAML | Not configured by YAML | Not configured by YAML |

iOS and tvOS can parse `PROCESS-*` rules, but lack the system metadata required
to match them, so these rules do not match there. Use domain, IP, port, or
network-type rules instead.

<ConfigFieldMatrix category="rules" />
<ConfigFieldMatrix category="sniffer" />
