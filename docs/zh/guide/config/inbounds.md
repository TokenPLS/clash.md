---
title: 入站
---

# 入站

设备流量由 [TUN / Network Extension](./inbound) 接管。需要让支持 HTTP 或 SOCKS 的软件主动连接本地代理时，可额外配置代理端口。

## 本机代理端口

```yaml
mixed-port: 7890
allow-lan: false
bind-address: 127.0.0.1
```

在需要使用代理的软件中，填主机 `127.0.0.1`、端口 `7890`，选择 HTTP 或 SOCKS5。这里的地址表示同一台设备；并不是远程代理服务器地址。

| 字段 | 用途 |
| --- | --- |
| `port` | HTTP 代理端口 |
| `socks-port` | SOCKS 代理端口 |
| `mixed-port` | 同一端口接受 HTTP 和 SOCKS |
| `allow-lan` | 是否请求允许局域网访问；还必须在 App 中允许共享 |
| `bind-address` | 绑定地址；普通本机用途使用 `127.0.0.1` |
| `authentication` | 用户名密码列表，如 `["user:YOUR_PASSWORD"]` |
| `skip-auth-prefixes` | 允许指定来源网段跳过入口认证，仅按需使用 |
| `lan-allowed-ips` / `lan-disallowed-ips` | 允许或拒绝的来源 IP 网段列表 |

## 自定义 listeners

下面创建单独的本地 mixed 入口，使用独立端口避免与上面的 `7890` 冲突：

```yaml
listeners:
  - name: Local-Proxy
    type: mixed
    listen: 127.0.0.1
    port: 7891
    users:
      - username: user
        password: YOUR_PASSWORD
```

`name` 为入口名称，`type` 为监听协议，`listen` 是本地地址，`port` 是监听端口。`users` 是这个入口的认证信息。日常设备接管无需创建 listeners；自定义服务还需满足协议的证书、认证和系统监听条件。

## 平台说明与字段状态

`redir-port`、`tproxy-port` 与 Linux iptables 设置不在 Apple 版本生效。代理入口的 `authentication` 和 `allow-lan` 不统一保护 DNS 或控制器；详见[安全说明](./security)。

<ConfigFieldMatrix lang="zh" category="inbound" />

参考：[mihomo](https://wiki.metacubex.one/config/inbound/).
