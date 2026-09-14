---
title: Snell
---

# Snell

版本必须明确匹配服务器。使用 ShadowTLS、Restls 或 JLS 时，还要填写该包装协议的密码及版本等信息。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: snell
    server: proxy.example.com
    port: 443
    psk: YOUR_PSK
    version: 4
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `psk` | 服务端预共享密钥。 |
| `version` | 填写服务端版本；示例明确使用 v4。version: 5 在当前版本走 v4 兼容方式，不代表原生 v5。 |
| `udp` | UDP 需要 v3 或 v4 兼容路径；v1/v2 不支持。 |
| `reuse` | v4/v5 可选连接复用。 |
| `obfs-opts` | 仅在服务端启用混淆时添加，包含 mode 和 host 等对应字段。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/snell/).
