import { z } from 'astro/zod';
import { ActionError, defineAction } from 'astro:actions';
import { createDirectus, rest, authentication, login, refresh, logout, createUser, readMe } from '@directus/sdk';

const client = createDirectus('https://wiktor.wondermakers.dev').with(authentication()).with(rest());
const registerClient = createDirectus('https://wiktor.wondermakers.dev').with(rest());

const mode = "json"; // Can be json, cookie, session

async function handleLogin(email: string, password: string, context: any) {
	const response = await client.request(login(email, password, { mode }));
  
	if (!response.access_token || !response.refresh_token || !response.expires) return;

	const refreshResponse = await client.request(refresh(mode, response.refresh_token));
  
	client.setToken(refreshResponse.access_token);
  
	context.cookies.set("access_token", refreshResponse.access_token, {
	  maxAge: refreshResponse.expires,
	  secure: true,
	  sameSite: 'strict',
	  path: '/'
	});
	
	context.cookies.set("refresh_token", refreshResponse.refresh_token, {
	  maxAge: refreshResponse.expires,
	  secure: true,
	  sameSite: 'strict',
	  path: '/'
	});
  
	const user = await client.request(readMe());
	context.locals.user = user;
  
	return user;
  }

export const user = {
  getUser: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    handler: async ({ email, password }, context) => {
      try {
        const user = await handleLogin(email, password, context);

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
  }),
  createUser: defineAction({
    accept: 'form',
    input: z.object({
		first_name: z.string().optional(),
     	last_name: z.string().optional(),
     	email: z.string().email(),
     	password: z.string().min(8),
    }),
    handler: async ({ first_name, last_name, email, password }, context) => {
      try {
        const newUser = await registerClient.request(
          createUser({
			first_name,
			last_name,
            email,
            password,
			role: "42423e3c-58c5-4291-b358-41cd9f8e8336" // User
          })
        );

		console.log("Response[createUser]: ", newUser)

		// After creating user, log them in
		const user = await handleLogin(email, password, context);

        return {
          success: true,
          data: {
            user: user
          }
        };
      } catch (error) {
        console.error("[createUser]: ", error);
        throw new ActionError({
          code: error.code || 'USER_CREATE_ERROR',
          message: error.message || 'Failed to create user',
        });
      }
    },
  }),
  logoutUser: defineAction({
    accept: 'form',
    handler: async () => {
      try {
        await client.request(logout());
        
        return {
          success: true,
          message: 'Logged out successfully'
        };
      } catch (error) {
        console.error("[logoutUser]: ", error);
        throw new ActionError({
          code: error.code || 'LOGOUT_ERROR',
          message: error.message || 'Logout failed',
        });
      }
    },
  }),

  // Optional: Add password reset functionality
//   resetPassword: defineAction({
//     accept: 'form',
//     input: z.object({
//       email: z.string().email(),
//     }),
//     handler: async ({ email }) => {
//       try {
//         await client.request({
//           path: '/auth/password/request',
//           method: 'POST',
//           body: { email }
//         });

//         return {
//           success: true,
//           message: 'Password reset email sent'
//         };
//       } catch (error) {
//         console.error("[resetPassword]: ", error);
//         throw new ActionError({
//           code: error.code || 'RESET_ERROR',
//           message: error.message || 'Password reset request failed',
//         });
//       }
//     },
//   }),

  // Optional: Update user profile
//   updateUser: defineAction({
//     accept: 'form',
//     input: z.object({
//       firstName: z.string().optional(),
//       lastName: z.string().optional(),
//       email: z.string().email().optional(),
//       currentPassword: z.string().optional(),
//       newPassword: z.string().min(8).optional(),
//     }),
//     handler: async ({ firstName, lastName, email, currentPassword, newPassword }) => {
//       try {
//         const updates: any = {};
        
//         if (firstName) updates.first_name = firstName;
//         if (lastName) updates.last_name = lastName;
//         if (email) updates.email = email;
//         if (newPassword) {
//           updates.password = newPassword;
//           updates.current_password = currentPassword;
//         }

//         const updatedUser = await client.request({
//           path: '/users/me',
//           method: 'PATCH',
//           body: updates
//         });

//         return {
//           success: true,
//           data: {
//             user: updatedUser
//           }
//         };
//       } catch (error) {
//         console.error("[updateUser]: ", error);
//         throw new ActionError({
//           code: error.code || 'UPDATE_ERROR',
//           message: error.message || 'Failed to update user profile',
//         });
//       }
//     },
//   }),
};