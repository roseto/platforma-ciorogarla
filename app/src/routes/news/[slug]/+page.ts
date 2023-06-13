import { sanity } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { Article } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	const slug = params.slug;
	const article = await sanity
		.fetch<Article>(
			`*[_type == "article" && slug.current == $slug][0] {
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
