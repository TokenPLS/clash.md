---
title: HTTP / HTTPS
---

# HTTP / HTTPS

适用于提供 HTTP CONNECT 的代理。示例为 HTTPS 代理；普通 HTTP 服务需去掉 TLS 设置。此类型用于 TCP，不能靠添加 `udp: true` 获得 UDP 转发。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: http
    server: proxy.example.com
    port: 443
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    tls: true
    sni: proxy.example.com
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `username` / `password` | 按服务器要求填写；无认证服务器可省略。 |
| `tls` | HTTPS 代理设为 true；普通 HTTP 代理省略或 false，端口与服务端一致。 |
| `sni` | TLS 使用的服务器名称，通常与证书域名一致。 |
| `headers` | 自定义 HTTP 请求头，使用键值映射。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/http/).
