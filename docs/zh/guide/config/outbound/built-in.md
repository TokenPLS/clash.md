---
title: 内置出站
---

# 内置出站

路由规则可以直接使用 `DIRECT` 直连或 `REJECT` 拒绝连接，不需要服务器账户。

```yaml
rules:
  - DOMAIN-SUFFIX,blocked.example,REJECT
  - MATCH,DIRECT
```

需要命名或附加设置时，可以定义对应类型的节点。`type` 使用小写：

```yaml
proxies:
  - name: Direct-IPv4
    type: direct
    ip-version: ipv4
  - name: Internal-DNS
    type: dns
```

`direct` 连接目标本身；`dns` 将 DNS 请求交给内部 DNS 模块处理，不能用它承载普通网站流量。DNS 服务器地址应在[DNS 配置](../dns)中填写。

## 重新匹配规则

`rematch` 可写入标记后重新匹配，或通过 `target-sub-rule` 进入指定子规则。以下示例对 `example.com` 写入标记，重新匹配后直连：

```yaml
proxies:
  - name: Mark-Work
    type: rematch
    target-rematch-name: work
rules:
  - REMATCH-NAME,work,DIRECT
  - DOMAIN-SUFFIX,example.com,Mark-Work
  - MATCH,DIRECT
```

处理标记的规则必须放在触发规则之前，避免反复命中同一个 rematch 出站。普通分流直接写规则即可，不需要加这一层。

参考：[mihomo](https://wiki.metacubex.one/config/proxies/direct/).
