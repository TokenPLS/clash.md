---
title: Proxy providers
---

# Proxy providers

A proxy provider loads a collection of nodes. Replace `url` with a subscription endpoint returning node YAML. The group's `use` references the provider name.

```yaml
proxy-providers:
  Subscription:
    type: http
    url: https://subscription.example.com/nodes.yaml
    interval: 3600
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300
      timeout: 5000
    override:
      additional-prefix: "Sub-"
proxy-groups:
  - name: Proxy
    type: select
    use: [Subscription]
rules:
  - MATCH,Proxy
```

## Provider fields

| Field | How to configure it |
| --- | --- |
| Provider name | `Subscription` in the example; must be unique |
| `type` | `http` downloads, `file` reads a local resource, `inline` embeds nodes |
| `url` | Download address for an HTTP provider |
| `path` | Local resource or cache path; do not share paths between providers. HTTP providers can omit this for client management |
| `interval` | Resource update interval in seconds, separate from health checks |
| `proxy` | Node or group used for downloading; avoid depending on this provider before it has loaded |
| `header` | Request headers with list values, for example `Authorization: ["Bearer YOUR_TOKEN"]` |
| `filter` / `exclude-filter` | Regular expressions for including or excluding node names |
| `override` | Replace imported node options; `additional-prefix` and `additional-suffix` help distinguish names |
| `health-check` | `enable`, `url`, `interval` in seconds, `timeout` in milliseconds, and `lazy` for on-demand checks |

## Downloaded file format

The downloaded YAML contains a `proxies` list. Each entry follows the [outbound proxy](./proxies) format:

```yaml
proxies:
  - name: Node-A
    type: trojan
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
```

For `type: inline`, omit `url` and put the node list under the provider's `payload`. For `file`, set `path` to a prepared resource accessible to the app.

## Platform behavior and field status

Remote resources may be prepared by the app or loaded by the core after connection. Check provider status if nodes are not ready. tvOS may clear caches, so remote resources must remain downloadable.

<ConfigFieldMatrix category="proxy-providers" />

Reference: [mihomo](https://wiki.metacubex.one/config/proxy-providers/).
