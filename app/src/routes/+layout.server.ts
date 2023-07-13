import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";


export const load = (async ({ locals, url }) => {
	const session = await locals.getSession();
	const isDevDeploy = url.origin === "dev.ciorogarla.eu.org"
	const isSubdomain = url.origin.endsWith(".ciorogarla.eu.org");

	// Since we can't use Netlify redirects, we have to do this here
	if (url.host === "app.ciorogarlaunita.eu.org") {
		throw redirect(301, "https://ciorogarla.eu.org" + url.pathname + url.search);
	}

	if (isSubdomain && !isDevDeploy) {
		throw redirect(
			301,
			"https://ciorogarla.eu.org/businesses/" + url.host.split(".")[0] + "?utm_source=subdomain",
		);
	}

	return {
		session,
	};
}) satisfies LayoutServerLoad;
