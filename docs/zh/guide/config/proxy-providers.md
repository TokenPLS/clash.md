---
title: 代理集合
---

# 代理集合

代理集合用于集中加载节点。把下面的 `url` 换成返回节点 YAML 的订阅地址；组的 `use` 引用集合名称。

```yaml
proxy-providers:
  Subscription:
    type: http
    url: https://subscription.example.com/nodes.yaml
    interval: 3600
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300
      timeout: 5000
    override:
      additional-prefix: "Sub-"
proxy-groups:
  - name: Proxy
    type: select
    use: [Subscription]
rules:
  - MATCH,Proxy
```

## 集合字段

| 字段 | 填写方式 |
| --- | --- |
| 集合名称 | 示例为 `Subscription`，必须唯一 |
| `type` | `http` 下载资源；`file` 读取本地文件；`inline` 直接写入节点 |
| `url` | `http` 集合的下载地址 |
| `path` | 本地资源或缓存路径；不同集合不要共用路径。HTTP 集合可省略，由客户端管理 |
| `interval` | 资源更新间隔，单位秒，与健康检查间隔分别设置 |
| `proxy` | 下载所用节点或组名；避免依赖尚未下载的集合自身 |
| `header` | 请求头，值使用字符串列表，例如 `Authorization: ["Bearer YOUR_TOKEN"]` |
| `filter` / `exclude-filter` | 按节点名称匹配正则，保留或排除节点 |
| `override` | 覆盖加载后的节点设置；前缀 `additional-prefix` 和后缀 `additional-suffix` 可避免重名 |
| `health-check` | `enable` 开关、`url` 地址、`interval` 秒、`timeout` 毫秒、`lazy` 按需检查 |

## 下载文件的格式

远程节点文件使用 `proxies` 列表，每项的写法与[出站代理](./proxies)相同：

```yaml
proxies:
  - name: Node-A
    type: trojan
    server: proxy.example.com
    port: 443
    password: YOUR_PASSWORD
    sni: proxy.example.com
    udp: true
```

若使用 `type: inline`，去掉 `url`，把上述节点列表放在集合的 `payload` 下。`file` 则用 `path` 指向已准备好的资源；Apple 设备只能读取 App 可访问的文件。

## 平台说明与字段状态

远程资源可以由 App 预先准备，也可在连接后由内核后台加载。节点尚未就绪时查看集合状态。tvOS 缓存可能被清理，远程地址应保持可重新获取。

<ConfigFieldMatrix lang="zh" category="proxy-providers" />

参考：[mihomo](https://wiki.metacubex.one/config/proxy-providers/).
