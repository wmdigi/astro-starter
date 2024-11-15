import { defineMiddleware } from 'astro:middleware';
import { createDirectus, rest, readMe, authentication } from '@directus/sdk';

const client = createDirectus('https://wiktor.wondermakers.dev').with(authentication()).with(rest());

export const onRequest = defineMiddleware(async (context, next) => {

	console.log("Context[Middleware.ts]: ", context.locals)
	console.log("Cookies[Middleware.ts]: ", context.cookies);

	const access_token =  context.cookies.get("access_token")?.value

	if (access_token) {
		try {
			client.setToken(access_token);
			const user = await client.request(readMe());
			context.locals.user = user;
			console.log("Relogged in[Middleware.ts]: ", context.locals.user)
		  } catch (error) {
			console.error("Auth error:", error);
		  }
	}

 	return next();
});
