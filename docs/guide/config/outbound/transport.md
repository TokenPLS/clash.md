---
title: Transports
---

# Transports

Place transport options beside type inside a node. Available transports depend on the proxy protocol; changing a WebSocket service to gRPC locally will not make it work.

| Protocol | Transport values in this reference |
| --- | --- |
| VMess | tcp, ws, http, h2, grpc, mkcp, mekya |
| VLESS | tcp, ws, http, h2, grpc, xhttp |
| Trojan | tcp, ws, grpc |

These are fragments to merge into a node, not complete configurations. Retain its endpoint, authentication, and TLS settings; choose one transport.

## WebSocket

```yaml
network: ws
ws-opts:
  path: /proxy
  headers:
    Host: cdn.example.com
```

Match the server path. Host is an HTTP header, separate from TLS SNI. Add max-early-data and early-data-header-name only with server support. v2ray-http-upgrade selects HTTP Upgrade and is not interchangeable with ordinary WebSocket.

## gRPC

```yaml
network: grpc
grpc-opts:
  grpc-service-name: proxy-service
```

The service name must match. grpc-user-agent sets the client identifier. Adjust connection and stream limits only for a specific need.

## HTTP and HTTP/2

```yaml
network: http
http-opts:
  method: GET
  path: [/proxy]
  headers:
    Host: [proxy.example.com]
```

```yaml
network: h2
h2-opts:
  host: [proxy.example.com]
  path: /proxy
```

The structures differ: HTTP paths and header values are lists; h2 host is a list and path is a string.

## XHTTP for VLESS

```yaml
network: xhttp
alpn: [h2]
xhttp-opts:
  host: proxy.example.com
  path: /proxy
  mode: stream-one
```

Match stream-one, stream-up, or packet-up to the service. ALPN must match the server HTTP version. Retain any service-provided headers, padding, and reuse options under xhttp-opts.

## mKCP and Mekya for VMess

```yaml
network: mkcp
mkcp-opts:
  mtu: 1350
  tti: 50
  uplink-capacity: 5
  downlink-capacity: 20
  congestion: false
```

mKCP mtu is in bytes and tti in milliseconds. Match seed and header to the service.

```yaml
network: mekya
mekya-opts:
  url: https://proxy.example.com/mekya
  max-write-delay: 80
  max-request-size: 96000
  polling-interval-initial: 200
  h2-pool-size: 8
```

Mekya uses the supplied HTTP URL; nested KCP options go under mekya-opts.kcp. Remove unrelated transport options from the node.

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/transport/).
