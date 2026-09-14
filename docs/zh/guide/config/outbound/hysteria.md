---
title: Hysteria
---

# Hysteria

这是 Hysteria v1，与 Hysteria2 的密码和混淆字段不同。不要把两种配置混用。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: hysteria
    server: proxy.example.com
    port: 443
    auth-str: YOUR_PASSWORD
    protocol: udp
    up: 20 Mbps
    down: 100 Mbps
    sni: proxy.example.com
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `auth-str` | 文本认证值；按服务器给出的方式填写。 |
| `protocol` | 示例使用 udp；Apple 三平台不支持 faketcp。 |
| `up` / `down` | 上传和下载带宽，建议明确写 Mbps，按实际带宽设置。 |
| `obfs` | 服务端启用混淆时填写对应字符串。 |
| `ports` | 可选端口跳跃列表；Hysteria v1 仍需保留 port。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/hysteria/).
