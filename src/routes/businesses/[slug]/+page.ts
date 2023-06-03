import { sanity } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { Business } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async ({ params, url }) => {
	const slug = params.slug;
	const business = await sanity
		.fetch<Business>(
			`*[_type == "business" && slug.current == $slug][0] {
		...,
		cover {
			..., 
			asset -> {..., metadata}
		}, 
		logo {
			..., 
			asset -> {..., metadata}
		}
		}`,
			{ slug },
		)
		.catch(() => null);

	if (!business) {
		throw redirect(307, "/businesses");
	}

	return {
		business,
		isStandalone: url.origin.endsWith(".ciorogarla.eu.org"),
	};
}) satisfies PageLoad;
