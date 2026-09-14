---
title: 路由规则
---

# 路由规则

每条规则由“类型、条件、出口”组成。先定义 `Proxy` 节点或组，再使用下面的规则。示例让 `example.com` 及其子域走代理、指定内网地址直连、拒绝其余 UDP 443，最后将剩余流量直连。

```yaml
rules:
  - DOMAIN-SUFFIX,example.com,Proxy
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - AND,((NETWORK,UDP),(DST-PORT,443)),REJECT
  - MATCH,DIRECT
```

## 顺序和出口

从上到下匹配，所以 `example.com` 的规则优先于后面的 UDP 443 规则。把更具体的条件放前面，`MATCH` 放最后。出口可写节点名、组名、`DIRECT` 或 `REJECT`。想让其余流量都走代理，把最后一行改为 `MATCH,Proxy`。

## 常用匹配条件

| 类型 | 示例条件 | 匹配范围 |
| --- | --- | --- |
| `DOMAIN` | `www.example.com` | 完整域名 |
| `DOMAIN-SUFFIX` | `example.com` | 域名本身和其子域 |
| `DOMAIN-KEYWORD` | `example` | 域名中出现的文字 |
| `DOMAIN-WILDCARD` | `*.example.com` | `*` / `?` 通配模式 |
| `DOMAIN-REGEX` | `^api[0-9]+\.example\.com$` | 正则表达式 |
| `IP-CIDR` / `IP-CIDR6` | `192.0.2.0/24` / `2001:db8::/32` | 目标 IP 网段 |
| `GEOIP` / `IP-ASN` | `CN` / `13335` | IP 地区或自治系统，需要相应数据 |
| `GEOSITE` | `category-ads-all` | 域名数据集中的分类，需有该分类数据 |
| `DST-PORT` / `SRC-PORT` | `443` / `10000-20000` | 目标或来源端口 |
| `NETWORK` | `TCP` / `UDP` | 连接传输类型 |
| `RULE-SET` | `Work` | 引用[规则集合](./rule-providers) |
| `SUB-RULE` | `(NETWORK,UDP),UDP-Traffic` | 进入[子规则](./sub-rules) |

`no-resolve` 放在目标 IP 规则末尾，表示不要为了这条规则额外解析域名；已有 IP 信息仍可参与匹配。它不会关闭整个 DNS。

## 组合条件与来源信息

`AND` 要求全部子条件满足，`OR` 任一满足，`NOT` 取反。子条件中不写出口，出口统一放在末尾，例如 `AND,((NETWORK,UDP),(DST-PORT,443)),REJECT`。

`SRC-IP-CIDR`、`SRC-GEOIP`、`SRC-IP-ASN` 匹配来源地址；`IN-NAME`、`IN-TYPE`、`IN-PORT`、`IN-USER` 匹配入站信息。这些信息取决于连接的实际入口，不能用来代替应用身份。按进程匹配的三平台差异见下方。

## 按进程分流

**macOS 支持进程名、进程路径和 UID 分流**，但部分连接可能无法取得对应进程信息。

iOS/iPadOS 和 tvOS 无法可靠地按这些进程身份分流，请改用目标域名、IP、端口或网络类型。
进程正则或通配规则仍可能匹配空身份，不要用 `.*` 或 `*` 来判断已经识别到应用。
这些平台会移除不支持的 UID 规则；包含 UID 条件的逻辑规则也可能整条移除。

App 签名和 Team ID 不能用于此处的规则匹配。

规则资源见[规则集合](./rule-providers)，规则分组见[子规则](./sub-rules)。

<ConfigFieldMatrix lang="zh" category="rules" />

参考：[mihomo](https://wiki.metacubex.one/config/rules/).
