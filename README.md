# Clash

The public documentation and legal-policy site for Clash, built with
[VitePress](https://vitepress.dev/).

Current site: <https://tokenpls.github.io/clash.md/>

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
