import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, cookies }) => {
	const session = await locals.getSession();
	const visited = cookies.get("visited");

	return {
		session,
		visited,
	};
}) satisfies LayoutServerLoad;
