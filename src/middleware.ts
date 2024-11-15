import { defineMiddleware } from 'astro:middleware';
import { createDirectus, rest, readMe, authentication, refresh } from '@directus/sdk';

const client = createDirectus('https://wiktor.wondermakers.dev').with(authentication()).with(rest());

export const onRequest = defineMiddleware(async (context, next) => {

	console.log("Context[Middleware.ts]: ", context.locals)
	console.log("Cookies[Middleware.ts]: ", context.cookies);

	const current_access_token =  context.cookies.get("access_token")?.value
	const current_refresh_token =  context.cookies.get("refresh_token")?.value

	if (current_access_token) {
		try {
			const { access_token, refresh_token } = await client.request(refresh("json", current_refresh_token));

			if (access_token && refresh_token) {
				client.setToken(access_token);
				context.cookies.set("refresh_token", refresh_token)

				const user = await client.request(readMe());
				context.locals.user = user;
				console.log("Relogged in[Middleware.ts]: ", context.locals.user)
			}

		  } catch (error) {
			console.error("Auth error:", error);
		  }
	}

 	return next();
});
