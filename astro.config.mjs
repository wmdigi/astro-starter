import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

const site = process.env.PUBLIC_SITE;

export default defineConfig({
	site,
	base: "/",
	integrations: [
		tailwind(),
		sitemap()
	],
	output: "hybrid",
	adapter: vercel({
		isr: true
	}),
});