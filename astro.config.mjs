import mdx from "@astrojs/mdx";
import astroI18next from "astro-i18next";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [astroI18next(), mdx(), sitemap()],
});
