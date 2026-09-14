---
title: SOCKS5
---

# SOCKS5

`type` 写 `socks5`，不是 `socks`。如果服务器没有用户名密码认证，删除示例中的两个认证字段。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: socks5
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `username` / `password` | 需要认证时填写，两者与服务端一致。 |
| `udp` | 需要 UDP 转发时开启，服务端也必须支持 UDP ASSOCIATE。 |
| `tls` | 只在服务器提供 TLS 包装时开启；TLS 名称使用 server，本类型没有 sni 字段。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/socks/).
