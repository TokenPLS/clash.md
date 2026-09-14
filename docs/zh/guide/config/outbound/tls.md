---
title: TLS 与证书
---

# TLS 与证书

TLS 参数写在节点中，只使用所选协议支持的字段。服务器地址、TLS 名称和 HTTP Host 可以不同，需要分别按照服务器配置填写。

## 常用字段

| 字段 | 填写方式 |
| --- | --- |
| `tls` | HTTP、SOCKS5、VMess、VLESS 等可选 TLS 的类型用它开启 TLS；Trojan、AnyTLS 自带 TLS |
| `sni` / `servername` | TLS 握手域名；VMess、VLESS 使用 `servername`，多数其他类型使用 `sni` |
| `alpn` | 协商协议列表，例如 `[h2, http/1.1]`；与服务端一致，不要随意添加 |
| `skip-cert-verify` | 通常省略或 `false`，保留证书校验 |
| `name-cert-verify` | 单独指定证书名称校验目标，不改变 SNI |
| `fingerprint` | 完整证书的 SHA-256 指纹；不是公钥指纹，也不是浏览器指纹 |
| `client-fingerprint` | 支持该项的协议可设置 TLS 客户端握手特征，例如 `chrome`；不能替代服务器证书 |
| `certificate` / `private-key` | 服务端要求 mTLS 时成对填写客户端 PEM 证书和私钥，或可读取的路径 |

## VLESS + REALITY 示例

```yaml
proxies:
  - name: Reality-Node
    type: vless
    server: proxy.example.com
    port: 443
    uuid: 00000000-0000-4000-8000-000000000001
    network: tcp
    tls: true
    servername: cover.example.com
    client-fingerprint: chrome
    flow: xtls-rprx-vision
    reality-opts:
      public-key: SERVER_REALITY_PUBLIC_KEY
      short-id: "0123456789abcdef"
    udp: true
```

把 `uuid`、`servername`、`public-key` 和 `short-id` 全部替换为服务端提供值。仅当服务端启用 Vision 时保留 `flow`。普通 TLS 服务删除 `reality-opts`，不能通过添加 REALITY 字段把普通服务转换为 REALITY 服务。

## ECH 与其他 TLS 包装

`ech-opts.enable: true` 启用 ECH；`config` 可填写服务提供的 Base64 ECH 配置，省略时尝试通过 DNS 获取。支持情况取决于协议和服务器。

ShadowTLS、Restls、JLS 使用各自的 `shadow-tls-opts`、`restls-opts`、`jls-opts`。这些是需要服务端配合的包装，不是通用优化开关。例如，服务端提供 ShadowTLS v3 时，在支持该包装的节点中添加：

```yaml
shadow-tls-opts:
  version: 3
  password: YOUR_SHADOWTLS_PASSWORD
```

这里的密码与节点自身密码分开填写，SNI 使用节点的 `sni` 或 `servername`。不要把多个包装同时启用；Snell 的包装字段位于 `obfs-opts`，Shadowsocks 使用插件配置。

证书报错时，先检查域名、设备时间、证书链和指纹是否过期，再修改配置。

参考：[mihomo](https://wiki.metacubex.one/config/proxies/tls/).
