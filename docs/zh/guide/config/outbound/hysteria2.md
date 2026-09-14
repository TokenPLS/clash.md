---
title: Hysteria2
---

# Hysteria2

认证密码与混淆密码是两项独立设置。普通配置不需要手动填写 QUIC 接收窗口；先确认服务器地址、认证和 UDP 网络可用。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: hysteria2
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `password` | 服务端认证密码。 |
| `ports` / `hop-interval` | 服务端开放多个端口时启用跳跃，例如 ports: "443,8443"；间隔单位秒。 |
| `up` / `down` | 需要带宽速率控制时填写，例如 "20 Mbps"，不要虚报可用带宽。 |
| `obfs` / `obfs-password` | 按服务端要求选择 salamander 或 gecko 及混淆密码；未启用则省略。 |
| `sni` / `alpn` | TLS 域名和应用协议协商值，与服务端相符。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/hysteria2/).
