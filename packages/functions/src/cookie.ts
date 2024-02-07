import { ApiHandler } from "sst/node/api";
import { parse } from "cookie";

export const main = ApiHandler(async ({ cookies }) => {
	const cooks = JSON.stringify(parse(cookies?.join(";") ?? ""), null, 2);
	const token = "HELLO";

	const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
	const expires = new Date(Date.now() + ONE_WEEK);

	return {
		statusCode: 200,
		body: `Hello world. The time is ${new Date().toISOString()}.\n\nYour request came with the following cookies: ${cooks}`,
		cookies: [
			`test-token=${token}; HttpOnly; SameSite=None; Secure; Path=/; Expires=${expires}`,
		],
	};
});
