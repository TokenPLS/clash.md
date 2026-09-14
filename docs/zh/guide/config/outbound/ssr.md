---
title: ShadowsocksR
---

# ShadowsocksR

SSR 的加密、协议、混淆是三组独立设置。分享链接中的 protocol 和 obfs 不能互换，也不要把 SSR 节点写成 `type: ss`。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: ssr
    server: proxy.example.com
    port: 443
    cipher: chacha20-ietf
    password: YOUR_PASSWORD
    protocol: auth_sha1_v4
    obfs: tls1.2_ticket_auth
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `cipher` / `password` | 服务端的加密方法和密码。 |
| `protocol` / `protocol-param` | SSR 协议及其参数；参数为空时可省略 protocol-param。 |
| `obfs` / `obfs-param` | 混淆方式及其参数，必须与服务端相符。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/ssr/).
