---
title: Mieru
---

# Mieru

不要把 Mieru 的 `transport` 写成其他协议使用的 `network`。示例使用单端口 TCP。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: mieru
    server: proxy.example.com
    port: 443
    transport: TCP
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    multiplexing: MULTIPLEXING_LOW
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `port` / `port-range` | 单端口与范围二选一。使用 port-range: "4000-4010" 时删除 port。 |
| `transport` | TCP 或 UDP，按服务端填写。 |
| `username` / `password` | Mieru 用户名与密码。 |
| `multiplexing` | MULTIPLEXING_OFF、MULTIPLEXING_LOW、MULTIPLEXING_MIDDLE 或 MULTIPLEXING_HIGH。 |
| `handshake-mode` | HANDSHAKE_STANDARD 或 HANDSHAKE_NO_WAIT；后者启用不等待握手完成的方式。 |
| `traffic-pattern` | 服务端要求时填提供的 Base64 网络行为参数。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/mieru/).
