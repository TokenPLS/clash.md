---
title: MASQUE
---

# MASQUE

需要服务提供的密钥及地址，不能直接使用普通 HTTP 代理账户。`h3-l4proxy` 模式需按服务端配置且不支持 UDP；该模式应写 `udp: false`。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: masque
    server: proxy.example.com
    port: 443
    private-key: YOUR_BASE64_EC_PRIVATE_KEY
    public-key: SERVER_BASE64_PUBLIC_KEY
    ip: 10.10.0.2/32
    network: h3
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `private-key` | 服务提供的 Base64 编码 SEC1 EC 私钥（DER），不是 WireGuard 私钥。 |
| `public-key` | 远端 Base64 编码 ECDSA 公钥（PKIX DER）。 |
| `ip` / `ipv6` | 客户端隧道地址，可写 CIDR。 |
| `network` | h3 或 h2 为 IP 隧道；h3-l4proxy 使用另一种转发模式。 |
| `sni` / `mtu` | 服务端要求的 TLS 名称与隧道 MTU。 |
| `remote-dns-resolve` / `dns` | 启用出站内目标解析时填写 DNS。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/masque/).
