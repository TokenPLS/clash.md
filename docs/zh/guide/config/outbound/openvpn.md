---
title: OpenVPN
---

# OpenVPN

示例中的 CA 占位内容不是有效证书，必须替换。密码认证和客户端证书的需要由服务器决定；至少提供有效认证。两种认证可以同时提供，`cert` 和 `key` 需成对填写。仅支持 `dev: tun`，不支持 TAP；证书和静态密钥字段填写内容，不是文件路径。不要把整个 `.ovpn` 文本粘到 `proxies` 下，应将所需字段转换成这里的 YAML。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: openvpn
    server: proxy.example.com
    port: 1194
    proto: udp
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    ca: |
      -----BEGIN CERTIFICATE-----
      REPLACE_WITH_CA_CERTIFICATE_BODY
      -----END CERTIFICATE-----
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `proto` | udp 或 tcp，与 .ovpn 的传输方式一致。 |
| `ca` | 把 .ovpn 中 `<ca>` 的完整证书内容放入 YAML 块字符串。 |
| `username` / `password` | auth-user-pass 认证所需的登录凭据。 |
| `cert` / `key` | 服务端要求客户端证书时，分别填 `<cert>` 和 `<key>` 的完整内容。 |
| `tls-auth` / `key-direction` | 使用静态 TLS 认证时填密钥内容与方向。 |
| `tls-crypt` / `tls-crypt-v2` | 按原配置选择对应的控制通道密钥，不与其他模式混填。 |
| `cipher` / `data-ciphers` / `auth` | 数据加密、协商列表和认证摘要算法，按服务端提供的值。 |
| `ping` / `ping-restart` / `handshake-timeout` | 心跳、失联重启与握手超时，单位秒。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/openvpn/).
