import { ApiHandler } from "sst/node/api";

export const main = ApiHandler(async (_evt) => {
	console.log("cookies: ", _evt.cookies);

	const token = "HELLO";

	const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
	const expires = new Date(Date.now() + ONE_WEEK);

	return {
		statusCode: 200,
		body: `Hello world. The time is ${new Date().toISOString()}`,
		cookies: [
			`auth-token=${token}; HttpOnly; SameSite=None; Secure; Path=/; Expires=${expires}`,
		],
	};
});
