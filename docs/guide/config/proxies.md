---
title: Proxies, policy groups, and providers
description: Hako proxy outbound, policy-group, Proxy Provider, and Rule Provider configuration across iOS, macOS, and tvOS.
---

# Proxies, policy groups, and providers

Hako 1.19.30 recognizes 23 proxy or network outbounds plus the `DIRECT`, `DNS`,
`REJECT`, and `REMATCH` routing or control outbounds. See the
[protocol reference](/guide/protocols) for validation scope.

## Policy groups

Use `select`, `url-test`, `fallback`, or `load-balance`. Upstream removed the
`relay` group type, so new configurations must not depend on it. Health-check
URLs create real network requests; choose an endpoint that fits your privacy
and availability requirements.

## Providers

- Inline content is read directly by the core.
- File providers are restricted to product-managed safe paths.
- Hako downloads and validates HTTP providers, writes them atomically, and then
  gives the managed file to the core.
- tvOS can clear caches, so remote provider content must be rebuildable.

<ConfigFieldMatrix category="proxies" />
<ConfigFieldMatrix category="proxy-groups" />
<ConfigFieldMatrix category="providers" />
