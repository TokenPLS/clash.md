<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    destination?: 'default' | 'iphone' | 'mac' | 'tv'
    locale?: 'en' | 'zh'
    platform?: 'app-store' | 'mac-app-store' | 'apple-tv'
  }>(),
  {
    destination: 'default',
    locale: 'en',
    platform: 'app-store'
  }
)

const appStoreBaseUrl = 'https://apps.apple.com/app/id6794257189'
const appStoreUrl =
  props.destination === 'default'
    ? appStoreBaseUrl
    : `${appStoreBaseUrl}?platform=${props.destination}`
const badgeLanguage = props.locale === 'zh' ? 'zh' : 'en'
const accessibleLabels = {
  en: {
    'app-store': 'Download Clash on the App Store',
    'mac-app-store': 'Download Clash on the Mac App Store',
    'apple-tv': 'Download Clash on Apple TV'
  },
  zh: {
    'app-store': '在 App Store 下载 Clash',
    'mac-app-store': '在 Mac App Store 下载 Clash',
    'apple-tv': '在 Apple TV 下载 Clash'
  }
} as const
const badgeWidths = {
  en: { 'app-store': 120, 'mac-app-store': 156, 'apple-tv': 113 },
  zh: { 'app-store': 109, 'mac-app-store': 140, 'apple-tv': 103 }
} as const
const accessibleLabel = accessibleLabels[badgeLanguage][props.platform]
const badgeWidth = badgeWidths[badgeLanguage][props.platform]
const availabilityNotice =
  props.locale === 'zh'
    ? '如 Apple ID 地区为中国大陆或俄罗斯，请切换至其他 App Store 地区后安装。'
    : 'If your Apple ID region is mainland China or Russia, switch to another App Store region to install.'

const badgeUrl = (style: 'black' | 'white') =>
  `/brand/${props.platform}-badge-${style}-${badgeLanguage}.svg`
</script>

<template>
  <div class="app-store-download">
    <a
      class="app-store-badge"
      :href="appStoreUrl"
      :aria-label="accessibleLabel"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="app-store-badge__image app-store-badge__image--black"
        :src="badgeUrl('black')"
        alt=""
        :width="badgeWidth"
        height="40"
        decoding="async"
        aria-hidden="true"
      >
      <img
        class="app-store-badge__image app-store-badge__image--white"
        :src="badgeUrl('white')"
        alt=""
        :width="badgeWidth"
        height="40"
        decoding="async"
        aria-hidden="true"
      >
    </a>
    <div class="app-store-availability-row">
      <p class="app-store-availability" role="note">
        <span class="app-store-availability__icon" aria-hidden="true">i</span>
        <span>{{ availabilityNotice }}</span>
      </p>
    </div>
  </div>
</template>
