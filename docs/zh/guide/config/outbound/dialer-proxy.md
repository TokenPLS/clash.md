---
title: 链式连接：dialer-proxy
---

# 链式连接：dialer-proxy

`dialer-proxy` 决定“连接这个节点时，先经过哪个出口”。下面访问目标的路径为：设备 → Entry → Exit → 目标网站。

```yaml
proxies:
  - name: Entry
    type: socks5
    server: entry.example.com
    port: 1080
    username: YOUR_ENTRY_USER
    password: YOUR_ENTRY_PASSWORD
  - name: Exit
    type: trojan
    server: exit.example.com
    port: 443
    password: YOUR_EXIT_PASSWORD
    sni: exit.example.com
    dialer-proxy: Entry
proxy-groups:
  - name: Proxy
    type: select
    proxies: [Exit]
rules:
  - MATCH,Proxy
```

替换两台服务器及凭据。`dialer-proxy` 写在 **Exit** 上，因为需要通过 Entry 建立到 Exit 的连接。也可引用组名，但不要引用最终又包含自己的组，否则形成循环。

使用 QUIC 等需要 UDP 的外层协议时，中间出口也要支持所需的 UDP。普通 TCP 链式连接可先用上例验证；节点能单独连通不代表任意组合都能连通。

参考：[mihomo](https://wiki.metacubex.one/config/proxies/dialer-proxy/).
