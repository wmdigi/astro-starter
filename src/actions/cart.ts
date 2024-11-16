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

		return { 
			success: true,
			data: {
				cart: updatedCart
			}
		};
   }
 }),
 removeFromCart: defineAction({
    input: z.object({
        product: z.string(),
    }),
    handler: async ({ product }, context) => {
        const cart = JSON.parse(context.cookies.get('cart')?.value || '[]');
        
        // Find index of first occurrence of product
        const indexToRemove = cart.indexOf(product);
        
        // If product found, remove just that one instance
        const updatedCart = indexToRemove >= 0 
            ? [...cart.slice(0, indexToRemove), ...cart.slice(indexToRemove + 1)]
            : cart;

        console.log("Updated cart[removeFromCart]: ", updatedCart);
        
        context.cookies.set('cart', JSON.stringify(updatedCart), {
            path: '/',
            maxAge: 604800 // 7 days
        });

        context.locals.cart = updatedCart;

        return { 
            success: true,
            data: {
                cart: updatedCart
            }
        };
    }
 }),	
 removeAllFromCart: defineAction({
	input: z.object({
		product: z.string(),
  	}),
 	handler: async ({ product }, context) => {

		const cart = JSON.parse(context.cookies.get('cart')?.value || '[]');

		const updatedCart = cart.filter((item: string) => item !== product)

		console.log("Updated cart[removeFromCart]: ", updatedCart)
		
		context.cookies.set('cart', JSON.stringify(updatedCart), {
			path: '/',
		 	maxAge: 604800 // 7 days
		});

		context.locals.cart = updatedCart;

		return { 
			success: true,
			data: {
				cart: updatedCart
			}
		};
   }
 })
};

