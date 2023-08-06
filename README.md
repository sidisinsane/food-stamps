# Food Stamps

Printable Food Stamps/Labels with ingredients for Jars and Canning.

![Screenshot EN](https://github.com/sidisinsane/food-stamps/blob/409a26ae7de5dcbac4f8e1842aa3e8b8e753308e/public/assets/img/screenshots/en.png)
![Screenshot Currywurst Sauce EN](https://github.com/sidisinsane/food-stamps/blob/409a26ae7de5dcbac4f8e1842aa3e8b8e753308e/public/assets/img/screenshots/en-currywurst-sauce.png)

## Getting Started

1. Install app: `npm install`
2. Configure: Copy `.env.example` to `.env` and edit it
3. Start app: `npm start`

## Project Structure

This project is [build with Astro](https://docs.astro.build).

```
├── public/
│   ├── assets/
│   └── locales/
│       ├── de
│       |   └── translation.json
│       └── en
│           └── translation.json
├── src/
│   ├── components/
│   ├── content/
│       ├── food
│       |   └── recipe-1.mdx
│       |   └── recipe-2.mdx
│       |   └── ...
│       └── config.ts
│   ├── icons/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── .browserlistrc
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── astro-i18n.config.mjs
├── astro.config.mjs
├── jsdoc.config.mjs
├── postcss.config.cjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── CREDITS.md
├── README.md
└── LICENSE
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/food/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

The [astro-i18next plugin](https://github.com/yassinedoghri/astro-i18next) is used for translations.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                  |
| :------------------------ | :------------------------------------------------------ |
| `npm install`             | Installs dependencies                                   |
| `npm start`               | Starts local dev server at `localhost:3000`             |
| `npm run dev`             | Starts local dev server at `localhost:3000`             |
| `npm run build`           | Build your production site to `./dist/`                 |
| `npm run preview`         | Preview your build locally, before deploying            |
| `npm run sync`            | Generates content collection types                      |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`        |
| `npm run astro -- --help` | Get help using the Astro CLI                            |
| `npm run docs`            | Generates docs as set in `jsdoc.config.json`            |
| `npm run lint`            | Finds problems as set in `.eslintrc`                    |
| `npm run lint:fix`        | Tries to fix problems as set in `.eslintrc`             |
| `npm run prettier`        | Checks formatting of files as set in `.prettierrc.json` |
| `npm run prettier:write`  | Tries to format files as set in `.prettierrc.json`      |
