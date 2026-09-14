---
title: Tailscale
---

# Tailscale

这类出站不填写普通代理的 `server` 和 `port`。把示例出口地址替换为自己的节点；若只访问 Tailnet 或其子网，可删除 `exit-node`。添加后还需满足控制端的设备授权和路由许可。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: tailscale
    hostname: hako-device
    auth-key: YOUR_TAILSCALE_AUTH_KEY
    accept-routes: true
    exit-node: 100.64.0.10
    udp: true
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `hostname` | 此客户端在 Tailnet 中的设备名称。 |
| `auth-key` | 用于加入网络的授权密钥。 |
| `control-url` | 使用自建控制服务器时填写，普通 Tailscale 可省略。 |
| `accept-routes` | 是否接受发布的子网路由。 |
| `exit-node` | 访问公网时使用的出口节点地址或名称，需在网络内获准使用。 |
| `state-dir` / `ephemeral` | 可选状态目录和临时节点开关；持久身份依赖可保留的存储。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/tailscale/).
