#!/usr/bin/env swift

import AppKit
import Foundation

struct PixelRect {
    var minX: Int
    var minY: Int
    var maxX: Int
    var maxY: Int

    var width: Int { maxX - minX + 1 }
    var height: Int { maxY - minY + 1 }

    func expanded(by amount: Int, imageWidth: Int, imageHeight: Int) -> PixelRect {
        PixelRect(
            minX: max(0, minX - amount),
            minY: max(0, minY - amount),
            maxX: min(imageWidth - 1, maxX + amount),
            maxY: min(imageHeight - 1, maxY + amount)
        )
    }
}

struct RenderedDevice {
    let image: NSImage
    let screen: PixelRect
    let pixelWidth: Int
    let pixelHeight: Int
}

struct ScreenOpening {
    let rect: PixelRect
    let mask: [UInt8]
}

enum ComposeError: Error, CustomStringConvertible {
    case invalidImage(String)
    case missingBitmapData(String)
    case missingScreen(String)
    case cannotCreateBitmap
    case cannotEncode(String)

    var description: String {
        switch self {
        case .invalidImage(let path): return "Could not load image: \(path)"
        case .missingBitmapData(let path): return "Could not read bitmap data: \(path)"
        case .missingScreen(let path): return "Could not find the transparent screen opening: \(path)"
        case .cannotCreateBitmap: return "Could not create an output bitmap"
        case .cannotEncode(let path): return "Could not encode PNG: \(path)"
        }
    }
}

func loadBitmap(_ path: String) throws -> NSBitmapImageRep {
    let data = try Data(contentsOf: URL(fileURLWithPath: path))
    guard let bitmap = NSBitmapImageRep(data: data) else {
        throw ComposeError.invalidImage(path)
    }
    return bitmap
}

func transparentScreen(in bitmap: NSBitmapImageRep, path: String) throws -> ScreenOpening {
    guard bitmap.bitsPerSample == 8,
          bitmap.samplesPerPixel == 4,
          !bitmap.isPlanar,
          let bytes = bitmap.bitmapData else {
        throw ComposeError.missingBitmapData(path)
    }

    let width = bitmap.pixelsWide
    let height = bitmap.pixelsHigh
    let rowBytes = bitmap.bytesPerRow
    let alphaOffset = bitmap.bitmapFormat.contains(.alphaFirst) ? 0 : 3

    func isTransparent(_ index: Int) -> Bool {
        let x = index % width
        let y = index / width
        return bytes[y * rowBytes + x * 4 + alphaOffset] <= 250
    }

    var startX = width / 2
    var startY = height / 2
    var start = startY * width + startX

    if !isTransparent(start) {
        var found: Int?
        let searchRadius = min(width, height) / 4
        for radius in stride(from: 8, through: searchRadius, by: 8) where found == nil {
            let minX = max(0, startX - radius)
            let maxX = min(width - 1, startX + radius)
            let minY = max(0, startY - radius)
            let maxY = min(height - 1, startY + radius)
            for y in minY...maxY {
                for x in minX...maxX where x == minX || x == maxX || y == minY || y == maxY {
                    let candidate = y * width + x
                    if isTransparent(candidate) {
                        found = candidate
                        break
                    }
                }
                if found != nil { break }
            }
        }
        guard let found else { throw ComposeError.missingScreen(path) }
        start = found
        startX = found % width
        startY = found / width
    }

    var visited = [UInt8](repeating: 0, count: width * height)
    var queue = ContiguousArray<Int32>()
    queue.reserveCapacity(width * height / 3)
    queue.append(Int32(start))
    visited[start] = 1

    var head = 0
    var minX = startX
    var minY = startY
    var maxX = startX
    var maxY = startY

    while head < queue.count {
        let index = Int(queue[head])
        head += 1
        let x = index % width
        let y = index / width

        minX = min(minX, x)
        minY = min(minY, y)
        maxX = max(maxX, x)
        maxY = max(maxY, y)

        if x > 0 {
            let next = index - 1
            if visited[next] == 0 && isTransparent(next) {
                visited[next] = 1
                queue.append(Int32(next))
            }
        }
        if x + 1 < width {
            let next = index + 1
            if visited[next] == 0 && isTransparent(next) {
                visited[next] = 1
                queue.append(Int32(next))
            }
        }
        if y > 0 {
            let next = index - width
            if visited[next] == 0 && isTransparent(next) {
                visited[next] = 1
                queue.append(Int32(next))
            }
        }
        if y + 1 < height {
            let next = index + width
            if visited[next] == 0 && isTransparent(next) {
                visited[next] = 1
                queue.append(Int32(next))
            }
        }
    }

    let rect = PixelRect(minX: minX, minY: minY, maxX: maxX, maxY: maxY)
    guard rect.width > width / 3, rect.height > height / 3 else {
        throw ComposeError.missingScreen(path)
    }
    return ScreenOpening(
        rect: rect.expanded(by: 5, imageWidth: width, imageHeight: height),
        mask: visited
    )
}

func makeBitmap(width: Int, height: Int) throws -> NSBitmapImageRep {
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: width,
        pixelsHigh: height,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: width * 4,
        bitsPerPixel: 32
    ) else {
        throw ComposeError.cannotCreateBitmap
    }
    bitmap.size = NSSize(width: width, height: height)
    return bitmap
}

func withBitmapContext(_ bitmap: NSBitmapImageRep, clear: Bool = true, _ draw: (CGContext) -> Void) {
    let context = NSGraphicsContext(bitmapImageRep: bitmap)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    if clear {
        context.cgContext.clear(CGRect(x: 0, y: 0, width: bitmap.pixelsWide, height: bitmap.pixelsHigh))
    }
    context.imageInterpolation = .high
    draw(context.cgContext)
    context.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()
}

func renderDevice(bezelPath: String, screenshotPath: String) throws -> RenderedDevice {
    let bezelBitmap = try loadBitmap(bezelPath)
    let opening = try transparentScreen(in: bezelBitmap, path: bezelPath)
    let screen = opening.rect
    let width = bezelBitmap.pixelsWide
    let height = bezelBitmap.pixelsHigh
    let output = try makeBitmap(width: width, height: height)
    let bezel = NSImage(contentsOfFile: bezelPath)!
    let screenshot = NSImage(contentsOfFile: screenshotPath)!

    withBitmapContext(output) { _ in
        let screenRect = NSRect(
            x: screen.minX,
            y: height - screen.maxY - 1,
            width: screen.width,
            height: screen.height
        )
        let sourceSize = screenshot.size
        let sourceAspect = sourceSize.width / sourceSize.height
        let targetAspect = screenRect.width / screenRect.height
        let sourceRect: NSRect
        if sourceAspect > targetAspect {
            let croppedWidth = sourceSize.height * targetAspect
            sourceRect = NSRect(
                x: (sourceSize.width - croppedWidth) / 2,
                y: 0,
                width: croppedWidth,
                height: sourceSize.height
            )
        } else {
            let croppedHeight = sourceSize.width / targetAspect
            sourceRect = NSRect(
                x: 0,
                y: (sourceSize.height - croppedHeight) / 2,
                width: sourceSize.width,
                height: croppedHeight
            )
        }
        screenshot.draw(
            in: screenRect,
            from: sourceRect,
            operation: .sourceOver,
            fraction: 1,
            respectFlipped: true,
            hints: [.interpolation: NSImageInterpolation.high]
        )
    }

    if let outputBytes = output.bitmapData {
        let outputRowBytes = output.bytesPerRow
        let outputAlphaOffset = output.bitmapFormat.contains(.alphaFirst) ? 0 : 3
        for y in 0..<height {
            for x in 0..<width where opening.mask[y * width + x] == 0 {
                let offset = y * outputRowBytes + x * 4
                outputBytes[offset] = 0
                outputBytes[offset + 1] = 0
                outputBytes[offset + 2] = 0
                outputBytes[offset + outputAlphaOffset] = 0
            }
        }
    }

    withBitmapContext(output, clear: false) { _ in
        bezel.draw(
            in: NSRect(x: 0, y: 0, width: width, height: height),
            from: .zero,
            operation: .sourceOver,
            fraction: 1,
            respectFlipped: true,
            hints: [.interpolation: NSImageInterpolation.high]
        )
    }

    let image = NSImage(size: NSSize(width: width, height: height))
    image.addRepresentation(output)
    print("\(URL(fileURLWithPath: bezelPath).lastPathComponent): screen \(screen.minX),\(screen.minY) \(screen.width)x\(screen.height) (\(String(format: "%.3f", Double(screen.width) / Double(screen.height))))")
    return RenderedDevice(image: image, screen: screen, pixelWidth: width, pixelHeight: height)
}

func croppedTelevision(_ device: RenderedDevice) throws -> NSImage {
    let crop = device.screen.expanded(by: 72, imageWidth: device.pixelWidth, imageHeight: device.pixelHeight)
    let bitmap = try makeBitmap(width: crop.width, height: crop.height)
    withBitmapContext(bitmap) { _ in
        let source = NSRect(
            x: crop.minX,
            y: device.pixelHeight - crop.maxY - 1,
            width: crop.width,
            height: crop.height
        )
        device.image.draw(
            in: NSRect(x: 0, y: 0, width: crop.width, height: crop.height),
            from: source,
            operation: .sourceOver,
            fraction: 1,
            respectFlipped: true,
            hints: [.interpolation: NSImageInterpolation.high]
        )
    }
    let image = NSImage(size: NSSize(width: crop.width, height: crop.height))
    image.addRepresentation(bitmap)
    return image
}

func savePNG(_ image: NSImage, to path: String) throws {
    guard let tiff = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff),
          let data = bitmap.representation(using: .png, properties: [:]) else {
        throw ComposeError.cannotEncode(path)
    }
    try data.write(to: URL(fileURLWithPath: path), options: .atomic)
}

func drawScaled(_ image: NSImage, width: CGFloat, x: CGFloat, y: CGFloat) {
    let height = width * image.size.height / image.size.width
    image.draw(
        in: NSRect(x: x, y: y, width: width, height: height),
        from: .zero,
        operation: .sourceOver,
        fraction: 1,
        respectFlipped: true,
        hints: [.interpolation: NSImageInterpolation.high]
    )
}

func visiblePixelBounds(of image: NSImage) -> PixelRect? {
    guard let bitmap = image.representations.compactMap({ $0 as? NSBitmapImageRep }).first,
          bitmap.bitsPerSample == 8,
          bitmap.samplesPerPixel == 4,
          !bitmap.isPlanar,
          let bytes = bitmap.bitmapData else { return nil }

    let width = bitmap.pixelsWide
    let height = bitmap.pixelsHigh
    let rowBytes = bitmap.bytesPerRow
    let alphaOffset = bitmap.bitmapFormat.contains(.alphaFirst) ? 0 : 3
    var minX = width
    var minY = height
    var maxX = -1
    var maxY = -1

    for y in 0..<height {
        for x in 0..<width where bytes[y * rowBytes + x * 4 + alphaOffset] > 3 {
            minX = min(minX, x)
            minY = min(minY, y)
            maxX = max(maxX, x)
            maxY = max(maxY, y)
        }
    }

    guard maxX >= minX, maxY >= minY else { return nil }
    return PixelRect(minX: minX, minY: minY, maxX: maxX, maxY: maxY)
}

func drawScaledGrounded(_ image: NSImage, width: CGFloat, x: CGFloat, groundY: CGFloat) {
    let scale = width / image.size.width
    let bottomPadding: CGFloat
    if let visible = visiblePixelBounds(of: image) {
        bottomPadding = CGFloat(image.size.height - CGFloat(visible.maxY + 1)) * scale
    } else {
        bottomPadding = 0
    }
    drawScaled(image, width: width, x: x, y: groundY - bottomPadding)
}

func composeLockup(mac: NSImage, ipad: NSImage, iphone: NSImage, television: NSImage) throws -> NSImage {
    let width = 2800
    let height = 1200
    let output = try makeBitmap(width: width, height: height)
    let baseline: CGFloat = 20

    withBitmapContext(output) { _ in
        drawScaled(television, width: 1580, x: 10, y: baseline)
        drawScaled(mac, width: 1720, x: 555, y: baseline)
        drawScaled(ipad, width: 630, x: 1850, y: baseline)
        drawScaled(iphone, width: 315, x: 2415, y: baseline)
    }

    let image = NSImage(size: NSSize(width: width, height: height))
    image.addRepresentation(output)
    return image
}

func drawRadialGlow(
    in context: CGContext,
    center: CGPoint,
    radius: CGFloat,
    verticalScale: CGFloat,
    color: NSColor,
    peakAlpha: CGFloat
) {
    guard let gradient = CGGradient(
        colorsSpace: CGColorSpaceCreateDeviceRGB(),
        colors: [
            color.withAlphaComponent(peakAlpha).cgColor,
            color.withAlphaComponent(peakAlpha * 0.36).cgColor,
            color.withAlphaComponent(0).cgColor
        ] as CFArray,
        locations: [0, 0.48, 1]
    ) else { return }

    context.saveGState()
    context.translateBy(x: center.x, y: center.y)
    context.scaleBy(x: 1, y: verticalScale)
    context.drawRadialGradient(
        gradient,
        startCenter: .zero,
        startRadius: 0,
        endCenter: .zero,
        endRadius: radius,
        options: [.drawsAfterEndLocation]
    )
    context.restoreGState()
}

func drawGroundLine(in context: CGContext, dark: Bool) {
    let y: CGFloat = 140
    let color = dark
        ? NSColor(calibratedRed: 0.02, green: 0.43, blue: 1, alpha: 1)
        : NSColor(calibratedRed: 0.30, green: 0.55, blue: 0.93, alpha: 1)

    context.saveGState()
    context.setShadow(
        offset: .zero,
        blur: dark ? 58 : 30,
        color: color.withAlphaComponent(dark ? 0.68 : 0.22).cgColor
    )
    context.setStrokeColor(color.withAlphaComponent(dark ? 0.42 : 0.17).cgColor)
    context.setLineWidth(dark ? 2.5 : 4)
    context.move(to: CGPoint(x: 420, y: y))
    context.addLine(to: CGPoint(x: 3040, y: y))
    context.strokePath()
    context.restoreGState()
}

func drawTrustedReferenceLeft(_ reference: NSImage) {
    // Apple TV and Siri Remote keep the exact silhouette and placement from
    // the approved composition. The first 480 source pixels contain the full
    // hardware pair; the following 40 pixels are feathered into the rebuilt
    // high-resolution background so no rectangular seam or old Mac edge is
    // carried forward.
    let scale: CGFloat = 2
    let opaqueWidth: CGFloat = 480
    let fadeWidth = 40
    reference.draw(
        in: NSRect(x: 0, y: 0, width: opaqueWidth * scale, height: 1300),
        from: NSRect(x: 0, y: 0, width: opaqueWidth, height: 650),
        operation: .sourceOver,
        fraction: 1,
        respectFlipped: true,
        hints: [.interpolation: NSImageInterpolation.high]
    )
    for offset in 0..<fadeWidth {
        let alpha = 1 - CGFloat(offset + 1) / CGFloat(fadeWidth)
        reference.draw(
            in: NSRect(
                x: (opaqueWidth + CGFloat(offset)) * scale,
                y: 0,
                width: scale,
                height: 1300
            ),
            from: NSRect(x: opaqueWidth + CGFloat(offset), y: 0, width: 1, height: 650),
            operation: .sourceOver,
            fraction: alpha,
            respectFlipped: true,
            hints: [.interpolation: NSImageInterpolation.high]
        )
    }
}

func composeHomepageHero(
    mac: NSImage,
    ipad: NSImage,
    iphone: NSImage,
    trustedReference: NSImage,
    dark: Bool
) throws -> NSImage {
    // Exactly 2x the 1730x650 CSS canvas used on the homepage.
    let width = 3460
    let height = 1300
    let output = try makeBitmap(width: width, height: height)
    let groundY: CGFloat = 142

    withBitmapContext(output) { context in
        context.setFillColor((dark ? NSColor.black : NSColor.white).cgColor)
        context.fill(CGRect(x: 0, y: 0, width: width, height: height))

        if dark {
            // The approved artwork has a broad, soft blue aura behind the
            // devices and a brighter pool of light at the shared baseline.
            drawRadialGlow(
                in: context,
                center: CGPoint(x: 1710, y: 570),
                radius: 1350,
                verticalScale: 0.46,
                color: NSColor(calibratedRed: 0.01, green: 0.24, blue: 0.86, alpha: 1),
                peakAlpha: 0.34
            )
            drawRadialGlow(
                in: context,
                center: CGPoint(x: 1760, y: 160),
                radius: 1180,
                verticalScale: 0.08,
                color: NSColor(calibratedRed: 0.00, green: 0.38, blue: 1, alpha: 1),
                peakAlpha: 0.50
            )
        } else {
            drawRadialGlow(
                in: context,
                center: CGPoint(x: 1770, y: 145),
                radius: 1260,
                verticalScale: 0.13,
                color: NSColor(calibratedWhite: 0.42, alpha: 1),
                peakAlpha: 0.15
            )
        }

        drawGroundLine(in: context, dark: dark)

        // One shared baseline and one explicit depth order:
        // approved Apple TV / Remote -> MacBook -> iPad -> iPhone.
        // The three screen-bearing devices use complete official bezels and
        // each mobile device physically sits in front of the larger one.
        drawTrustedReferenceLeft(trustedReference)
        drawScaledGrounded(mac, width: 1705, x: 898, groundY: groundY)
        drawScaledGrounded(ipad, width: 620, x: 2195, groundY: groundY)
        drawScaledGrounded(iphone, width: 320, x: 2745, groundY: groundY)
    }

    let image = NSImage(size: NSSize(width: width, height: height))
    image.addRepresentation(output)
    return image
}

let repoRoot = FileManager.default.currentDirectoryPath
let assetRoot = ProcessInfo.processInfo.environment["HAKO_STORE_ASSETS"]
    ?? "/Users/ejan/SGP/Hako-App-Store-Assets"
let bezelRoot = "\(assetRoot)/Apple-Product-Bezels/PNG"
let screenshotRoot = "\(assetRoot)/Latest-App-Store-Screenshots-2026-08-18"
let outputRoot = "\(repoRoot)/docs/public/screenshots/hero"
let standaloneRoot = ProcessInfo.processInfo.environment["HAKO_BEZEL_INTERMEDIATES"]
    ?? "/tmp/hako-platform-bezels"

let macBezel = "\(bezelRoot)/MacBook-Pro-M5-16-Silver.png"
let ipadBezel = "\(bezelRoot)/iPad-Pro-M5-13-Space-Black-Portrait.png"
let iphoneBezel = "\(bezelRoot)/iPhone-17-Black-Portrait.png"
let tvBezel = "\(bezelRoot)/Apple-TV-4K.png"

let macEnglish = "\(screenshotRoot)/macOS/en-US-2880x1800/01-home-connected-rule-932mbps.png"
let macChinese = "\(screenshotRoot)/macOS/zh-Hans-2880x1800/01-home-connected-rule-932mbps.png"
let ipadScreenshot = "\(screenshotRoot)/iPad/en-US-12.9-or-13-inch/01-home-profile-a-rule-932mbps.png"
let iphoneScreenshot = "\(screenshotRoot)/iPhone/en-US-1284x2778/01-home-profile-a-rule-932mbps.png"
let tvScreenshot = "\(screenshotRoot)/tvOS/en-US-3840x2160/01-connected-rule-mode.png"
let trustedHeroDark = "\(outputRoot)/apple-product-lockup-dark.png"
let trustedHeroLight = "\(outputRoot)/apple-product-lockup-light.png"

do {
    try FileManager.default.createDirectory(atPath: outputRoot, withIntermediateDirectories: true)
    try FileManager.default.createDirectory(atPath: standaloneRoot, withIntermediateDirectories: true)
    let ipad = try renderDevice(bezelPath: ipadBezel, screenshotPath: ipadScreenshot)
    let iphone = try renderDevice(bezelPath: iphoneBezel, screenshotPath: iphoneScreenshot)
    let tv = try renderDevice(bezelPath: tvBezel, screenshotPath: tvScreenshot)
    let television = try croppedTelevision(tv)
    try savePNG(ipad.image, to: "\(standaloneRoot)/device-ipad.png")
    try savePNG(iphone.image, to: "\(standaloneRoot)/device-iphone.png")
    try savePNG(tv.image, to: "\(standaloneRoot)/device-apple-tv.png")

    let macEN = try renderDevice(bezelPath: macBezel, screenshotPath: macEnglish)
    try savePNG(macEN.image, to: "\(standaloneRoot)/device-mac-en.png")
    let english = try composeLockup(mac: macEN.image, ipad: ipad.image, iphone: iphone.image, television: television)
    try savePNG(english, to: "\(outputRoot)/apple-device-lockup-en.png")
    let homepageLight = try composeHomepageHero(
        mac: macEN.image,
        ipad: ipad.image,
        iphone: iphone.image,
        trustedReference: NSImage(contentsOfFile: trustedHeroLight)!,
        dark: false
    )
    try savePNG(homepageLight, to: "\(standaloneRoot)/apple-product-lockup-official-light.png")
    let homepageDark = try composeHomepageHero(
        mac: macEN.image,
        ipad: ipad.image,
        iphone: iphone.image,
        trustedReference: NSImage(contentsOfFile: trustedHeroDark)!,
        dark: true
    )
    try savePNG(homepageDark, to: "\(standaloneRoot)/apple-product-lockup-official-dark.png")

    let macZH = try renderDevice(bezelPath: macBezel, screenshotPath: macChinese)
    try savePNG(macZH.image, to: "\(standaloneRoot)/device-mac-zh.png")
    let chinese = try composeLockup(mac: macZH.image, ipad: ipad.image, iphone: iphone.image, television: television)
    try savePNG(chinese, to: "\(outputRoot)/apple-device-lockup-zh.png")
} catch {
    fputs("compose-apple-lockup: \(error)\n", stderr)
    exit(1)
}
