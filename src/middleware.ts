import { defineMiddleware } from 'astro:middleware';
import { createDirectus, rest, readMe, authentication, refresh } from '@directus/sdk';
import {log, error} from "@log"

const client = createDirectus('https://wiktor.wondermakers.dev').with(authentication()).with(rest());

export const onRequest = defineMiddleware(async (context, next) => {

	console.log("Middleware.ts running..")

	// Authentification
	const access_token =  context.cookies.get("access_token")?.value
	//const current_refresh_token =  context.cookies.get("refresh_token")?.value

	if (access_token) {
		try {
			// COMMENTED OUT SOLUTION WOULD RESOLVE IN REFRESHING THE TOKENS ON EVERY REQUEST, DO WE WANT THAT? I GUESS NOT?

			// const { access_token, refresh_token, expires } = await client.request(refresh("json", current_refresh_token));

			// if (access_token && refresh_token && expires) {
			// 	client.setToken(access_token);
			// 	context.cookies.delete("access_token");
			// 	context.cookies.set("refresh_token", refresh_token, {
			// 		path: '/',
			// 		secure: true,
			// 		sameSite: 'strict',
			// 		httpOnly: true,
			// 		maxAge: expires
			// 	  });

			// 	const user = await client.request(readMe());
			// 	context.locals.user = user;
			// 	log("Relogged in[Middleware.ts]: ", context.locals.user)
			// }

			//log("Access token[Middleware.ts]: ", access_token)
			client.setToken(access_token);
			const user = await client.request(readMe());
			context.locals.user = user;
			//log("Relogged in[Middleware.ts]: ", context.locals.user)

		  } catch (err) {
			error("Auth error:", err);
		  }
	} else {
		log("No access token[Middleware.ts]: ", access_token)
	}

	// Cart
	const cart = JSON.parse(context.cookies.get('cart')?.value || '[]');
	//log("Cart[Middleware.ts]: ", cart)
	//log("Cart Context[Middleware.ts]: ", context.locals)

	const order = JSON.parse(context.cookies.get('order')?.value || '{}');

	//context.locals.cart = { ...context.locals.cart, summary: order, products: cart };
	// so that its an array
	context.locals.cart = { summary: order, products: cart };

	// Scrape order cookies if we are not in the checkout/summary page
	if (!context.url.pathname.includes("checkout") && !context.url.pathname.includes("checkout") && context.cookies.get('order')?.value) {
		context.cookies.delete("order");
		log("Scrape order cookies[Middleware.ts]: ", context.cookies.get('order')?.value)
	}

 	return next();
});
