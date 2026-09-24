---
title: EasyTier
description: Hako v1.19.31-hako.1 的 macOS EasyTier 出站配置，包含 peer、IPv4、DNS 与平台限制。
---

# EasyTier

EasyTier 通过一个或多个 peer 加入虚拟网络。使用 `type: easytier`，填写网络身份
与 peer URI，无需普通节点的 `server` / `port`。加入网络不代表自动获得公网出口。

::: warning 平台支持范围
Hako SDK **v1.19.31-hako.1** 的 macOS slice 包含 EasyTier 实现。
iOS、iPadOS 与 tvOS 不包含该实现：导入的节点仅作为 **REJECT 占位节点**保留，
经过它的所有连接都会被拒绝。配置能导入不代表协议可用。请使用已集成此 SDK 的
客户端版本；SDK 发行版本与 App Store 客户端版本分别管理。
:::

## 节点示例

在 macOS 上将下面的节点合并进已有的 `proxies` 列表。网络身份和 peer 地址需
替换为网络管理员提供的真实值。若修改 `Node` 名称，请同步修改代理组、规则和
DNS 中的引用。

```yaml
proxies:
  - name: Node
    type: easytier
    network-name: YOUR_NETWORK_NAME
    network-secret: YOUR_NETWORK_SECRET
    hostname: hako-mac
    dhcp: true
    peers:
      - tcp://peer.example.com:11010
    no-listener: true
    udp: true
```

这是节点片段，不是完整配置。将节点加入选择组，或在规则中直接引用。
完整结构见[完整配置示例](../proxies#完整配置示例)。

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `network-name` | 必填网络名，与要加入的网络一致。 |
| `network-secret` | 与目标网络使用相同的共享密钥。 |
| `peers` | 入口 peer URI 列表，例如 `tcp://peer.example.com:11010` 或 `udp://peer.example.com:11010`。未配置监听器时至少填写一个；Hako 不会隐式连接公共 peer。 |
| `hostname` | 在虚拟网络内广播的主机名。 |
| `ipv4` / `dhcp` | 填写如 `10.144.0.2/24` 的虚拟网络 IPv4 地址，或设置 `dhcp: true`。`ipv4` 为空时自动启用 DHCP。 |
| `udp` | 需要通过此出站传输 UDP 流量时设为 `true`；省略时不启用。它与 peer URI 使用的传输协议是两回事。 |
| `listeners` / `no-listener` | 默认不开放监听器。`no-listener: true` 不能与非空 `listeners` 同时使用。显式设置 `no-listener: false` 且不填列表时，会监听 `tcp://0.0.0.0:11010`。 |
| `mapped-listeners` | 配置端口映射后，从外部可以访问的监听 URI。 |
| `exit-nodes` | 出口节点的虚拟网络 IPv4 地址；远端需提供所需出口路由。 |
| `proxy-networks` | 向虚拟网络广播的本地 IPv4 子网 CIDR；不能代替 Clash 的路由规则。 |
| `instance-name` / `state-dir` | 实例名默认取节点名；状态目录默认是内核数据目录下的 `easytier/<name>`，保存 `instance_id`，必须位于 App 允许且可写的路径内。 |
| `tld-dns-zone` | 虚拟网络 DNS 后缀，默认 `et.net.`，见下方 DNS 示例。 |
| `secure-mode` | 启用 Noise 端到端加密。填写本机密钥，或在 peer URI 中提供 `peer-public-key` 时会自动启用；这些字段不能与 `secure-mode: false` 同时使用。 |
| `local-private-key` / `local-public-key` | 可选的 Base64 X25519 身份密钥。提供公钥时必须同时提供私钥；通常可由私钥派生公钥。只保存 `instance_id` 不会固定这对密钥。 |

其他可选控制项包括 `accept-dns`、`enable-exit-node`、`enable-encryption`、
`encryption-algorithm`、`private-mode`、`latency-first`、`disable-p2p`、
`enable-kcp-proxy`、`disable-kcp-input`、`enable-quic-proxy`、
`disable-quic-input` 与 `mtu`。请按目标网络的设计配置；本机提供出口或广播
子网还取决于平台路由与权限。

## 虚拟网络 DNS 与路由

在 macOS 上，`easytier://Node` 用名为 `Node` 的 EasyTier 节点解析已知的虚拟
网络主机。把下面内容合并到已有 DNS 策略和规则列表中；规则放在兜底 `MATCH`
之前，并将子网替换为你的实际网段。

```yaml
dns:
  nameserver-policy:
    '+.et.net': easytier://Node
rules:
  - DOMAIN-SUFFIX,et.net,Node
  - IP-CIDR,10.144.0.0/24,Node,no-resolve
```

此解析器提供虚拟网络 IPv4 A 记录与 IPv4 PTR 反向查询，不能作为通用公网 DNS。
如果修改 `tld-dns-zone`，请同步修改 DNS 策略和域名规则。需要 PTR 反向查询时，
还需将相应的 `in-addr.arpa` 反向域交给此解析器；上面的示例只覆盖 `et.net`。

在 iOS、iPadOS 与 tvOS 上，Apple 隧道配置会从 DNS 列表中移除 `easytier://`
及其别名 `et://`。若某条域名策略因此没有剩余解析器，会返回名称错误；混合
列表保留其他解析器。EasyTier 占位节点不能提供虚拟网络 DNS。

虚拟网络目前**只支持 IPv4**。`ip-version` 影响底层 peer 连接的地址选择，
不会启用虚拟网络 IPv6。Hako 运行 EasyTier 时不创建第二个系统 TUN 设备；
流量仍由 Clash 的代理组与规则选择。配置后应访问一个实际可达的虚拟网络服务；
仅能解析节点或进行公网延迟探测，不能证明这条路由可用。

## 参考版本

2026-09-24 按 [Hako v1.19.31-hako.1](https://github.com/TokenPLS/Hako/releases/tag/v1.19.31-hako.1)
核对，源码 revision 为 `7ea70d15bf8b67257928efe45c12f16d4ffc9f61`。
依据：[节点字段与运行实现](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/adapter/outbound/easytier.go)、
[校验与默认值](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/component/easytier/toml.go)、
[移动平台占位实现](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/adapter/outbound/easytier_stub.go)、
[移动平台 DNS 处理](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/bind/hako/easytier_wall.go)
及 [Apple SDK 构建设置](https://github.com/TokenPLS/Hako/blob/7ea70d15bf8b67257928efe45c12f16d4ffc9f61/cmd/build_libbox/main.go)。
