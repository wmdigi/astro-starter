import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import dom from "@wmdigi/dom/astro";
import htmx from "astro-htmx";

const site = process.env.PUBLIC_SITE;

export default defineConfig({
	site,
	base: "/",
	vite: {
		plugins: [tailwindcss()],
	},
	devToolbar: {
		enabled: false,
	},
	integrations: [htmx(), dom(), sitemap()],
	adapter: vercel(),
});
