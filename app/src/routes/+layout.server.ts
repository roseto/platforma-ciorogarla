import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const allowedWithoutAccept = ["/terms-and-conditions", "/privacy-policy", "/welcome"];

export const load = (async ({ locals, cookies, url }) => {
	const session = await locals.getSession();
	const acceptedTerms = cookies.get("accepted-terms");
	const isSubdomain = url.origin.endsWith(".ciorogarla.eu.org");
	const comesFromSubdomain = url.searchParams.get("utm_source") === "subdomain";


	// Since we can't use Netlify redirects, we have to do this here
	if (url.host === "app.ciorogarlaunita.eu.org") {
		throw redirect(301, "https://ciorogarla.eu.org" + url.pathname + url.search);
	}

	if (isSubdomain) {
		throw redirect(301, "https://ciorogarla.eu.org/businesses/" + url.host.split(".")[0] + "?utm_source=subdomain");
	}

	// Takes care to redirect to the welcome page if the user hasn't accepted the terms
	if (!allowedWithoutAccept.includes(url.pathname) && !acceptedTerms && !isSubdomain && !comesFromSubdomain) {
		throw redirect(301, "/welcome?redirect=" + encodeURIComponent(url.pathname));
	}

	return {
		session,
		acceptedTerms
	};
}) satisfies LayoutServerLoad;
