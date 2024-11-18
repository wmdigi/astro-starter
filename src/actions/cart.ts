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

		console.log("Updated cart[cart.ts/addToCart]: ", updatedCart);

		context.cookies.set('cart', JSON.stringify(updatedCart), {
			path: '/',
		 	maxAge: 604800 // 7 days
		});

		context.locals.cart.products = updatedCart;

		return { 
			success: true,
			data: {
				cart: {
					products: updatedCart
				}
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

        console.log("Updated cart[cart.ts/removeFromCart]: ", updatedCart);
        
        context.cookies.set('cart', JSON.stringify(updatedCart), {
            path: '/',
            maxAge: 604800 // 7 days
        });

		context.locals.cart.products = updatedCart;

        return { 
            success: true,
            data: {
				cart: {
					products: updatedCart
				}
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

		console.log("Updated cart[cart.ts/removeFromCart]: ", updatedCart)
		
		context.cookies.set('cart', JSON.stringify(updatedCart), {
			path: '/',
		 	maxAge: 604800 // 7 days
		});

		context.locals.cart.products = updatedCart;

		return { 
			success: true,
			data: {
				cart: {
					products: updatedCart
				}
			}
		};
   }
 }),
 checkout: defineAction({
	accept: 'form',
	input: z.object({
		first_name: z.string(),
		last_name: z.string(),
		email: z.string().email(),
		address: z.string(),
		city: z.string(),
		zip: z.string(),
		terms: z.string(),
  	}),
 	handler: async ({ first_name, last_name, email, address, city, zip, terms }, context) => {

		console.log("Checkout![cart.ts/checkout]")

		console.log(context.locals.cart)

		const order = {
			products: context.locals.cart.products,
			info: {
				first_name,
				last_name,
				email,
				address,
				city,
				zip,
				terms
			}
		}

		console.log("Order completed![cart.ts/checkout]: ", order)

		context.locals.cart.summary = order;
		context.locals.cart.products = [];
		
		context.cookies.set('cart', JSON.stringify([]), {
			path: '/',
		 	maxAge: 604800 // 7 days
		});

		context.cookies.set('order', JSON.stringify(order), {
			path: '/',
		 	maxAge: 604800 // 7 days
		});

		return { 
			success: true,
			data: {
				summary: order
			}
		};
   }
 }),
//  emptyCart: defineAction({
//  	handler: async (_, context) => {

// 		console.log("Cart is empty[cart.ts/emtpyCart]")

// 		context.cookies.set('cart', "[]", {
// 			path: '/',
// 		 	maxAge: 604800 // 7 days
// 		});

// 		context.locals.cart = "[]"

// 		return { 
// 			success: true,
// 		};
//    }
//  }),
};

