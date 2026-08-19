---
layout: doc
title: Clash for Apple Platforms
titleTemplate: Clash for Apple Platforms
description: Clash is a native, rule-based proxy utility for iPhone, iPad, Mac, and Apple TV, built on mihomo with an open-source client and public Hako releases.
keywords:
  - Clash for Apple platforms
  - Clash iOS
  - Clash macOS
  - Clash tvOS
  - open-source proxy core
  - mihomo Apple client
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
    - "@type": WebSite
      "@id": https://clash.md/#website
      url: https://clash.md/
      name: Clash
      alternateName: Clash for Apple Platforms
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
      description: Clash is a native, rule-based proxy utility for iPhone, iPad, Mac, and Apple TV, built on mihomo with an open-source client and public Hako releases.
      applicationCategory: UtilitiesApplication
      operatingSystem:
        - iOS
        - iPadOS
        - macOS
        - tvOS
      url: https://clash.md/
      downloadUrl: https://apps.apple.com/app/id6794257189
      softwareHelp: https://clash.md/guide/
      image: https://clash.md/og-clash.png
      screenshot:
        - https://clash.md/screenshots/hero/apple-product-lockup-light.webp
        - https://clash.md/screenshots/hero/apple-product-lockup-dark.webp
      codeRepository:
        - https://github.com/TokenPLS/Hako-Client
        - https://github.com/TokenPLS/Hako
      publisher:
        "@id": https://clash.md/#organization
      inLanguage: en-US
sidebar: false
aside: false
outline: false
pageClass: clash-home
---

<section class="product-hero">
  <div class="product-hero-copy">
    <p class="product-eyebrow">Rule-based proxy utility · powered by Hako</p>
    <h1><span class="product-hero-title-main"><span class="product-hero-title-brand">Clash</span><span class="product-hero-title-rest"> is back.</span></span><span class="product-hero-title-sub">This time, it’s native.</span></h1>
    <p class="product-lede"><span class="product-lede-hook">Same profiles. Same rules. Clash, the way you remember it.</span><span class="product-lede-proof">Built on mihomo, with the native client open source and Hako releases open to inspection.</span></p>
    <div class="product-actions">
      <a class="product-action product-action--primary" href="https://apps.apple.com/app/id6794257189" target="_blank" rel="noopener noreferrer">View on the App Store</a>
      <a class="product-action product-action--secondary" href="https://testflight.apple.com/join/QJWrVrxT" target="_blank" rel="noopener noreferrer">Join TestFlight</a>
    </div>
    <p class="product-platform-line">iPhone <span>·</span> iPad <span>·</span> Mac <span>·</span> Apple TV</p>
  </div>
  <div class="product-hero-visual" role="img" aria-label="Clash running on Apple TV, Mac, iPad, and iPhone">
    <img class="product-device-lockup product-device-lockup--light" src="/screenshots/hero/apple-product-lockup-official-light.webp" alt="" width="3460" height="1300" fetchpriority="high" aria-hidden="true">
    <img class="product-device-lockup product-device-lockup--dark" src="/screenshots/hero/apple-product-lockup-official-dark.webp" alt="" width="3460" height="1300" fetchpriority="high" aria-hidden="true">
  </div>
</section>

<section class="open-source-proof" aria-labelledby="open-source-proof-title">
  <div class="open-source-proof-copy">
    <p class="section-kicker">A tribute to the classic · A commitment to open source</p>
    <h2 id="open-source-proof-title"><span>A privacy tool</span><span>should never ask for blind trust.</span></h2>
    <p>A proxy client can access your profiles, DNS lookups, and every connection it handles. That should never be a black box. You do not have to take our word for what Clash does: the native client is open source, and Hako publishes source and SDK releases anyone can inspect.</p>
  </div>
  <div class="open-source-proof-links">
    <a href="https://github.com/TokenPLS/Hako-Client" target="_blank" rel="noopener noreferrer"><span>Native client</span><strong>TokenPLS/Hako-Client ↗</strong></a>
    <a href="/hako"><span>The core behind Clash</span><strong>Meet Hako →</strong></a>
    <a href="/guide/privacy-model"><span>Privacy model</span><strong>See what we never collect →</strong></a>
  </div>
</section>

<section class="platform-stage" aria-labelledby="platform-stage-title">
  <div class="platform-stage-heading">
    <p class="section-kicker">Same profiles · Same rules</p>
    <h2 id="platform-stage-title">Switch screens, not habits.</h2>
    <p>One Hako core and the same configuration model across iPhone, iPad, Mac, and Apple TV. Only the interaction changes—native on every platform.</p>
  </div>
  <div class="platform-stage-grid">
    <article class="platform-preview platform-preview--mobile">
      <div class="platform-preview-copy">
        <span>iPhone + iPad</span>
        <h3>Mobile devices</h3>
        <p>A touch-first interface for iPhone and iPad. Lightweight, direct, and there when you need it.</p>
        <a class="platform-preview-link" href="/platforms/ios">Explore iPhone + iPad →</a>
      </div>
      <div class="platform-preview-media platform-preview-media--mobile">
        <img class="platform-ipad" src="/screenshots/platforms/ios/ipad-home.webp" alt="Clash home on iPad" loading="lazy">
        <img class="platform-iphone" src="/screenshots/platforms/ios/iphone-home.webp" alt="Clash home on iPhone" loading="lazy">
      </div>
    </article>
    <article class="platform-preview platform-preview--mac">
      <div class="platform-preview-copy">
        <span>Mac</span>
        <h3>Desktop</h3>
        <p>A native desktop interface for Mac. Built around windows, keyboard, pointer, and menu bar to fit the way you work.</p>
        <a class="platform-preview-link" href="/platforms/macos">Explore Mac →</a>
      </div>
      <div class="platform-preview-media">
        <img src="/screenshots/platforms/macos/home-en.webp" alt="Clash native window on Mac" loading="lazy">
      </div>
    </article>
    <article class="platform-preview platform-preview--tv">
      <div class="platform-preview-copy">
        <span>Apple TV</span>
        <h3>Living-room TV</h3>
        <p>A big-screen interface for Apple TV. Designed for focus navigation and Siri Remote, so it stays comfortable from the sofa.</p>
        <a class="platform-preview-link" href="/platforms/tvos">Explore Apple TV →</a>
      </div>
      <div class="platform-preview-media">
        <img src="/screenshots/platforms/tvos/home.webp" alt="Clash designed for Apple TV and the Siri Remote" loading="lazy">
      </div>
    </article>
  </div>
</section>
