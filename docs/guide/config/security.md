---
title: Configuration security boundary
description: Identify sensitive credentials, remote resources, local listeners, controllers, certificates, and high-risk fields in Clash and Hako configurations.
---

# Configuration and access protection

## What should I hide before sharing?

Remove credentials in subscription URLs, passwords, tokens, UUIDs, private keys,
controller secrets, and personal details in logs. Public keys and public CA
certificates are normally distributed openly, though they may still reveal
services or identities you use.

## Services have separate access controls

Normal connections do not require local listeners or an external controller.
When needed, start with a loopback address and expose only the required scope.

| Setting | Protection scope |
| --- | --- |
| `authentication` | Applicable local proxy listeners, not a universal service password |
| `allow-lan` | Requires app sharing permission; does not control DNS or controllers globally |
| Controller `secret` | Authenticated controller APIs; an empty value requires no password |
| CORS | Browser-origin restrictions, not authentication |
| `dns.listen` | Independent DNS listener; does not use the proxy password above |
| `external-doh-server` | Not protected by controller `secret` |

Static dashboard pages are also outside the controller authentication group;
APIs authenticate separately. The controller supports some runtime changes and
UI updates, but not desktop APIs for replacing the whole configuration, restarting,
or replacing the core. Debug logging also enables controller-authenticated
debugging endpoints.

## Certificates and files

`skip-cert-verify: true` skips server certificate verification; keep verification
on for normal use. `tls.custom-certifactes` adds outbound trust certificates as
certificate content, not paths. Add only certificates you trust. Other top-level
TLS settings primarily configure the external TLS controller.

File access depends on the system sandbox and each feature's path checks. File
providers have an additional directory check; other settings do not necessarily
share it. tvOS may clear caches, so keep reliable copies of configurations and keys.

<ConfigFieldMatrix category="security" />
