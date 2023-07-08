import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const allowedWithoutAccept = ["/terms-and-conditions", "/privacy-policy", "/welcome"];

export const load = (async ({ locals, cookies, url }) => {
	const session = await locals.getSession();
	const acceptedTerms = cookies.get("accepted-terms");
	const isSubdomain = url.origin.endsWith(".ciorogarla.eu.org") || url.searchParams.has("utm_source=subdomain");

	if (url.host === "app.ciorogarlaunita.eu.org") {
		throw redirect(301, "https://ciorogarla.eu.org" + url.pathname + url.search);
	}

	if (isSubdomain) {
		throw redirect(301, "https://ciorogarla.eu.org/businesses/" + url.host.split(".")[0] + "?utm_source=subdomain");
	}

	if (!allowedWithoutAccept.includes(url.pathname) && !acceptedTerms && !isSubdomain) {
		throw redirect(301, "/welcome?redirect=" + encodeURIComponent(url.pathname));
	}

	return {
		session,
		acceptedTerms
	};
}) satisfies LayoutServerLoad;
