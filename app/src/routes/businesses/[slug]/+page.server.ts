import { createSanityPreviewClient, groqAndId, sanity } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { Business } from "$lib/types/SanitySchema";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, url }) => {
	const isPreview = url.searchParams.get("preview") === "true";
	const id = url.searchParams.get("id");
	const token = url.searchParams.get("token");
	const slug = params.slug;

	if (isPreview) {
		if (!id || !token) {
			throw redirect(307, "/businesses");
		}
	}

	const sanityClient = isPreview && token ? createSanityPreviewClient(token) : sanity;

	const business = await sanityClient
		.fetch<Business>(
			`*[_type == "business" && slug.current == $slug ${groqAndId(id)}][0] {
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
	};
}) satisfies PageServerLoad;
