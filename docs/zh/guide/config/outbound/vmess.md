---
title: VMess
---

# VMess

示例为 VMess + WebSocket + TLS。普通 TCP 传输改为 `network: tcp` 并删除 `ws-opts`；TLS 是否保留由服务器决定。其他传输的写法见[传输层](./transport)。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: vmess
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    alterId: 0
    cipher: auto
    tls: true
    servername: proxy.example.com
    network: ws
    ws-opts:
      path: /proxy
      headers:
        Host: proxy.example.com
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `uuid` | 用服务端分配的 UUID 替换示例。 |
| `alterId` | 常见 AEAD 配置使用 0；旧服务按其配置填写。 |
| `cipher` | auto、none、zero、aes-128-gcm 或 chacha20-poly1305，按服务端填写。 |
| `network` / `ws-opts` | 示例使用 WebSocket，path 和 Host 需与服务端一致。 |
| `tls` / `servername` | 是否使用 TLS 及握手域名。VMess 使用 servername 字段。 |
| `packet-encoding` | 需要时选 packetaddr 或 xudp，与服务端的 UDP 编码一致。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/vmess/).
