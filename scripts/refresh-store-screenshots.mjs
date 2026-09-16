import { copyFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

// Requires macOS/AppKit, Swift, cwebp, and the original Apple bezel assets.
const releaseRoot = process.env.HAKO_RELEASE_CANDIDATES ?? '/Users/ejan/SGP/Hako/ReleaseCandidates'
const output = 'docs/public/screenshots'
const temporary = mkdtempSync(join(tmpdir(), 'clash-store-shots-'))
const mobileNames = ['01-home', '02-profiles', '03-proxies', '04-rules', '05-utilities']
const macNames = ['01-home-connected-rule-932mbps', '02-profiles-profile-a-b-c', '03-proxies-policy-groups', '04-rules-routing', '05-utilities-network-tools']

function webp(source, destination, width) {
  execFileSync('cwebp', ['-quiet', '-q', '88', '-m', '6', '-resize', String(width), '0', source, '-o', destination])
}

try {
  execFileSync('swift', ['scripts/compose-apple-lockup.swift'], {
    env: { ...process.env, HAKO_RELEASE_CANDIDATES: releaseRoot, HAKO_BEZEL_INTERMEDIATES: temporary },
    stdio: 'inherit'
  })
  for (const [locale, suffix] of [['en-US', 'en'], ['zh-Hans', 'zh']]) {
    const mobileSuffix = suffix === 'en' ? '' : '-zh'
    for (const [device, sourceFolder, width, bezelWidth] of [['iphone', 'ios', 645, 700], ['ipad', 'ipad', 1032, 1200]]) {
      const folder = `${output}/platforms/ios`
      mkdirSync(`${folder}/gallery`, { recursive: true })
      for (const [index, name] of mobileNames.entries()) {
        const destination = `${folder}/gallery/${device}${mobileSuffix}-0${index + 1}.webp`
        webp(`${releaseRoot}/store-shots-${sourceFolder}-20260916/${locale}/${name}.png`, destination, width)
        if (index === 0) copyFileSync(destination, `${folder}/${device}-home${mobileSuffix}.webp`)
      }
      webp(`${temporary}/device-${device}-${suffix}.png`, `${folder}/device-${device}${mobileSuffix}.webp`, bezelWidth)
    }
    const macFolder = `${output}/platforms/macos`
    for (const [index, name] of macNames.entries()) {
      const destination = `${macFolder}/gallery/${suffix}-0${index + 1}.webp`
      webp(`${releaseRoot}/store-shots-macos-20260916/${locale}/${name}.png`, destination, 1920)
      if (index === 0) copyFileSync(destination, `${macFolder}/home-${suffix}.webp`)
    }
    webp(`${temporary}/device-mac-${suffix}.png`, `${macFolder}/device-mac-${suffix}.webp`, 2400)
    for (const mode of ['light', 'dark']) {
      webp(`${temporary}/apple-product-lockup-official-${mode}-${suffix}.png`, `${output}/hero/apple-product-lockup-official-${mode}${mobileSuffix}.webp`, 3460)
    }
    copyFileSync(`${temporary}/apple-device-lockup-${suffix}.png`, `${output}/hero/apple-device-lockup-${suffix}.png`)
    webp(`${temporary}/apple-device-lockup-${suffix}.png`, `${output}/hero/apple-device-lockup-${suffix}.webp`, 2400)
  }
} finally {
  rmSync(temporary, { recursive: true, force: true })
}
