import { defineMiddleware } from 'astro:middleware';
import { createDirectus, rest, readMe, authentication, refresh } from '@directus/sdk';

const client = createDirectus('https://wiktor.wondermakers.dev').with(authentication()).with(rest());

export const onRequest = defineMiddleware(async (context, next) => {

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
			// 	console.log("Relogged in[Middleware.ts]: ", context.locals.user)
			// }

			console.log("Access token[Middleware.ts]: ", access_token)
			client.setToken(access_token);
			const user = await client.request(readMe());
			context.locals.user = user;
			console.log("Relogged in[Middleware.ts]: ", context.locals.user)

		  } catch (error) {
			console.error("Auth error:", error);
		  }
	} else {
		console.log("No access token[Middleware.ts]: ", access_token)
	}

	// Cart
	const cart = JSON.parse(context.cookies.get('cart')?.value || '[]');
	console.log("Cart[Middleware.ts]: ", cart)
	context.locals.cart = cart;

 	return next();
});
