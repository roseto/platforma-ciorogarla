import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	const session = await locals.getSession();

	return {
		session
	};
}) satisfies LayoutServerLoad;
