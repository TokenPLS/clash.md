---
title: 代理、策略组与 Provider
description: Hako 的代理节点、策略组、Proxy Provider 与 Rule Provider 配置参考及 iOS、macOS、tvOS 差异。
---

# 代理、策略组与 Provider

Hako 1.19.30 识别 23 类代理或网络出站，以及 `DIRECT`、`DNS`、`REJECT`、
`REMATCH` 四类路由或控制出站。协议与验证范围见[支持的协议](/zh/guide/protocols)。

## 策略组

当前支持 `select`、`url-test`、`fallback` 与 `load-balance`。上游已经移除
`relay` 策略组，不应再写进新配置。健康检查 URL 会产生真实网络请求，应选择
稳定且符合自己隐私预期的地址。

## Provider

- `inline` 内容由内核直接读取。
- `file` 只能使用产品管理的安全路径，不能任意访问设备文件系统。
- HTTP Provider 由客户端下载、校验并原子写入安全路径，再交给内核读取。
- tvOS 缓存可能被系统清理，因此远程资源必须能够重新获取或生成。

<ConfigFieldMatrix lang="zh" category="proxies" />
<ConfigFieldMatrix lang="zh" category="proxy-groups" />
<ConfigFieldMatrix lang="zh" category="providers" />
