---
title: VLESS
---

# VLESS

示例为普通 VLESS + TLS。REALITY 的 `public-key` 不能用证书指纹替代；完整组合示例见 [TLS 与 REALITY](./tls)。不要同时把多种互斥的 TLS 包装全部加上。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: vless
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    tls: true
    servername: proxy.example.com
    network: tcp
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `uuid` | 服务端分配的 UUID。 |
| `flow` | 服务端启用 Vision 时填 xtls-rprx-vision；否则省略。 |
| `tls` / `servername` | TLS 开关及域名；VLESS 使用 servername。 |
| `reality-opts` | REALITY 需要服务端 public-key 与 short-id，并配合正确的 servername。 |
| `network` | 按服务端选 tcp、ws、http、h2、grpc 或 xhttp，并填写对应 opts。 |
| `packet-encoding` / `encryption` | UDP 编码和 VLESS Encryption 参数直接按服务端提供值填写；未启用时省略。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/vless/).
