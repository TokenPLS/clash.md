---
title: 实验性配置
---

# 实验性配置

实验选项用于有明确需求的兼容性调整。没有遇到对应问题时，可以省略整个 `experimental` 段。

```yaml
experimental:
  quic-go-disable-gso: false
  quic-go-disable-ecn: false
  dialer-ip4p-convert: false
```

| 字段 | 作用 |
| --- | --- |
| `quic-go-disable-gso` | 设为 `true`，请求 QUIC 实现禁用 GSO 数据包分段优化 |
| `quic-go-disable-ecn` | 设为 `true`，请求 QUIC 实现禁用 ECN 拥塞通知 |
| `dialer-ip4p-convert` | 设为 `true`，启用 IP4P 编码地址转换；只在服务端使用该方式时配置 |
| `fingerprints` | 旧字段已无效果；证书指纹应在相应节点中配置 |

一次只调整与问题相关的一项，再用新连接检查效果。

## 平台说明与字段状态

`quic-go-disable-ecn` 和 `quic-go-disable-gso` 设置的状态可能保留到当前扩展进程结束；改回 `false`、重载配置或重新连接都不保证立即恢复。

<ConfigFieldMatrix lang="zh" category="experimental" />

参考：[mihomo](https://wiki.metacubex.one/config/experimental/).
