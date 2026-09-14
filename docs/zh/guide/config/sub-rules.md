---
title: 子规则
---

# 子规则

子规则为一组规则命名，在满足条件时进入该组。下面先把 UDP 流量交给 `UDP-Traffic`：目标端口为 443 时拒绝，其余 UDP 直连；其他流量走 `Proxy`。使用前定义 `Proxy` 节点或代理组。

```yaml
rules:
  - SUB-RULE,(NETWORK,UDP),UDP-Traffic
  - MATCH,Proxy
sub-rules:
  UDP-Traffic:
    - DST-PORT,443,REJECT
    - MATCH,DIRECT
```

调用格式是 `SUB-RULE,(条件),子规则名`。注意条件外的括号；子规则名必须与 `sub-rules` 下的键一致。子规则内部仍按顺序匹配，可用 `MATCH` 明确处理剩余流量。不要让子规则相互循环调用。

## 平台说明与字段状态

进程身份等限制与[路由规则](./rules)相同，iOS/tvOS 不宜使用进程身份判断应用。

<ConfigFieldMatrix lang="zh" category="sub-rules" />

参考：[mihomo](https://wiki.metacubex.one/config/sub-rule/).
