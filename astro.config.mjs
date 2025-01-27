import { defineConfig } from "astro/config";
import dom from "@wmdigi/dom/astro";
//import swup from "@swup/astro";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import htmx from "astro-htmx";

//import partytown from "@astrojs/partytown";

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
	integrations: [
		// swup({
		// 	theme: false, // fade, slide, overlay
		// 	progress: false,
		// 	globalInstance: true,
		// 	loadOnIdle: false,
		// }),
		htmx(),
		dom(),
		sitemap(),
	],
	adapter: vercel(),
	experimental: {
		// import SVG files as components
		svg: true,
	},
});
