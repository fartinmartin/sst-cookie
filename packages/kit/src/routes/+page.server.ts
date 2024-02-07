export async function load({ locals }) {
	return {
		foo: locals.foo,
		authToken: locals.authToken,
		cookieToken: locals.cookieToken,
	};
}
