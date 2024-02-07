import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
	const api = new Api(stack, "api", {
		defaults: {
			function: {},
		},
		routes: {
			"GET /cookie": "packages/functions/src/cookie.main",
		},
	});

	const web = new StaticSite(stack, "web", {
		path: "packages/web",
		buildOutput: "dist",
		buildCommand: "npm run build",
		environment: {
			VITE_APP_API_URL: api.url,
		},
	});

	api.setCors({
		allowCredentials: true,
		allowHeaders: ["content-type"],
		allowMethods: ["ANY"],
		allowOrigins: web.url
			? ["http://localhost:5173", web.url]
			: ["http://localhost:5173"],
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
		SiteUrl: web.customDomainUrl || web.url,
	});
}
