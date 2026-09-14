---
title: SSH
---

# SSH

SSH 服务必须允许 TCP 转发。示例展示密码认证；改用密钥时填写 `private-key`。建议从服务器管理员取得 `host-key`，留空会接受任意主机密钥。SSH 出站不提供 UDP 转发。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: ssh
    server: proxy.example.com
    port: 22
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `username` / `password` | SSH 登录账户与密码。 |
| `private-key` | 使用密钥认证时填写私钥内容或可读取的文件路径。 |
| `private-key-passphrase` | 加密私钥的解锁密码。 |
| `host-key` | 服务器主机公钥列表；用于确认服务器身份。 |
| `host-key-algorithms` | 需要限制主机密钥算法时填写列表。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/ssh/).
