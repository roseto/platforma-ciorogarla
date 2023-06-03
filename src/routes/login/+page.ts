import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
	const data = await parent()
	const user = data.session?.user;

	if (user) {
		throw redirect(307, "/");
	}

	return null;
}) satisfies PageLoad;
