import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const allowedWithoutAccept = ["/terms-and-conditions", "/privacy-policy", "/welcome"];

export const load = (async ({ locals, cookies, url }) => {
	const session = await locals.getSession();
	const acceptedTerms = cookies.get("accepted-terms");

	if (!allowedWithoutAccept.includes(url.pathname) && !acceptedTerms) {
		throw redirect(301, "/welcome?redirect=" + encodeURIComponent(url.pathname));
	}

	return {
		session,
		acceptedTerms
	};
}) satisfies LayoutServerLoad;
