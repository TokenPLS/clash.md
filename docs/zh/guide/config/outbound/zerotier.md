---
title: ZeroTier
---

# ZeroTier

将 `network` 替换为自己的 ZeroTier 网络 ID，并在控制器中批准这个客户端。网络路由决定可访问的目标；加入网络并不自动获得公网出口。身份缓存被清理后可能需要重新授权。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: zerotier
    network: "0123456789abcdef"
    udp: true
```

需要 UDP 时显式保留 `udp: true`；本参考版本省略此项不会默认开启。

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `network` | 16 位十六进制网络 ID；使用引号保留原字符串。 |
| `state-dir` | 可选节点身份存储目录。 |
| `planet` | 使用私有 Planet 时提供 App 可读的文件路径。 |
| `mtu` / `physical-mtu` | 隧道和物理 UDP 负载的 MTU；没有明确需求时保留默认。 |
| `remote-dns-resolve` / `dns` | 需要时使用虚拟网络内可达的 DNS 解析目标。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/zerotier/).
