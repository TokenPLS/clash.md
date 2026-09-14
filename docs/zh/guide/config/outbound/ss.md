---
title: Shadowsocks
---

# Shadowsocks

先确认加密方式和密码，再按服务端要求添加插件。常见 obfs 插件写作 `plugin: obfs`，在 `plugin-opts` 中填写 `mode: http` 或 `tls` 及 `host`；插件参数不等同于给节点增加通用 TLS。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: ss
    server: proxy.example.com
    port: 443
    cipher: chacha20-ietf-poly1305
    password: YOUR_PASSWORD
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `cipher` | 加密方法必须与服务器一致，例如 aes-128-gcm、aes-256-gcm、chacha20-ietf-poly1305。 |
| `password` | 服务器密码。SS2022 使用服务端提供的 Base64 密钥，不能换成普通口令。 |
| `plugin` / `plugin-opts` | 服务器使用插件时，填写插件类型和对应选项；无插件时两项都省略。 |
| `udp-over-tcp` / `udp-over-tcp-version` | 仅在服务端支持对应 UDP over TCP 封装时使用；版本需一致。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/ss/).
