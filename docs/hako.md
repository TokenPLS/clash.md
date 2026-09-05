---
layout: doc
title: Hako Apple Proxy Core
description: Hako is the fully open-source, mihomo-based Apple proxy core that powers Clash, with SDK releases, build details, and measurements on real Apple hardware.
keywords:
  - Hako core
  - mihomo Apple core
  - NetworkExtension proxy core
  - open-source network core
  - Hako xcframework
jsonLd:
  "@context": https://schema.org
  "@graph":
    - "@type": WebPage
      "@id": https://clash.md/hako#webpage
      url: https://clash.md/hako
      name: Hako Apple Proxy Core
      description: Hako is the fully open-source, mihomo-based Apple proxy core that powers Clash, with SDK releases, build details, and measurements on real Apple hardware.
      inLanguage: en-US
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
      description: The fully open-source, mihomo-based Apple proxy core that powers Clash, tuned for Apple NetworkExtension and published with versioned SDK releases.
      url: https://clash.md/hako
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
      inLanguage: en-US
sidebar: false
aside: false
outline: false
pageClass: hako-product-page
---

<section class="hako-hero">
  <div class="hako-hero-copy">
    <p class="product-eyebrow">High-performance Adaptive Kernel · Fully open source</p>
    <h1><span>Speed, measured.</span><span>Trust, open source.</span></h1>
    <p class="hako-hero-lede">Hako is the proxy core that powers Clash. Built on proven mihomo and retuned for Apple NetworkExtension constraints, it handles traffic on your device—with performance measured on real hardware and its complete source code open for anyone to inspect.</p>
    <div class="product-actions">
      <a class="product-action product-action--primary" href="https://github.com/TokenPLS/Hako/releases/tag/v1.19.30-hako.1" target="_blank" rel="noopener noreferrer">Download latest open-source SDK</a>
      <a class="product-action product-action--secondary" href="https://github.com/TokenPLS/Hako" target="_blank" rel="noopener noreferrer">View source code</a>
    </div>
  </div>
  <div class="hako-release-panel" aria-label="Current Hako product core and latest open-source SDK">
    <img class="hako-logo" src="/brand/hako-logo.png" alt="Hako cube logo" width="256" height="256">
    <p>Current product core</p>
    <strong>mihomo 1.19.30</strong>
    <div class="hako-public-release"><span>Latest open-source SDK</span><a href="https://github.com/TokenPLS/Hako/releases/tag/v1.19.30-hako.1" target="_blank" rel="noopener noreferrer">Hako v1.19.30-hako.1 ↗</a></div>
    <div class="hako-platform-chips"><span>iOS</span><span>iPadOS</span><span>macOS</span><span>tvOS</span></div>
  </div>
</section>

<section class="hako-section hako-story" aria-labelledby="hako-story-title">
  <div class="hako-section-heading">
    <p class="section-kicker">The heart of Clash</p>
    <h2 id="hako-story-title">Trust belongs<br>where your traffic flows.</h2>
    <p>Clash makes the network feel simple. Hako is the part that actually handles connections, DNS, and rules. It does not ask you to trust a promise: its runtime boundaries are built into a fully open-source implementation anyone can inspect.</p>
  </div>
  <div class="hako-principle-grid">
    <article>
      <span>01</span>
      <h3>Apple public APIs only</h3>
      <p>Hako runs inside NetworkExtension and moves packets through the public <code>NEPacketTunnelFlow</code> API—without private APIs or file-descriptor tricks.</p>
    </article>
    <article>
      <span>02</span>
      <h3>Control stays on-device</h3>
      <p>Status, traffic, connections, and logs travel over an app-private local channel, with no extra network-accessible controller.</p>
    </article>
    <article>
      <span>03</span>
      <h3>Profiles stay with the client</h3>
      <p>Hako never downloads or stores profile URLs or credentials. The client prepares the runtime configuration; Hako applies its rules.</p>
    </article>
  </div>
</section>

<section class="hako-section hako-benchmarks" aria-labelledby="hako-benchmarks-title">
  <div class="hako-section-heading hako-section-heading--light">
    <p class="section-kicker">Measured on an iPad Pro (M2)</p>
    <h2 id="hako-benchmarks-title">No “should be fast.”<br>See how fast it ran.</h2>
  </div>
  <div class="hako-metric-grid">
    <article><strong>924<small> Mbps</small></strong><span>Public-network download</span><p>545 Mbps up · 5 ms latency</p></article>
    <article><strong>18.7<small> MiB</small></strong><span>Core memory at speed</span><p>Lightweight under high throughput</p></article>
    <article><strong>16.49<small> GB</small></strong><span>30-minute pressure run</span><p>0 disconnects · 0 packet loss · 0 crashes</p></article>
    <article><strong>39.6<small> MiB</small></strong><span>400 concurrent connections</span><p>Within a 50 MiB test budget</p></article>
  </div>
  <p class="hako-benchmark-note">Speed tests cannot exceed the available bandwidth of the test network. These figures come from a controlled run on the stated device, network, and build; actual performance varies with device, route, and configuration.</p>
</section>

<section class="hako-section hako-trust" aria-labelledby="hako-trust-title">
  <div class="hako-section-heading">
    <p class="section-kicker">Open source · independently reviewable</p>
    <h2 id="hako-trust-title">Performance can be measured.<br>Security should be inspectable.</h2>
    <p>Hako follows stable mihomo releases only, and Clash currently runs 1.19.30. The complete Hako core is open source under GPL-3.0, with each SDK release, source version, and build artifact tied to the same tagged snapshot.</p>
  </div>
  <div class="hako-release-facts">
    <article><span>Current product core</span><strong>mihomo 1.19.30</strong><p>Open-source release across all five Apple slices</p></article>
    <article><span>Latest open-source SDK</span><strong>v1.19.30-hako.1</strong><p>Complete source and build artifact are on GitHub</p></article>
    <article><span>Apple architectures</span><strong>5 slices</strong><p>iOS device and simulator, macOS, tvOS device and simulator</p></article>
  </div>
</section>

<section class="hako-section hako-capabilities" aria-labelledby="hako-capabilities-title">
  <div class="hako-section-heading">
    <p class="section-kicker">A proven data plane</p>
    <h2 id="hako-capabilities-title">The Clash capabilities you know,<br>inside Apple’s system boundaries.</h2>
  </div>
  <div class="hako-capability-grid">
    <article><span>Protocols</span><h3>Connect to the routes you use</h3><p>Shadowsocks, VMess, VLESS, Trojan, Snell, Hysteria2, TUIC, WireGuard, AnyTLS, SSH, and more.</p></article>
    <article><span>DNS</span><h3>Resolution follows the rules too</h3><p>DoH, DoT, DoQ, fake-IP, traffic sniffing, and per-domain resolver policies.</p></article>
    <article><span>Routing</span><h3>Direct when it should be direct</h3><p>domain, IP-CIDR, GEOIP, GEOSITE, RULE-SET, sub-rules, and logical rules.</p></article>
    <article><span>Policy groups</span><h3>Select, test, and fail over</h3><p>select, url-test, fallback, load-balance, health checks, and remote providers.</p></article>
    <article><span>Local control</span><h3>Runtime state stays visible</h3><p>Status, traffic, connections, proxies, logs, latency tests, and connection control remain available to the app locally.</p></article>
    <article><span>Platform differences</span><h3>macOS adds process rules</h3><p>macOS can match process names, executable paths, and UIDs; signing-ID and team-ID matching remain unavailable. In Packet Tunnel mode, iPhone, iPad, and Apple TV do not expose per-app or per-process identity.</p></article>
  </div>
</section>

<section class="hako-cta" aria-labelledby="hako-cta-title">
  <p class="section-kicker">Do not take our word for it</p>
  <h2 id="hako-cta-title">Want the code? Read it.</h2>
  <p>Inspect the implementation, pin a release, or report a security issue privately. Verifying Hako requires no one’s permission.</p>
  <div class="hako-cta-links">
    <a href="https://github.com/TokenPLS/Hako" target="_blank" rel="noopener noreferrer">View source code ↗</a>
    <a href="https://github.com/TokenPLS/Hako/releases/tag/v1.19.30-hako.1" target="_blank" rel="noopener noreferrer">Download latest open-source SDK ↗</a>
    <a href="https://github.com/TokenPLS/Hako/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer">Report a security issue ↗</a>
  </div>
</section>
