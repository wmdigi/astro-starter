import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

const site = process.env.PUBLIC_SITE;

export default defineConfig({
    site,
    base: "/",
    integrations: [
		tailwind(), 
		sitemap(),
		// partytown(
		// 	{
		// 		config: { debug: false },
		// 	}
		// ),
	],
    output: "static",
    adapter: vercel({
        isr: true
    }),
});