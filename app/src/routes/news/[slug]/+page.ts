import { createSanityPreviewClient, groqAndId, sanity } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { Article } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async ({ params, url }) => {
	const isPreview = url.searchParams.get("preview") === "true";
	const id = url.searchParams.get("id");
	const token = url.searchParams.get("token");
	const slug = params.slug;

	if (isPreview) {
		if (!id || !token) {
			throw redirect(307, "/volunteering");
		}
	}

	const sanityClient = isPreview && token ? createSanityPreviewClient(token) : sanity;

	const article = await sanityClient
		.fetch<Article>(
			`*[_type == "article" && slug.current == $slug ${groqAndId(id)}][0] {
		...,
		cover {
			..., 
			asset -> {..., metadata}
		}, 
		}`,
			{ slug },
		)
		.catch(() => null);

	if (!article) {
		throw redirect(307, "/news");
	}

	return {
		article,
	};
}) satisfies PageLoad;
