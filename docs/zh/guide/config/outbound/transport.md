---
title: 传输层配置
---

# 传输层配置

传输层字段放在节点内，与 `type` 同级。协议决定可用的传输方式；服务端使用 WebSocket 时，不能只改为 gRPC 就期待连接成功。

| 协议 | 本参考支持的传输写法 |
| --- | --- |
| VMess | `tcp`、`ws`、`http`、`h2`、`grpc`、`mkcp`、`mekya` |
| VLESS | `tcp`、`ws`、`http`、`h2`、`grpc`、`xhttp` |
| Trojan | `tcp`、`ws`、`grpc` |

下面是要合并到节点内的片段，不是完整配置。保留该节点原有的服务器、认证与 TLS 字段，每次只选一种传输。

## WebSocket

```yaml
network: ws
ws-opts:
  path: /proxy
  headers:
    Host: cdn.example.com
```

`path` 与服务端路径一致；`Host` 是 HTTP 主机头，不等于 TLS 的 SNI。早期数据需要服务端支持，再添加 `max-early-data` 和 `early-data-header-name`。HTTP Upgrade 使用 `v2ray-http-upgrade`，不能与普通 WS 配置随意混换。

## gRPC

```yaml
network: grpc
grpc-opts:
  grpc-service-name: proxy-service
```

服务名需完全一致。`grpc-user-agent` 可指定客户端标识。连接数和流数量等设置只在确有需要时调整。

## HTTP 与 HTTP/2

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

两种 `host`/`headers` 结构不同；`http-opts` 的路径与请求头值使用列表。`h2` 的 `host` 是列表，`path` 是字符串。

## XHTTP（VLESS）

```yaml
network: xhttp
alpn: [h2]
xhttp-opts:
  host: proxy.example.com
  path: /proxy
  mode: stream-one
```

`mode` 按服务端配置选 `stream-one`、`stream-up` 或 `packet-up`。`alpn` 与服务端的 HTTP 版本一致。服务端给出 `xhttp-opts` 中的额外请求头、填充或复用参数时，保留对应结构。

## mKCP 与 Mekya（VMess）

```yaml
network: mkcp
mkcp-opts:
  mtu: 1350
  tti: 50
  uplink-capacity: 5
  downlink-capacity: 20
  congestion: false
```

mKCP 的 `mtu` 是字节，`tti` 是毫秒，`seed` 和 `header` 需与服务器配置配合。

```yaml
network: mekya
mekya-opts:
  url: https://proxy.example.com/mekya
  max-write-delay: 80
  max-request-size: 96000
  polling-interval-initial: 200
  h2-pool-size: 8
```

Mekya 使用服务端提供的 HTTP URL；内部 KCP 参数放在 `mekya-opts.kcp` 中。不要把 `ws-opts`、`grpc-opts` 等无关字段一并留在节点里。

参考：[mihomo](https://wiki.metacubex.one/config/proxies/transport/).
