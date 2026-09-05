---
layout: doc
title: Clash Apple 原生客户端
titleTemplate: Clash Apple 原生客户端
description: Clash 是面向 iPhone、iPad、Mac 与 Apple TV 的原生规则分流工具，基于 mihomo，客户端与 Hako 内核均已完整开源。
keywords:
  - Clash Apple全平台
  - Clash iOS
  - Clash macOS
  - Clash tvOS
  - 开源代理内核
  - mihomo Apple客户端
jsonLd:
  "@context": https://schema.org
  "@graph":
    - "@type": Organization
      "@id": https://clash.md/#organization
      name: Clash & Hako Team
      url: https://clash.md/
      logo: https://clash.md/brand/clash-app-icon.png
      sameAs:
        - https://github.com/TokenPLS
        - https://t.me/clashbyhako
        - https://x.com/ClashbyHako
    - "@type": WebSite
      "@id": https://clash.md/#website
      url: https://clash.md/
      name: Clash
      alternateName: Clash Apple 原生客户端
      publisher:
        "@id": https://clash.md/#organization
      about:
        "@id": https://clash.md/#app
      inLanguage:
        - en-US
        - zh-CN
    - "@type": SoftwareApplication
      "@id": https://clash.md/#app
      name: Clash
      description: Clash 是面向 iPhone、iPad、Mac 与 Apple TV 的原生规则分流工具，基于 mihomo，客户端与 Hako 内核均已完整开源。
      applicationCategory: UtilitiesApplication
      operatingSystem:
        - iOS
        - iPadOS
        - macOS
        - tvOS
      url: https://clash.md/
      downloadUrl: https://apps.apple.com/app/id6794257189
      softwareHelp: https://clash.md/zh/guide/
      image: https://clash.md/og-clash.png
      screenshot:
        - https://clash.md/screenshots/hero/apple-product-lockup-light.webp
        - https://clash.md/screenshots/hero/apple-product-lockup-dark.webp
      codeRepository:
        - https://github.com/TokenPLS/Hako-Client
        - https://github.com/TokenPLS/Hako
      publisher:
        "@id": https://clash.md/#organization
      inLanguage: zh-CN
sidebar: false
aside: false
outline: false
pageClass: clash-home
---

<section class="product-hero">
  <div class="product-hero-copy">
    <p class="product-eyebrow">基于规则的网络代理工具 · 由 Hako 驱动</p>
    <h1><span class="product-hero-title-main"><span class="product-hero-title-brand">Clash</span><span class="product-hero-title-rest">，经典回归</span></span><span class="product-hero-title-sub">这次是 Apple 原生</span></h1>
    <p class="product-lede"><span class="product-lede-hook">还是原来的配置，还是熟悉的规则。</span><span class="product-lede-proof">基于 mihomo，原生客户端与 Hako 内核均已完整开源。</span></p>
    <div class="product-actions">
      <AppStoreBadge locale="zh" />
    </div>
    <p class="product-platform-line">iPhone <span>·</span> iPad <span>·</span> Mac <span>·</span> Apple TV</p>
  </div>
  <div class="product-hero-visual" role="img" aria-label="运行在 Apple TV、Mac、iPad 与 iPhone 上的 Clash 英文界面">
    <img class="product-device-lockup product-device-lockup--light" src="/screenshots/hero/apple-product-lockup-official-light.webp" alt="" width="3460" height="1300" fetchpriority="high" aria-hidden="true">
    <img class="product-device-lockup product-device-lockup--dark" src="/screenshots/hero/apple-product-lockup-official-dark.webp" alt="" width="3460" height="1300" fetchpriority="high" aria-hidden="true">
  </div>
</section>

<section class="open-source-proof" aria-labelledby="open-source-proof-title">
  <div class="open-source-proof-copy">
    <p class="section-kicker">向经典致敬 · 向开源致敬</p>
    <h2 id="open-source-proof-title"><span>保护隐私的工具，</span><span>不该要求你盲目信任。</span></h2>
    <p>代理客户端能接触你的配置、DNS 与每一次经过它的连接，它最不应该是一个黑盒。你不必只听我们保证“什么都没做”：Clash 原生客户端与 Hako 内核均已完整开源，任何人都能检查完整实现。</p>
  </div>
  <div class="open-source-proof-links">
    <a href="https://github.com/TokenPLS/Hako-Client" target="_blank" rel="noopener noreferrer"><span>原生客户端</span><strong>TokenPLS/Hako-Client ↗</strong></a>
    <a href="/zh/hako"><span>驱动 Clash 的 Hako 内核</span><strong>了解 Hako →</strong></a>
    <a href="/zh/guide/privacy-model"><span>隐私模型</span><strong>看看我们不收集什么 →</strong></a>
  </div>
</section>

<section class="platform-stage" aria-labelledby="platform-stage-title">
  <div class="platform-stage-heading">
    <p class="section-kicker">配置不变 · 规则不变</p>
    <h2 id="platform-stage-title">换了屏幕，不用换习惯。</h2>
    <p>同一个 Hako 内核，同一套配置逻辑。从 iPhone、iPad、Mac 到 Apple TV，改变的只是交互方式——每个平台都原生。</p>
  </div>
  <div class="platform-stage-grid">
    <article class="platform-preview platform-preview--mobile">
      <div class="platform-preview-copy">
        <span>iPhone + iPad</span>
        <h3>移动设备</h3>
        <p>为 iPhone 与 iPad 打造的触控界面。轻盈、直接，需要时就在手边。</p>
        <a class="platform-preview-link" href="/zh/platforms/ios">了解 iPhone + iPad →</a>
      </div>
      <div class="platform-preview-media platform-preview-media--mobile">
        <img class="platform-ipad" src="/screenshots/platforms/ios/ipad-home.webp" alt="iPad 上的 Clash 首页" loading="lazy">
        <img class="platform-iphone" src="/screenshots/platforms/ios/iphone-home.webp" alt="iPhone 上的 Clash 首页" loading="lazy">
      </div>
    </article>
    <article class="platform-preview platform-preview--mac">
      <div class="platform-preview-copy">
        <span>Mac</span>
        <h3>桌面系统</h3>
        <p>为 Mac 打造的原生桌面界面。融入窗口、键鼠与菜单栏，也融入你的日常工作流。</p>
        <a class="platform-preview-link" href="/zh/platforms/macos">了解 Mac →</a>
      </div>
      <div class="platform-preview-media">
        <img src="/screenshots/platforms/macos/home-zh.webp" alt="Mac 上的 Clash 原生窗口" loading="lazy">
      </div>
    </article>
    <article class="platform-preview platform-preview--tv">
      <div class="platform-preview-copy">
        <span>Apple TV</span>
        <h3>客厅电视</h3>
        <p>为 Apple TV 打造的大屏界面。适配焦点导航与 Siri Remote，坐在沙发上也能从容操作。</p>
        <a class="platform-preview-link" href="/zh/platforms/tvos">了解 Apple TV →</a>
      </div>
      <div class="platform-preview-media">
        <img src="/screenshots/platforms/tvos/home.webp" alt="为 Apple TV 与 Siri Remote 设计的 Clash" loading="lazy">
      </div>
    </article>
  </div>
</section>
