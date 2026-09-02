---
layout: doc
title: Hako Apple 代理内核
description: Hako 是驱动 Clash、面向 Apple NetworkExtension 调校的 mihomo 代理内核，公开提供源码、SDK 发行版、构建信息与真机实测。
keywords:
  - Hako内核
  - mihomo Apple内核
  - NetworkExtension代理内核
  - 开源网络内核
  - Hako xcframework
jsonLd:
  "@context": https://schema.org
  "@graph":
    - "@type": WebPage
      "@id": https://clash.md/zh/hako#webpage
      url: https://clash.md/zh/hako
      name: Hako Apple 代理内核
      description: Hako 是驱动 Clash、面向 Apple NetworkExtension 调校的 mihomo 代理内核，公开提供源码、SDK 发行版、构建信息与真机实测。
      inLanguage: zh-CN
      isPartOf:
        "@id": https://clash.md/#website
      mainEntity:
        "@id": https://clash.md/#hako
      publisher:
        "@id": https://clash.md/#organization
      primaryImageOfPage:
        "@type": ImageObject
        contentUrl: https://clash.md/brand/hako-logo.png
    - "@type": SoftwareSourceCode
      "@id": https://clash.md/#hako
      name: Hako
      description: 驱动 Clash、面向 Apple NetworkExtension 调校的 mihomo 代理内核，公开提供源码与 SDK 发行版。
      url: https://clash.md/zh/hako
      image: https://clash.md/brand/hako-logo.png
      codeRepository: https://github.com/TokenPLS/Hako
      sameAs: https://github.com/TokenPLS/Hako
      license: https://www.gnu.org/licenses/gpl-3.0.html
      programmingLanguage: Go
      runtimePlatform:
        - iOS
        - iPadOS
        - macOS
        - tvOS
      isBasedOn: https://github.com/MetaCubeX/mihomo
      isPartOf:
        "@id": https://clash.md/#app
      publisher:
        "@id": https://clash.md/#organization
      inLanguage: zh-CN
sidebar: false
aside: false
outline: false
pageClass: hako-product-page
---

<section class="hako-hero">
  <div class="hako-hero-copy">
    <p class="product-eyebrow">High-performance Adaptive Kernel · Open-source releases</p>
    <h1><span>快，是实测。</span><span>信任，是开源。</span></h1>
    <p class="hako-hero-lede">Hako 是驱动 Clash 的代理内核。它基于成熟的 mihomo，为 Apple NetworkExtension 的内存、能效与系统边界重新调校——流量在设备上处理，性能有真机数据，已公开版本的源码与构建产物可以直接核对。</p>
    <div class="product-actions">
      <a class="product-action product-action--primary" href="https://github.com/TokenPLS/Hako/releases/tag/v1.19.30-hako.1" target="_blank" rel="noopener noreferrer">下载最新开源 SDK</a>
      <a class="product-action product-action--secondary" href="https://github.com/TokenPLS/Hako" target="_blank" rel="noopener noreferrer">查看已公开源码</a>
    </div>
  </div>
  <div class="hako-release-panel" aria-label="Hako 当前产品内核与最新开源 SDK">
    <img class="hako-logo" src="/brand/hako-logo.png" alt="Hako 立方体标志" width="256" height="256">
    <p>当前产品内核</p>
    <strong>mihomo 1.19.30</strong>
    <div class="hako-public-release"><span>最新开源 SDK</span><a href="https://github.com/TokenPLS/Hako/releases/tag/v1.19.30-hako.1" target="_blank" rel="noopener noreferrer">Hako v1.19.30-hako.1 ↗</a></div>
    <div class="hako-platform-chips"><span>iOS</span><span>iPadOS</span><span>macOS</span><span>tvOS</span></div>
  </div>
</section>

<section class="hako-section hako-story" aria-labelledby="hako-story-title">
  <div class="hako-section-heading">
    <p class="section-kicker">Clash 的心脏</p>
    <h2 id="hako-story-title">流量经过哪里，<br>信任就该落在哪里。</h2>
    <p>Clash 的界面负责让网络变得简单，真正处理连接、DNS 与规则的是 Hako。它不要求你只相信一句承诺：运行边界写进实现，已发布版本的代码和构建产物都可以核对。</p>
  </div>
  <div class="hako-principle-grid">
    <article>
      <span>01</span>
      <h3>只走 Apple 公开接口</h3>
      <p>运行在 NetworkExtension 中，通过公开的 <code>NEPacketTunnelFlow</code> 收发数据包，不依赖私有 API 或文件描述符技巧。</p>
    </article>
    <article>
      <span>02</span>
      <h3>控制留在设备本地</h3>
      <p>状态、流量、连接与日志走 App 私有的本机通道，不额外开放一个能从网络访问的控制器。</p>
    </article>
    <article>
      <span>03</span>
      <h3>配置由客户端管理</h3>
      <p>Hako 不下载或保存配置地址与凭据。客户端准备运行配置，Hako 只负责执行其中的规则。</p>
    </article>
  </div>
</section>

<section class="hako-section hako-benchmarks" aria-labelledby="hako-benchmarks-title">
  <div class="hako-section-heading hako-section-heading--light">
    <p class="section-kicker">iPad Pro（M2）真机实测</p>
    <h2 id="hako-benchmarks-title">不靠“应该很快”。<br>直接看它跑了多快。</h2>
  </div>
  <div class="hako-metric-grid">
    <article><strong>924<small> Mbps</small></strong><span>公网下行</span><p>545 Mbps 上行 · 延迟 5 ms</p></article>
    <article><strong>18.7<small> MiB</small></strong><span>测速时内核内存</span><p>高吞吐同时保持轻量</p></article>
    <article><strong>16.49<small> GB</small></strong><span>30 分钟压力测试</span><p>0 掉线 · 0 丢包 · 0 崩溃</p></article>
    <article><strong>39.6<small> MiB</small></strong><span>400 条并发连接</span><p>保持在 50 MiB 测试预算内</p></article>
  </div>
  <p class="hako-benchmark-note">测速结果受测试网络本身的带宽上限约束。这些数字来自指定设备、网络与构建下的受控测试；实际表现会随设备、线路与配置变化。</p>
</section>

<section class="hako-section hako-trust" aria-labelledby="hako-trust-title">
  <div class="hako-section-heading">
    <p class="section-kicker">公开发行 · 可独立审阅</p>
    <h2 id="hako-trust-title">性能可以测，<br>安全也应该能查。</h2>
    <p>Hako 只跟随 mihomo 的稳定版本，Clash 当前搭载 1.19.30。公开发行的 Hako SDK 以 GPL-3.0 发布，源码、版本与构建产物都对应同一份带标签的快照。</p>
  </div>
  <div class="hako-release-facts">
    <article><span>当前产品内核</span><strong>mihomo 1.19.30</strong><p>五个 Apple slice 现已开源发布</p></article>
    <article><span>最新开源 SDK</span><strong>v1.19.30-hako.1</strong><p>源码与构建产物已在 GitHub 公开</p></article>
    <article><span>Apple 架构</span><strong>5 个 Slice</strong><p>iOS 真机与模拟器、macOS、tvOS 真机与模拟器</p></article>
  </div>
</section>

<section class="hako-section hako-capabilities" aria-labelledby="hako-capabilities-title">
  <div class="hako-section-heading">
    <p class="section-kicker">成熟的数据面</p>
    <h2 id="hako-capabilities-title">Clash 熟悉的能力，<br>装进 Apple 的系统边界。</h2>
  </div>
  <div class="hako-capability-grid">
    <article><span>协议</span><h3>常见线路都能接</h3><p>Shadowsocks、VMess、VLESS、Trojan、Snell、Hysteria2、TUIC、WireGuard、AnyTLS、SSH 等。</p></article>
    <article><span>DNS</span><h3>解析也按规则走</h3><p>支持 DoH、DoT、DoQ、fake-IP、流量嗅探与按域名选择解析器。</p></article>
    <article><span>路由</span><h3>该直连的直连</h3><p>支持 domain、IP-CIDR、GEOIP、GEOSITE、RULE-SET 与逻辑规则。</p></article>
    <article><span>策略组</span><h3>选择、测速与故障切换</h3><p>支持 select、url-test、fallback、load-balance、健康检查与远程 Provider。</p></article>
    <article><span>本机控制</span><h3>运行状态看得见</h3><p>状态、流量、连接、代理、日志、延迟测试与断开连接均可由 App 在本地控制。</p></article>
    <article><span>平台差异</span><h3>macOS 多一层进程规则</h3><p>macOS 支持按进程名、可执行路径和 UID 分流；当前不支持签名 ID 或 Team ID。受 Packet Tunnel 限制，iPhone、iPad 与 Apple TV 不支持按 App 或进程识别。</p></article>
  </div>
</section>

<section class="hako-cta" aria-labelledby="hako-cta-title">
  <p class="section-kicker">不必只听我们说</p>
  <h2 id="hako-cta-title">想看代码，直接看。</h2>
  <p>检查实现、锁定发行版本，或私下报告安全问题。验证 Hako 不需要任何人的许可。</p>
  <div class="hako-cta-links">
    <a href="https://github.com/TokenPLS/Hako" target="_blank" rel="noopener noreferrer">查看已公开源码 ↗</a>
    <a href="https://github.com/TokenPLS/Hako/releases/tag/v1.19.30-hako.1" target="_blank" rel="noopener noreferrer">下载最新开源 SDK ↗</a>
    <a href="https://github.com/TokenPLS/Hako/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer">报告安全问题 ↗</a>
  </div>
</section>
