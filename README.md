# Clash

The public documentation and legal-policy site for Clash, built with
[VitePress](https://vitepress.dev/).

Current site: <https://clash.md/>

## Local development

Requires Node.js 20 or newer.

```sh
npm install
npm run docs:dev
```

Build and preview the production site:

```sh
npm run docs:build
npm run docs:preview
```

## Deployment

VitePress source lives on `main`. Every push to `main` is built and deployed to
GitHub Pages by `.github/workflows/deploy-pages.yml`. The production site is
available at `https://clash.md`.

## Content

- `docs/guide/` — product documentation
- `docs/privacy.md` — canonical Privacy Policy
- `docs/terms.md` — canonical supplementary Terms of Use

## Source repositories

- [Clash client](https://github.com/TokenPLS/Hako-Client)
- [Hako core](https://github.com/TokenPLS/Hako)

## License

The website source code is available under the [MIT License](LICENSE).
`docs/privacy.md` and `docs/terms.md` are legal notices and are not licensed as
software under the MIT License.

## Configuration reference maintenance

`npm run docs:config-sync` rebuilds the field index from the reviewed inputs in
`docs/.vitepress/data/config-field-audit.json` and `tun-reference.json`. Update
those inputs after checking a fixed core revision; do not infer behavior from
a separate SDK lock or from field names alone. Source audit revision, SDK lock
revision, and shipped-build verification are recorded separately. Container
entries do not enumerate every nested protocol parameter.

The navigation follows the 13 main sections of the mihomo reference. Protocol
recipes live in `docs/guide/config/outbound/` and `docs/zh/guide/config/outbound/`;
keep the two languages and their sidebar entries in sync. Examples must include
required fields, distinguish complete profiles from node-level fragments, and
use illustrative credentials only. Check examples against the pinned parser and
its constructors, not just upstream documentation or option-struct names.
The September 2026 expansion compares Meta-Docs revision
`e52690240f2e4a70de75002c6cf87e2e7921d29c` with the source audit revision above.
YAML or constructor validation does not establish server or device connectivity.
