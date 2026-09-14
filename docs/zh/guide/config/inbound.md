---
title: TUN 与网络接入
description: 了解 Clash 的 TUN 使用方法、按应用分流、三端差异，以及各项 TUN 配置是否生效。
---

# TUN 与网络接入

## 需要另外开启 TUN 模式吗？ {#tun-mode}

**不需要，连接 Clash 即可。**Clash 在 iPhone、iPad、Mac 和 Apple TV 上使用
Apple Network Extension（NE）的 Packet Tunnel 接入网络，再按你的规则处理流量。
首次连接时，允许系统添加 VPN 配置即可。

`tun.enable: false` 不会关闭 VPN，也不会切换为仅代理端口模式。
需要停止接管网络时，请在 Clash 中断开连接。

## 日常需要配置 TUN 吗？ {#example}

**通常不用。**你可以省略整个 `tun:` 段，让 Clash 管理隧道。
如果已有完整配置，只想指定协议栈，可以加入：

```yaml
tun:
  stack: gvisor
```

支持 `gvisor`、`system` 和 `mixed`。不填写时默认使用 gVisor；Mixed 使用 System
处理 TCP、gVisor 处理 UDP。iOS/macOS 开启 Include All Networks 时，会统一使用 gVisor。

`stack: system` 是协议栈选择；Rule、Global、Direct 是流量如何选路，两者分别设置。
日常按规则使用时，选择 Rule 即可。

修改隧道设置后，断开并重新连接，再访问目标服务确认效果。
需要完整配置，可参考[配置最佳实践](/zh/guide/config/best-practice)。

## 能否只代理某个应用？ {#per-app-proxy}

可以按目标域名、IP 或规则集，让某个应用使用的服务走代理，其余目标走 `DIRECT`。
注意：`DIRECT` 表示直连出站，流量和 DNS 仍可能经过 Clash。

- **iPhone、iPad 和 Apple TV**：使用目标域名、IP 或规则集分流，不能直接按进程名选择应用。多个应用可能访问相同目标，因此目标规则不等于精确的应用筛选。
- **Mac**：还可以使用进程名、进程路径或 UID 分流规则；具体连接需要能识别到对应进程。

如果希望其他应用完全绕过 Clash，单纯设置 `DIRECT` 不够；`tun.enable: false` 和
`include-package` 等 TUN 筛选字段也不能实现这种效果。

## 三个平台有什么区别？ {#platforms}

大部分 TUN 配置在三端的处理相同，主要区别如下：

| 功能 | iOS / iPadOS | tvOS | macOS |
| --- | --- | --- | --- |
| gVisor / System / Mixed | 支持 | 支持 | 支持 |
| Include All Networks | 开启后使用 gVisor | 不启用 | 开启后使用 gVisor |
| 按进程名、路径或 UID 分流 | 不支持 | 不支持 | 支持 |

macOS 的进程/UID 分流使用规则配置；`tun.include-uid` 等字段在三端都不生效。

## TUN 字段怎么填写？ {#fields}

所有字段都放在 `tun:` 下。下面按用途列出，查找你需要的项目即可。
标注“不生效”的字段可以省略；Clash 调整运行设置时，不会改写你保存的原始 YAML。

::: details 协议栈与设备

| 字段 | 使用说明 |
| --- | --- |
| `enable` | 连接时始终开启。写 false 不会关闭 VPN 或切换为仅代理端口模式；请在 App 中断开连接。 |
| `stack` | 支持 system、gvisor、mixed；未指定时默认 gVisor。iOS/macOS 实际启用 Include All Networks 时，System/Mixed 改为 gVisor；tvOS 不启用该选项。 |
| `device` | 由 Clash 管理，填写 utun0 等名称不会指定系统网卡。 |
| `mtu` | 由 Clash 启动时统一设置，YAML 中的值不生效。 |
| `file-descriptor` | 由 Clash 管理，无需填写。 |
| `gso` | 不生效，Clash 不启用 GSO 分段卸载。 |
| `gso-max-size` | 不生效，Clash 不启用 GSO 分段卸载。 |
| `recvmsgx` | 固定关闭，无需填写。 |
| `sendmsgx` | 固定关闭，无需填写。 |

:::

::: details 路由与出口

| 字段 | 使用说明 |
| --- | --- |
| `auto-route` | 运行时设为 false，系统路由仍由 Clash 设置；不影响正常接管流量。 |
| `auto-detect-interface` | 运行时设为 false，Clash 自动管理出口网卡。 |
| `strict-route` | 没有为某个地址族指定 route-address 时，影响该地址族的默认路由拆分方式。与 Include All Networks 是不同设置。 |
| `route-address` | 指定进入隧道的目标网段。还需结合客户端路由选项、IPv6 和系统 VPN 设置。 |
| `route-exclude-address` | 指定从隧道路由中排除的目标网段。还需结合客户端路由选项、IPv6 和系统 VPN 设置。 |
| `route-address-set` | 配置可以读取，但不会把规则集转换为系统路由。普通 RULE-SET 分流仍可使用。 |
| `route-exclude-address-set` | 配置可以读取，但不会把规则集转换为系统路由。普通 RULE-SET 分流仍可使用。 |
| `auto-redirect` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `iproute2-table-index` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `iproute2-rule-index` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `auto-redirect-input-mark` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `auto-redirect-output-mark` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |
| `auto-redirect-iproute2-fallback-rule-index` | Linux 专用设置，在 Clash 的 Apple 版本中不生效。 |

:::

::: details DNS、IPv6 与连接设置

| 字段 | 使用说明 |
| --- | --- |
| `dns-hijack` | 由 Clash 统一设置为 0.0.0.0:53，接管进入隧道的 TCP/UDP 53 端口 DNS 请求。不解密 DoH/DoT。 |
| `inet6-address` | 设置隧道 IPv6 地址。关闭 TUN IPv6 时不使用；自动/启用时保留填写的地址，未填则补默认地址。最终是否启用还取决于 IP Stack 设置和网络条件。 |
| `udp-timeout` | UDP 会话状态超时，单位为秒；不影响 VPN 可以连接多久。 |
| `endpoint-independent-nat` | 配置可以读取，但更改它不会改变当前 NAT 行为。 |
| `disable-icmp-forwarding` | 固定为 true，ICMP 应答在本地生成。请用实际访问验证代理连接，不要只看 ping。 |
| `icmp-timeout` | ICMP 状态超时，单位为秒；设置它不会开启远端 ICMP 转发。 |
| `loopback-address` | 用于 TCP 回环地址处理；不用于排除网段或选择应用。 |

:::

::: details 网卡、用户、应用与端口筛选

| 字段 | 使用说明 |
| --- | --- |
| `include-interface` | 不生效，不能用它筛选来源网卡或指定出口网卡。 |
| `exclude-interface` | 不生效，不能用它筛选来源网卡或指定出口网卡。 |
| `include-uid` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `include-uid-range` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `exclude-uid` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `exclude-uid-range` | 三端均不生效。macOS 按用户或进程分流请使用分流规则。 |
| `include-mac-address` | 不生效，不能按设备 MAC 地址筛选。 |
| `exclude-mac-address` | 不生效，不能按设备 MAC 地址筛选。 |
| `include-android-user` | Android 专用设置，不生效；填写 iOS 应用标识也不能按应用筛选。 |
| `include-package` | Android 专用设置，不生效；填写 iOS 应用标识也不能按应用筛选。 |
| `exclude-package` | Android 专用设置，不生效；填写 iOS 应用标识也不能按应用筛选。 |
| `exclude-src-port` | 不生效，不能按端口排除隧道接管。 |
| `exclude-src-port-range` | 不生效，不能按端口排除隧道接管。 |
| `exclude-dst-port` | 不生效，不能按端口排除隧道接管。 |
| `exclude-dst-port-range` | 不生效，不能按端口排除隧道接管。 |

:::

::: details 旧字段

| 字段 | 使用说明 |
| --- | --- |
| `inet4-route-address` | 仍接受，与 route-address (IPv4) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |
| `inet6-route-address` | 仍接受，与 route-address (IPv6) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |
| `inet4-route-exclude-address` | 仍接受，与 route-exclude-address (IPv4) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |
| `inet6-route-exclude-address` | 仍接受，与 route-exclude-address (IPv6) 合并后传给 Apple；新字段不会覆盖旧字段，避免重复填写。 |

:::

### 配置 IPv6 时要区分什么？

- `dns.ipv6`：DNS 是否向应用提供 IPv6 解析结果。
- IP 查询模式：Clash 自身如何解析和选择地址。
- TUN IPv6：是否接管 IPv6 流量。

只修改其中一项，不会代替另外两项。IP Stack 选择自动时，还会根据当前网络决定是否启用隧道 IPv6。

## 其他入站设置

本地代理端口、`allow-lan`、listeners 和外部控制器用于提供本地服务，按需设置即可。
Linux 的 `routing-mark`、iptables、TPROXY 路由，以及用 `interface-name` 指定出口，在这里不适用。

其他字段可在[完整配置参考](/zh/guide/config/)中搜索。

## 版本说明 {#scope}

本文适用于 Clash 的 Apple 版本。部分设置随版本更新而变化，请以已安装版本提供的功能为准。

::: details 文档参考版本

更新于 2026-09-14，依据 Hako `5bca0bcb73cd6dcb2d276be31f3a149211388c6d`。
此参考版本不代表所有 App Store 版本均已包含相同功能，尤其是 IP Stack 的“跟随配置”选项。
字段名称可对照 [mihomo TUN 文档](https://wiki.metacubex.one/config/inbound/tun/)。

:::
