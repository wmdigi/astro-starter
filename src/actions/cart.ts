// actions/cart.ts
import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';

export const cart = {
 addToCart: defineAction({
	input: z.object({
		product: z.string(),
  	}),
 	handler: async ({ product }, context) => {

		const cart = JSON.parse(context.cookies.get('cart')?.value || '[]');

		const updatedCart = [...cart, product];

		context.cookies.set('cart', JSON.stringify(updatedCart), {
			path: '/',
		 	maxAge: 604800 // 7 days
		});

		context.locals.cart = updatedCart;

		return { success: true };
   }
 })
};

