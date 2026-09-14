---
title: WireGuard
---

# WireGuard

示例为单 peer 写法。多 peer 时把每个远端的 `server`、`port`、`public-key`、`allowed-ips` 放入 `peers` 列表，客户端地址和私钥留在节点层。示例密钥必须替换，不能直接连接。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: wireguard
    server: proxy.example.com
    port: 443
    ip: 10.10.0.2
    private-key: YOUR_BASE64_PRIVATE_KEY
    public-key: SERVER_BASE64_PUBLIC_KEY
    allowed-ips: [0.0.0.0/0]
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `ip` / `ipv6` | 服务端分配给客户端的隧道地址。 |
| `private-key` | 客户端私钥，Base64 编码的 32 字节密钥。 |
| `public-key` | 远端 peer 的公钥，不是客户端自己的公钥。 |
| `pre-shared-key` | 服务端配置额外 PSK 时填写。 |
| `allowed-ips` | 该 peer 可承载的目的网段列表；全流量示例为 0.0.0.0/0。 |
| `mtu` / `persistent-keepalive` | MTU 单位字节；保活间隔单位秒。 |
| `remote-dns-resolve` / `dns` | 需要在该出站内解析目标域名时启用，并填写可从隧道访问的 DNS。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/wg/).
