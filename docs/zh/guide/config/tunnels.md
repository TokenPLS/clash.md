---
title: 流量隧道
---

# 流量隧道

流量隧道把本地端口收到的连接转发到固定目标。下面把 `127.0.0.1:9000` 的 TCP 连接通过 `Proxy` 转发至 `service.example.com:443`；使用前定义 `Proxy` 节点或代理组。

```yaml
tunnels:
  - network: [tcp]
    address: 127.0.0.1:9000
    target: service.example.com:443
    proxy: Proxy
```

| 字段 | 填写方式 |
| --- | --- |
| `network` | `[tcp]`、`[udp]` 或 `[tcp, udp]`，与服务需要一致 |
| `address` | 本地监听地址与端口；`127.0.0.1` 仅供本机访问 |
| `target` | 固定目标的域名或 IP 与端口 |
| `proxy` | 可选的节点或代理组名 |

这是端口转发配置。设备流量的接管设置见 [TUN](./inbound)。不要把监听端口设为已有服务正在占用的端口。

## 平台说明与字段状态

监听地址需要满足系统端口与权限条件。向其他设备开放监听时，应确认访问范围；普通用途保留本机地址即可。

<ConfigFieldMatrix lang="zh" category="tunnels" />

参考：[mihomo](https://wiki.metacubex.one/config/tunnels/).
