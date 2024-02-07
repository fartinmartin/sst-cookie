import { ApiHandler } from "sst/node/api";

export const main = ApiHandler(async ({ cookies }) => {
	const sentToken = parse(cookies);
	const token = "HELLO";

	const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
	const expires = new Date(Date.now() + ONE_WEEK);

	return {
		statusCode: 200,
		body: `Hello world. The time is ${new Date().toISOString()}. ${
			sentToken
				? `\n\nYour request came with an "test-token" cookie with the value: ${sentToken}`
				: ""
		}`,
		cookies: [
			`test-token=${token}; HttpOnly; SameSite=None; Secure; Path=/; Expires=${expires}`,
		],
	};
});

function parse(cookies: string[] | undefined) {
	if (cookies?.length) {
		const cookie = cookies[0];
		const token = cookie.split("=")[1];
		return token;
	} else {
		return undefined;
	}
}
