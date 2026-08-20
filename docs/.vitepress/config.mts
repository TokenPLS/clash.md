import { defineConfig, type HeadConfig } from 'vitepress'

const siteOrigin = process.env.SITE_ORIGIN ?? 'https://clash.md'
const siteBase = process.env.DOCS_BASE ?? '/'
const publicAsset = (path: string) =>
  `${siteBase}${path.replace(/^\/+/, '')}`

function rewriteSiteUrls(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(/^https:\/\/clash\.md(?=\/|$)/, siteOrigin)
  }
  if (Array.isArray(value)) return value.map(rewriteSiteUrls)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rewriteSiteUrls(item)])
    )
  }
  return value
}

function routeFromRelativePath(relativePath: string) {
  const withoutExtension = relativePath.replace(/\.md$/, '')

  if (withoutExtension === 'index') return '/'
  if (withoutExtension.endsWith('/index')) {
    return `/${withoutExtension.slice(0, -'index'.length)}`
  }

  return `/${withoutExtension}`
}

function hasLink(
  head: HeadConfig[],
  rel: string,
  hreflang?: string
) {
  return head.some(([tag, attrs]) => {
    if (tag !== 'link' || attrs.rel !== rel) return false
    return hreflang === undefined || attrs.hreflang === hreflang
  })
}

export default defineConfig({
  title: 'Clash',
  titleTemplate: ':title · Clash',
  description:
    'A native rule-based proxy utility for Apple platforms, powered by Hako.',
  base: siteBase,
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  markdown: {
    config(md) {
      const cjkEnd = /[\p{Script=Han}\u3000-\u303f\uff00-\uff65]$/u
      const cjkStart = /^[\p{Script=Han}\u3000-\u303f\uff00-\uff65]/u

      md.renderer.rules.softbreak = (tokens, index) => {
        const previous = tokens[index - 1]?.content ?? ''
        const next = tokens[index + 1]?.content ?? ''

        return cjkEnd.test(previous) && cjkStart.test(next) ? '' : '\n'
      }
    }
  },
  sitemap: {
    hostname: siteOrigin,
    transformItems(items) {
      return items.filter(({ url }) => url !== '404')
    }
  },
  transformPageData(pageData) {
    if (/^(zh\/)?guide\/config\//.test(pageData.relativePath)) {
      pageData.frontmatter.pageClass = 'clash-config-page'
      if (!pageData.relativePath.endsWith('/best-practice.md')) {
        pageData.frontmatter.aside = false
      }
    }
    if (Array.isArray(pageData.frontmatter.head)) {
      pageData.frontmatter.head = pageData.frontmatter.head.filter(
        ([tag, attrs]: HeadConfig) =>
          tag !== 'link' ||
          (attrs.rel !== 'canonical' && attrs.rel !== 'alternate')
      )
    }
  },
  transformHead({ pageData, title, description, head }) {
    if (pageData.isNotFound || pageData.relativePath === '404.md') {
      return [
        [
          'meta',
          {
            name: 'robots',
            content: 'noindex, nofollow'
          }
        ]
      ]
    }

    const route = routeFromRelativePath(pageData.relativePath)
    const isChinese = route.startsWith('/zh/')
    const englishRoute = isChinese ? route.slice('/zh'.length) : route
    const chineseRoute = isChinese
      ? route
      : route === '/'
        ? '/zh/'
        : `/zh${route}`
    const canonicalUrl = `${siteOrigin}${route}`
    const englishUrl = `${siteOrigin}${englishRoute}`
    const chineseUrl = `${siteOrigin}${chineseRoute}`
    const socialImage = `${siteOrigin}/og-clash.png`
    const socialImageAlt = isChinese
      ? 'Clash 原生运行在 Apple TV、Mac、iPad 与 iPhone 上'
      : 'Clash running natively on Apple TV, Mac, iPad, and iPhone'
    const openGraphType = englishRoute.startsWith('/guide/')
      ? 'article'
      : 'website'
    const tags: HeadConfig[] = [
      [
        'meta',
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large'
        }
      ],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:type', content: openGraphType }],
      [
        'meta',
        {
          property: 'og:locale',
          content: isChinese ? 'zh_CN' : 'en_US'
        }
      ],
      [
        'meta',
        {
          property: 'og:locale:alternate',
          content: isChinese ? 'en_US' : 'zh_CN'
        }
      ],
      ['meta', { property: 'og:image', content: socialImage }],
      ['meta', { property: 'og:image:secure_url', content: socialImage }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { property: 'og:image:alt', content: socialImageAlt }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: socialImage }],
      ['meta', { name: 'twitter:image:alt', content: socialImageAlt }]
    ]

    if (pageData.frontmatter.jsonLd) {
      tags.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(rewriteSiteUrls(pageData.frontmatter.jsonLd))
      ])
    }
    if (route !== '/' && route !== '/zh/') {
      const routeParts = route.split('/').filter(Boolean)
      const contentParts = isChinese ? routeParts.slice(1) : routeParts
      const breadcrumbItems: Array<Record<string, unknown>> = [
        {
          '@type': 'ListItem',
          position: 1,
          name: isChinese ? '首页' : 'Home',
          item: `${siteOrigin}${isChinese ? '/zh/' : '/'}`
        }
      ]
      let accumulatedRoute = isChinese ? '/zh' : ''

      contentParts.forEach((part, index) => {
        accumulatedRoute += `/${part}`
        const isLast = index === contentParts.length - 1

        // Platform detail pages are linked directly from the primary
        // navigation. There is no public /platforms index page, so don't
        // advertise a non-existent intermediate breadcrumb.
        if (part === 'platforms' && !isLast) return

        const name = isLast
          ? pageData.title
          : part === 'guide'
            ? isChinese
              ? '使用指南'
              : 'Guide'
            : part === 'compatibility'
              ? isChinese
                ? '兼容性说明'
                : 'Compatibility'
              : part === 'platforms'
                ? isChinese
                  ? '平台'
                  : 'Platforms'
              : part
        const itemRoute =
          part === 'guide' ? `${accumulatedRoute}/` : accumulatedRoute

        breadcrumbItems.push({
          '@type': 'ListItem',
          position: breadcrumbItems.length + 1,
          name,
          item: `${siteOrigin}${itemRoute}`
        })
      })

      tags.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems
        })
      ])
    }

    if (!hasLink(head, 'canonical')) {
      tags.push(['link', { rel: 'canonical', href: canonicalUrl }])
    }
    if (!hasLink(head, 'alternate', 'en-US')) {
      tags.push([
        'link',
        {
          rel: 'alternate',
          hreflang: 'en-US',
          href: englishUrl
        }
      ])
    }
    if (!hasLink(head, 'alternate', 'zh-CN')) {
      tags.push([
        'link',
        {
          rel: 'alternate',
          hreflang: 'zh-CN',
          href: chineseUrl
        }
      ])
    }
    if (!hasLink(head, 'alternate', 'x-default')) {
      tags.push([
        'link',
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: englishUrl
        }
      ])
    }

    if (pageData.lastUpdated && openGraphType === 'article') {
      tags.push([
        'meta',
        {
          property: 'article:modified_time',
          content: new Date(pageData.lastUpdated).toISOString()
        }
      ])
    }

    return tags
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    [
      'script',
      {},
      `(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const themeColor = document.querySelector('meta[name="theme-color"]')
        const updateThemeColor = () => {
          themeColor?.setAttribute('content', media.matches ? '#000000' : '#ffffff')
        }
        updateThemeColor()
        media.addEventListener('change', updateThemeColor)
      })()`
    ],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { property: 'og:site_name', content: 'Clash' }],
    ['link', { rel: 'icon', href: publicAsset('/favicon.ico?v=3'), sizes: 'any' }],
    ['link', { rel: 'icon', href: publicAsset('/favicon.svg?v=3'), type: 'image/svg+xml' }],
    [
      'link',
      {
        rel: 'icon',
        href: publicAsset('/favicon-32x32.png?v=3'),
        type: 'image/png',
        sizes: '32x32'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: publicAsset('/favicon-64x64.png?v=3'),
        type: 'image/png',
        sizes: '64x64'
      }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: publicAsset('/apple-touch-icon.png?v=3'),
        sizes: '180x180'
      }
    ],
    ['link', { rel: 'manifest', href: publicAsset('/site.webmanifest') }]
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        nav: [
          { text: 'iOS', link: '/platforms/ios' },
          { text: 'macOS', link: '/platforms/macos' },
          { text: 'tvOS', link: '/platforms/tvos' },
          { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Terms', link: '/terms' },
          {
            text: 'Community',
            items: [
              {
                text: 'Official channel',
                link: 'https://t.me/clashbyhako'
              },
              {
                text: 'Clash client',
                link: 'https://github.com/TokenPLS/Hako-Client'
              },
              {
                text: 'Hako core',
                link: 'https://github.com/TokenPLS/Hako'
              }
            ]
          }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting started', link: '/guide/' },
                { text: 'Everyday use', link: '/guide/everyday-use' },
                {
                  text: 'Device guides',
                  collapsed: true,
                  items: [
                    { text: 'iPhone and iPad', link: '/guide/ios' },
                    { text: 'Mac', link: '/guide/macos' },
                    { text: 'Apple TV', link: '/guide/tvos' }
                  ]
                },
                {
                  text: 'Configuration best practices',
                  link: '/guide/config/best-practice'
                },
                {
                  text: 'Configuration reference',
                  link: '/guide/config/',
                  collapsed: true,
                  items: [
                    { text: 'General', link: '/guide/config/general' },
                    { text: 'DNS', link: '/guide/config/dns' },
                    { text: 'Inbound and TUN', link: '/guide/config/inbound' },
                    { text: 'Proxies and providers', link: '/guide/config/proxies' },
                    { text: 'Rules and sniffer', link: '/guide/config/rules' },
                    { text: 'State and advanced', link: '/guide/config/profile' },
                    { text: 'Apple platforms', link: '/guide/config/apple-platforms' },
                    { text: 'Security boundary', link: '/guide/config/security' }
                  ]
                },
                {
                  text: 'Compatibility',
                  link: '/guide/compatibility',
                  collapsed: true,
                  items: [
                    { text: 'mihomo', link: '/guide/compatibility/mihomo' },
                    { text: 'sing-box', link: '/guide/compatibility/sing-box' },
                    { text: 'Surge', link: '/guide/compatibility/surge' },
                    {
                      text: 'Quantumult X',
                      link: '/guide/compatibility/quantumult-x'
                    },
                    {
                      text: 'Shadowrocket',
                      link: '/guide/compatibility/shadowrocket'
                    },
                    { text: 'Stash', link: '/guide/compatibility/stash' },
                    { text: 'Loon', link: '/guide/compatibility/loon' }
                  ]
                },
                {
                  text: 'Supported protocols',
                  link: '/guide/protocols'
                },
                { text: 'Privacy model', link: '/guide/privacy-model' }
              ]
            }
          ]
        },
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'long'
          }
        },
        editLink: {
          pattern: 'https://github.com/TokenPLS/clash.md/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        footer: {
          copyright: 'Copyright © 2026 The Clash & Hako Team'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: '由 Hako 驱动、为 Apple 平台原生打造的基于规则的网络代理工具。',
      themeConfig: {
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        nav: [
          { text: 'iOS', link: '/zh/platforms/ios' },
          { text: 'macOS', link: '/zh/platforms/macos' },
          { text: 'tvOS', link: '/zh/platforms/tvos' },
          {
            text: '使用指南',
            link: '/zh/guide/',
            activeMatch: '^/zh/guide/'
          },
          { text: '隐私政策', link: '/zh/privacy' },
          { text: '使用条款', link: '/zh/terms' },
          {
            text: '社区',
            items: [
              {
                text: '官方频道',
                link: 'https://t.me/clashbyhako'
              },
              {
                text: 'Clash 客户端',
                link: 'https://github.com/TokenPLS/Hako-Client'
              },
              {
                text: 'Hako 内核',
                link: 'https://github.com/TokenPLS/Hako'
              }
            ]
          }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '使用指南',
              items: [
                { text: '开始使用', link: '/zh/guide/' },
                { text: '日常使用', link: '/zh/guide/everyday-use' },
                {
                  text: '按设备查看',
                  collapsed: true,
                  items: [
                    { text: 'iPhone 与 iPad', link: '/zh/guide/ios' },
                    { text: 'Mac', link: '/zh/guide/macos' },
                    { text: 'Apple TV', link: '/zh/guide/tvos' }
                  ]
                },
                {
                  text: '配置最佳实践',
                  link: '/zh/guide/config/best-practice'
                },
                {
                  text: '配置参考',
                  link: '/zh/guide/config/',
                  collapsed: true,
                  items: [
                    { text: '常规设置', link: '/zh/guide/config/general' },
                    { text: 'DNS', link: '/zh/guide/config/dns' },
                    { text: '入站与 TUN', link: '/zh/guide/config/inbound' },
                    { text: '代理与 Provider', link: '/zh/guide/config/proxies' },
                    { text: '规则与嗅探', link: '/zh/guide/config/rules' },
                    { text: '状态与高级项', link: '/zh/guide/config/profile' },
                    { text: '三平台差异', link: '/zh/guide/config/apple-platforms' },
                    { text: '安全边界', link: '/zh/guide/config/security' }
                  ]
                },
                {
                  text: '兼容性说明',
                  link: '/zh/guide/compatibility',
                  collapsed: true,
                  items: [
                    { text: 'mihomo', link: '/zh/guide/compatibility/mihomo' },
                    {
                      text: 'sing-box',
                      link: '/zh/guide/compatibility/sing-box'
                    },
                    { text: 'Surge', link: '/zh/guide/compatibility/surge' },
                    {
                      text: 'Quantumult X',
                      link: '/zh/guide/compatibility/quantumult-x'
                    },
                    {
                      text: 'Shadowrocket（小火箭）',
                      link: '/zh/guide/compatibility/shadowrocket'
                    },
                    { text: 'Stash', link: '/zh/guide/compatibility/stash' },
                    { text: 'Loon', link: '/zh/guide/compatibility/loon' }
                  ]
                },
                {
                  text: '支持的协议',
                  link: '/zh/guide/protocols'
                },
                { text: '隐私模型', link: '/zh/guide/privacy-model' }
              ]
            }
          ]
        },
        outline: {
          level: [2, 3],
          label: '本页内容'
        },
        lastUpdated: {
          text: '最后更新',
          formatOptions: {
            dateStyle: 'long'
          }
        },
        editLink: {
          pattern: 'https://github.com/TokenPLS/clash.md/edit/main/docs/:path',
          text: '在 GitHub 编辑此页'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        footer: {
          copyright: 'Copyright © 2026 The Clash & Hako Team'
        }
      }
    }
  },
  themeConfig: {
    logo: '/brand/clash-app-icon.svg',
    siteTitle: 'Clash'
  }
})
