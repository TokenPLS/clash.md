---
title: 配置安全边界
description: 识别 Clash 与 Hako 配置中的敏感凭据、远程资源、本地监听器、控制器、证书与高风险字段。
---

# 配置安全边界

代理应该解决问题，不该成为新的问题。配置决定流量交给谁，也可能包含足以
接管线路或控制面的凭据；把它当成密码文件，而不是普通文本。

## 永远不要公开

- Profile 地址及其查询参数、Provider URL、请求头与 Bearer Token
- 用户名、密码、UUID、私钥、Reality key、Age secret
- WireGuard、Tailscale、ZeroTier 等网络身份
- 控制器 secret、TLS 私钥、客户端证书与自定义 CA
- 未脱敏的连接日志、DNS 地址和带鉴权的健康检查地址

## 会扩大攻击面的字段

`allow-lan`、本地端口、`dns.listen`、listeners、tunnels、服务端配置、外部
控制器、CORS、External UI 与 External DoH 都可能开放新的访问面。若没有明确
需求，保持关闭；确需使用时只绑定回环地址、设置强凭据，并确认防火墙和局域网
边界。

`skip-cert-verify: true` 会放弃对服务器证书的验证，不应作为“修复连接”的
常规手段。

## 文件与 tvOS

配置只能访问 Hako 管理的容器路径。tvOS 的文件缓存可能被系统清理，Provider、
geodata 与其他资源必须能够安全重建；不要把唯一的密钥副本只放在缓存中。

<ConfigFieldMatrix lang="zh" category="security" />
