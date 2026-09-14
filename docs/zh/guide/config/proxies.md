---
title: 出站代理
---

# 出站代理

`proxies` 保存节点列表。每个节点填写一种协议及服务器参数，再由代理组或路由规则引用其 `name`。

## 完整配置示例

下面是一份包含 DNS、Trojan 节点、选择组和规则的完整结构。将地址与密码替换为你的服务器信息后导入；示例地址和凭据不能用于实际连接。

```yaml
mode: rule
log-level: info
dns:
  enable: true
  enhanced-mode: fake-ip
  nameserver:
    - https://1.1.1.1/dns-query
proxies:
  - name: Node
    type: trojan
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
proxy-groups:
  - name: Proxy
    type: select
    proxies: [Node, DIRECT]
rules:
  - MATCH,Proxy
```

导入后连接，在 `Proxy` 组选择 `Node`。添加第二个节点时，在同一个 `proxies` 列表追加节点，并把新名字加入组的 `proxies`；不要重复创建顶层 `proxies:`。

## 按协议配置

点击协议查看节点示例和字段说明。示例使用共同的 `Node` 名称，合并多个节点时请分别改名。

| 协议 | YAML `type` |
| --- | --- |
| [HTTP / HTTPS](./outbound/http) | `http` |
| [SOCKS5](./outbound/socks5) | `socks5` |
| [Shadowsocks](./outbound/ss) | `ss` |
| [ShadowsocksR](./outbound/ssr) | `ssr` |
| [Snell](./outbound/snell) | `snell` |
| [VMess](./outbound/vmess) | `vmess` |
| [VLESS](./outbound/vless) | `vless` |
| [Trojan](./outbound/trojan) | `trojan` |
| [AnyTLS](./outbound/anytls) | `anytls` |
| [Mieru](./outbound/mieru) | `mieru` |
| [Sudoku](./outbound/sudoku) | `sudoku` |
| [Hysteria](./outbound/hysteria) | `hysteria` |
| [Hysteria2](./outbound/hysteria2) | `hysteria2` |
| [TUIC](./outbound/tuic) | `tuic` |
| [ShadowQUIC](./outbound/shadowquic) | `shadowquic` |
| [GOST Relay](./outbound/gost-relay) | `gost-relay` |
| [WireGuard](./outbound/wireguard) | `wireguard` |
| [Tailscale](./outbound/tailscale) | `tailscale` |
| [ZeroTier](./outbound/zerotier) | `zerotier` |
| [SSH](./outbound/ssh) | `ssh` |
| [MASQUE](./outbound/masque) | `masque` |
| [TrustTunnel](./outbound/trusttunnel) | `trusttunnel` |
| [OpenVPN](./outbound/openvpn) | `openvpn` |

## 通用字段

| 字段 | 填写方式 |
| --- | --- |
| `name` | 唯一节点名；组与规则必须使用相同名字 |
| `type` | 上表中的小写类型，不能写协议展示名称 |
| `server` / `port` | 远程地址与端口；Tailscale、ZeroTier 使用自己的网络配置，WireGuard 多 peer 有独立结构 |
| `udp` | 支持该选项的协议用它允许 UDP；HTTP、SSH 不会因此获得 UDP 能力 |
| `ip-version` | `dual`、`ipv4`、`ipv6`、`ipv4-prefer` 或 `ipv6-prefer`，控制节点域名解析后的地址选择 |
| `dialer-proxy` | 建立此节点连接时先使用的节点或组，见[链式连接](./outbound/dialer-proxy) |
| `tfo` / `mptcp` | TCP Fast Open 与多路径 TCP 请求，效果取决于系统和连接条件 |
| `smux` | 服务端支持 sing-mux 时才配置；默认不需要开启 |

认证、TLS、传输层选项并非所有协议通用，请按协议页填写。Apple 版本自动管理物理出口，不采用节点指定的 `interface-name` 和 `routing-mark`。

## TLS、传输层与复用

- [TLS 与证书](./outbound/tls)：`sni`、`servername`、证书校验、REALITY 和 ECH。
- [传输层](./outbound/transport)：WebSocket、gRPC、HTTP/2、XHTTP 等完整片段。
- [链式连接](./outbound/dialer-proxy)：一个节点如何经过另一个节点连接。
- [内置出站](./outbound/built-in)：DIRECT、DNS、REJECT 和 rematch。

支持 sing-mux 的服务可在节点中添加下面的片段；`protocol` 必须与服务端能力匹配：

```yaml
smux:
  enabled: true
  protocol: h2mux
  max-connections: 4
  min-streams: 4
```

`protocol` 可选 `h2mux`、`smux`、`yamux`。`max-streams` 与 `max-connections` / `min-streams` 是不同限制方式，不要同时设置。仅在服务端要求时开启 `padding`；`only-tcp: true` 表示 UDP 不进入这层复用。

## 配置后检查

先确认节点能连接，再确认组已选中该节点、规则引用了正确组名。TLS 报错检查证书域名；超时检查地址、端口和传输方式；UDP 失败同时检查节点和中间出口的支持。

[代理集合](./proxy-providers)负责批量加载节点，[代理组](./proxy-groups)负责选择出口，[路由规则](./rules)决定哪些连接使用它。

<ConfigFieldMatrix lang="zh" category="proxies" />

参考：[mihomo](https://wiki.metacubex.one/config/proxies/).
