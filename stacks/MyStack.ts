import { StackContext, Api, Auth, SvelteKitSite } from "sst/constructs";

export function API({ stack }: StackContext) {
	const auth = new Auth(stack, "auth", {
		authenticator: {
			handler: "packages/functions/src/auth.handler",
		},
	});

	const api = new Api(stack, "api", {
		routes: {
			"GET /cookie": "packages/functions/src/cookie.main",
		},
		cors: {
			allowCredentials: true,
			allowHeaders: ["content-type"],
			allowMethods: ["ANY"],
			allowOrigins: [
				"http://localhost:5173",
				"https://dzu04z3f5bf8e.cloudfront.net",
			],
		},
	});

	auth.attach(stack, {
		api,
		prefix: "/auth", // optional
	});

	const kit = new SvelteKitSite(stack, "site", {
		path: "packages/kit",
		buildCommand: "pnpm run build",
		environment: {
			PUBLIC_API_URL: api.customDomainUrl || api.url,
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
		KitUrl: kit.customDomainUrl || kit.url,
	});
}
