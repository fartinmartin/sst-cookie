import { PUBLIC_API_URL } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get("auth-token");

	event.locals.foo = "bar";
	event.locals.token = token;

	return resolve(event);
};

import type { HandleFetch } from "@sveltejs/kit";

// https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
// doesn't seem to have any effect
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith(PUBLIC_API_URL)) {
		const token = event.request.headers.get("auth-token");
		request.headers.set("cookie", token ?? "");
	}

	return fetch(request);
};
