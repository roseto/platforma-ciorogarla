import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const acceptedTerms = cookies.get("accepted-terms");

	if (acceptedTerms) {
		throw redirect(301, "/");
	}

}) satisfies PageServerLoad;


export const actions = {
	default: async ({ request, cookies, url }) => {
		console.log("default action", request, cookies, url);

		const form = await request.formData();
		const acceptedTerms = form.get("terms");
		
		if (acceptedTerms === "on") {
			cookies.set("accepted-terms", "true", {
				path: "/",
				maxAge: 60 * 60 * 24 * 365 * 10
			});

			throw redirect(301, url.searchParams.get("redirect") || "/");
		}

		throw error(400, "You must accept the terms and conditions to continue.");
	}
} satisfies Actions;
