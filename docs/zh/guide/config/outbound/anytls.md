---
title: AnyTLS
---

# AnyTLS

按服务器提供的密码和域名配置即可开始使用。AnyTLS 不支持与 REALITY 组合。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: anytls
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `password` / `sni` | 服务器密码和 TLS 域名。 |
| `client-fingerprint` | 可选 TLS 客户端指纹，例如 chrome。 |
| `idle-session-check-interval` | 空闲连接检查间隔，秒；默认 30。 |
| `idle-session-timeout` | 允许的空闲时长，秒；默认 30。 |
| `min-idle-session` | 至少保留的空闲会话数量，默认 0。 |
| `client-metadata` | 只有服务器需要时才填客户端元数据。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/anytls/).
