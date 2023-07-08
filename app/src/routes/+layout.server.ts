import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const allowedWithoutAccept = ["/terms-and-conditions", "/privacy-policy", "/welcome"];

export const load = (async ({ locals, cookies, url }) => {
	const session = await locals.getSession();
	const acceptedTerms = cookies.get("accepted-terms");
	const isSubdomain = url.origin.endsWith(".ciorogarla.eu.org");

	if (isSubdomain) {
		throw redirect(301, "https://ciorogarla.eu.org/businesses/" + url.host.split(".")[0]);
	}

	if (!allowedWithoutAccept.includes(url.pathname) && !acceptedTerms && !isSubdomain) {
		throw redirect(301, "/welcome?redirect=" + encodeURIComponent(url.pathname));
	}

	return {
		session,
		acceptedTerms
	};
}) satisfies LayoutServerLoad;
