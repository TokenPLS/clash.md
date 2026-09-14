---
title: 域名嗅探
---

# 域名嗅探

嗅探从 HTTP、TLS 或 QUIC 的可见信息中尝试识别域名，帮助域名规则处理原本只有 IP 的连接。下面开启识别，并保留原连接目标。

```yaml
sniffer:
  enable: true
  parse-pure-ip: true
  override-destination: false
  sniff:
    HTTP:
      ports: [80, 8080]
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443]
  skip-domain:
    - '+.lan'
    - '+.local'
```

| 字段 | 如何使用 |
| --- | --- |
| `enable` | 开启嗅探 |
| `sniff` | 按 `HTTP`、`TLS`、`QUIC` 分别配置 `ports`；列表可包含端口或 `8000-9000` 形式的范围 |
| `parse-pure-ip` | 对缺少域名的流量尝试嗅探 |
| `force-dns-mapping` | 对 DNS 映射得到的 redir-host 流量强制尝试嗅探 |
| `override-destination` | 为 `true` 时允许用识别到的域名替换实际连接目标；单协议同名项可覆盖全局值 |
| `force-domain` | 对指定域名强制尝试嗅探 |
| `skip-domain` | 跳过指定域名 |
| `skip-src-address` / `skip-dst-address` | 跳过指定来源或目标 IP 网段 |

如果开启后某个服务连接异常，可先把它加入跳过列表或关闭目标覆盖。加密握手中的域名不可见时，嗅探不保证获得域名。

## 平台说明与字段状态

新配置使用 `sniffer.sniff`。旧 `sniffing` 和 `port-whitelist` 只在 `sniff` 为空时使用，不会与新写法叠加。

<ConfigFieldMatrix lang="zh" category="sniffer" />

参考：[mihomo](https://wiki.metacubex.one/config/sniff/).
