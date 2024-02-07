import { AuthHandler } from "sst/node/auth";

export const handler = AuthHandler({
	providers: {
		guest: async () => {
			const token = "HELLO_GUEST";

			const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
			const expires = new Date(Date.now() + ONE_WEEK);

			return {
				statusCode: 200,
				cookies: [
					`auth-token=${token}; HttpOnly; SameSite=None; Secure; Path=/; Expires=${expires}`,
				],
			};
		},
	},
});
