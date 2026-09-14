---
title: Chaining with dialer-proxy
---

# Chaining with dialer-proxy

dialer-proxy chooses the outbound used to connect to a node. This example follows device → Entry → Exit → destination.

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

Replace both endpoints and credentials. Set dialer-proxy on Exit because Entry establishes the connection to Exit. A group name is also allowed, but must not lead back to the same node.

For outer transports requiring UDP, such as QUIC, the intermediate outbound must carry the required UDP traffic. Start with an ordinary TCP chain like this example; individually working nodes are not necessarily compatible in every chain.

Reference: [mihomo](https://wiki.metacubex.one/config/proxies/dialer-proxy/).
