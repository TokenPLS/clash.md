---
title: 规则集合
---

# 规则集合

规则集合把一组匹配条件集中管理。集合里写条件，`rules` 中的 `RULE-SET` 决定匹配后使用哪个出口。下面的 `Proxy` 需替换为已定义的节点或组名。

```yaml
rule-providers:
  Work:
    type: inline
    behavior: classical
    payload:
      - DOMAIN-SUFFIX,example.com
      - IP-CIDR,192.0.2.0/24,no-resolve
rules:
  - RULE-SET,Work,DIRECT
  - MATCH,Proxy
```

## 格式怎么选

| `behavior` | 内容示例 | 用途 |
| --- | --- | --- |
| `domain` | `+.example.com` | 只存域名匹配条件 |
| `ipcidr` | `192.0.2.0/24` | 只存 IP 网段 |
| `classical` | `DOMAIN-SUFFIX,example.com` | 使用路由规则语法写条件，不附加出口名 |

`format: yaml` 的远程文件用 `payload:` 包裹列表；`format: text` 每行一条；`format: mrs` 是二进制资源，只用于 `domain` 或 `ipcidr`，不能手写为文本。

## 远程规则集合

```yaml
rule-providers:
  Work:
    type: http
    url: https://rules.example.com/work.yaml
    interval: 86400
    behavior: domain
    format: yaml
```

下载的 `work.yaml` 内容为：

```yaml
payload:
  - '+.example.com'
  - 'intranet.example.net'
```

| 字段 | 填写方式 |
| --- | --- |
| `type` | `http`、`file` 或 `inline` |
| `url` | HTTP 资源地址 |
| `path` | 文件或缓存路径；HTTP 集合可省略，不同集合不要共用 |
| `interval` | 更新间隔，单位秒 |
| `proxy` | 下载使用的已存在节点或组名 |
| `header` | 自定义 HTTP 请求头，值为字符串列表 |
| `size-limit` | 下载大小上限，单位字节；`0` 不设此上限 |
| `payload` | `inline` 的规则内容 |

`behavior` 必须与文件内容一致。下载成功但匹配不到时，先检查格式，再确认 `RULE-SET` 的集合名称和规则顺序。

## 平台说明与字段状态

远程规则可由 App 预先准备，也可在启动后加载。预编译规则集的更新可能在下次激活配置时生效。tvOS 缓存可能被清理，远程规则应能重新获取。

<ConfigFieldMatrix lang="zh" category="rule-providers" />

参考：[mihomo](https://wiki.metacubex.one/config/rule-providers/).
