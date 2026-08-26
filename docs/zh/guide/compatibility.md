---
title: Clash 与 mihomo、sing-box、Surge、Quantumult X、Shadowrocket、Stash、Loon 的兼容性
description: 汇总 Clash 与 mihomo、sing-box、Surge、Quantumult X、Shadowrocket 小火箭、Stash 和 Loon 的配置地址、YAML 文件、节点迁移方式与协议兼容性。
head:
  - - link
    - rel: canonical
      href: https://clash.md/zh/guide/compatibility
  - - link
    - rel: alternate
      hreflang: en-US
      href: https://clash.md/guide/compatibility
  - - script
    - type: application/ld+json
    - '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"如何把 sing-box 节点迁移到 Clash？","acceptedAnswer":{"@type":"Answer","text":"优先使用服务商提供且返回 mihomo YAML 的配置地址，也可以根据协议与参数在 Clash 节点编辑器中重新添加。"}},{"@type":"Question","name":"如何迁移 Surge 或 Quantumult X 节点？","acceptedAnswer":{"@type":"Answer","text":"使用返回 mihomo YAML 的配置地址，或在节点编辑器中按原服务器与协议参数添加节点。"}},{"@type":"Question","name":"Shadowrocket 小火箭的远程配置可以用于 Clash 吗？","acceptedAnswer":{"@type":"Answer","text":"服务商能够通过 HTTPS 配置地址返回 mihomo YAML 时即可使用；规则与模块可以用 Clash 的规则和对应功能重新建立。"}},{"@type":"Question","name":"如何使用 ss:// 或 Base64 节点列表？","acceptedAnswer":{"@type":"Answer","text":"可以先整理为 mihomo YAML，或根据其中的服务器、端口、凭据和协议参数在 Clash 节点编辑器中添加。"}}]}'
---

# Clash 与常见代理软件的兼容性

**先说结论：** Clash 可以直接读取 mihomo 格式的 YAML 配置，以及返回 mihomo YAML 的 HTTPS 配置地址，也能读取 Stash 使用的标准 Clash / mihomo YAML。来自 sing-box、Surge、Quantumult X、Shadowrocket 或 Loon 的服务器和节点，可以通过兼容配置地址或按参数添加继续使用。

## 按你现在使用的软件查看

| 你现在使用的软件 | 推荐的配置方式 | 节点使用方式 | 详细说明 |
| --- | --- | --- | --- |
| Clash / mihomo | 直接使用标准 mihomo YAML | 直接使用 | [mihomo 兼容说明](/zh/guide/compatibility/mihomo) |
| sing-box | 使用返回 mihomo YAML 的配置地址，或整理为 YAML | 按支持的协议参数添加 | [sing-box 兼容说明](/zh/guide/compatibility/sing-box) |
| Surge | 使用返回 mihomo YAML 的配置地址，或重建节点 | 支持 Snell 等共同协议 | [Surge 兼容说明](/zh/guide/compatibility/surge) |
| Quantumult X | 使用返回 mihomo YAML 的配置地址 | 也可按参数添加 | [Quantumult X 兼容说明](/zh/guide/compatibility/quantumult-x) |
| Shadowrocket（小火箭） | 使用返回 mihomo YAML 的配置地址 | 也可按参数添加 | [Shadowrocket 兼容说明](/zh/guide/compatibility/shadowrocket) |
| Stash | 直接使用标准 Clash / mihomo YAML | 直接使用 | [Stash 兼容说明](/zh/guide/compatibility/stash) |
| Loon | 使用返回 mihomo YAML 的配置地址 | 也可按参数添加 | [Loon 兼容说明](/zh/guide/compatibility/loon) |

## “兼容”分为三层

1. **配置文件兼容**：整个配置文件可以直接复用。
2. **远程配置兼容**：通过 HTTPS 配置地址获取 Clash 可直接读取的 mihomo YAML。
3. **协议互通**：使用同一台服务器直接连接。

Clash 在远程配置与协议互通层覆盖广泛。产品专用设置可以用 mihomo YAML、
Clash 规则与对应功能重新建立。

## Clash 可以直接导入什么？

| 来源 | 结果 |
| --- | --- |
| mihomo YAML 配置 | 直接导入 |
| 返回 mihomo YAML 的 HTTPS 配置地址 | 直接添加 URL；可切换 Profile User-Agent |
| `ss://` 等单节点分享链接 | 转换成 mihomo YAML，或根据参数在节点编辑器添加 |
| Base64 节点列表 | 整理为 mihomo YAML 后导入 |
| 包含 HTTPS 配置地址的二维码 | 扫码添加远程配置 |

完整范围请参阅[支持的协议](/zh/guide/protocols)。

## 远程请求如何标识 Clash

Clash 客户端获取远程 Profile，以及 HTTP Proxy Provider 或 Rule Provider 时，
默认发送以下 `User-Agent`：

```http
User-Agent: clash.meta/<core> Hako/v<app>.<build> Darwin/<release> <model>
```

- `<core>` 是客户端内置的 Hako / mihomo 内核版本。
- `<app>` 与 `<build>` 分别是 Clash App 版本和内部构建号。
- `<release>` 是 Darwin 内核版本，不是“macOS 26”或“iOS 26”这样的产品版本。
- `<model>` 是 Apple 硬件型号标识，不是用户设置的设备名称。

当前三个客户端发出的格式示例如下：

```text
macOS  clash.meta/1.19.30 Hako/v1.0.2.33 Darwin/25.6.0 Mac16,5
iOS    clash.meta/1.19.30 Hako/v1.0.1.1 Darwin/25.6.0 iPhone18,2
tvOS   clash.meta/1.19.30 Hako/v1.0.3.1 Darwin/25.6.0 AppleTV6,2
```

接收请求的配置或 Provider 服务器可以看到上述版本与设备信息。该请求头不包含
账户、用户设置的设备名称或广告标识符，但会公开具体 App 构建、Darwin 版本与
硬件型号。

如果所选 Profile 使用自定义或兼容 User-Agent，该值会替代默认格式；Provider
配置显式指定 `User-Agent` 请求头时，Provider 自己的值优先。因此服务器日志中
看到的实际值可能不同。

## 常见问答

### Shadowrocket 小火箭的远程配置可以继续使用吗？

服务商能够通过该 HTTPS 配置地址返回 mihomo 兼容 YAML 时即可使用。小火箭
的规则、模块和 App 设置可以用 Clash 的规则与对应功能重新建立，具体请看
[Shadowrocket 兼容说明](/zh/guide/compatibility/shadowrocket)。

### 服务商提供的配置地址可以继续使用吗？

只要服务商能够返回 mihomo 兼容 YAML，就可以。Clash 允许切换 Profile User-Agent，适配按客户端名称选择输出格式的面板。

### 可以继续使用同一台服务器吗？

只要协议和全部必要参数都受支持，同一台服务器即可直接使用。

### 提到这些品牌是否代表存在合作关系？

这些品牌名称仅用于说明配置与协议兼容性。Clash 与 Hako 由独立团队开发和
维护。
