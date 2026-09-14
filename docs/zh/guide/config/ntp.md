---
title: NTP
---

# NTP

需要内核为协议校正时间偏移时启用 NTP。通常可以保留默认设置。

```yaml
ntp:
  enable: true
  server: time.apple.com
  port: 123
  interval: 30
  write-to-system: false
  dialer-proxy: DIRECT
```

| 字段 | 填写方式 |
| --- | --- |
| `enable` | 是否启用时间同步 |
| `server` / `port` | NTP 服务器和 UDP 端口；示例使用 `time.apple.com:123` |
| `interval` | 同步间隔，单位**分钟**，示例为 30 分钟 |
| `dialer-proxy` | 请求使用的出口；指定其他节点时需要支持 UDP |
| `write-to-system` | Apple 版本固定关闭，不改设备时间 |

NTP 无法连接时，检查 UDP 连通性及所选出口。

## 平台说明与字段状态

NTP 为协议提供时间偏移，不修改设备时钟。

<ConfigFieldMatrix lang="zh" category="ntp" />

参考：[mihomo](https://wiki.metacubex.one/config/ntp/).
