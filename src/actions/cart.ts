import { z } from 'astro/zod';
import { ActionError, defineAction } from 'astro:actions';

export const user = {
  getUser: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    handler: async ({ email, password }, context) => {
      try {
       

		console.log("Context[getUser]: ", user)

        return {
          success: true,
          data: {
			user
		  }
        };
      } catch (error) {
        console.error("[getUser]: ", error);
        throw new ActionError({
          code: error.code || 'AUTH_ERROR',
          message: error.message || 'Authentication failed',
        });
      }
    },
  })
};