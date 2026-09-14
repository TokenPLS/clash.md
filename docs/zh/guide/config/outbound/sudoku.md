---
title: Sudoku
---

# Sudoku

示例关闭 HTTPMask，适用于对应的原始连接配置。使用 CDN/反向代理时，应按服务端参数设置 `httpmask`，不要只把端口改成 443。

## 节点示例

将以下节点合并到配置的 `proxies` 列表。替换示例地址、身份和凭据；`Node` 可改名，但代理组中的引用必须同步。

```yaml
proxies:
  - name: Node
    type: sudoku
    server: proxy.example.com
    port: 443
    key: YOUR_CLIENT_KEY
    aead-method: chacha20-poly1305
    padding-min: 2
    padding-max: 7
    table-type: prefer_ascii
    httpmask:
      disable: true
    enable-pure-downlink: false
```

## 协议字段

| 字段 | 填写方式 |
| --- | --- |
| `key` | 按服务端提供的共享密钥或专用十六进制密钥材料填写，不是普通 PEM 私钥。 |
| `aead-method` | chacha20-poly1305、aes-128-gcm 或 none；按服务端配置。 |
| `padding-min` / `padding-max` | 填充率 0–100，最大值不得小于最小值。 |
| `table-type` | prefer_ascii、prefer_entropy、up_ascii_down_entropy 或 up_entropy_down_ascii。 |
| `httpmask` | 需要 HTTP 包装时启用；mode、tls、host、path-root 与服务端一致。 |
| `enable-pure-downlink` | 下行模式必须与服务端一致。 |

[如何加入代理组与规则](../proxies#完整配置示例) · [通用字段](../proxies#通用字段) · [TLS 配置](./tls) · [传输层配置](./transport)

参考：[mihomo](https://wiki.metacubex.one/config/proxies/sudoku/).
