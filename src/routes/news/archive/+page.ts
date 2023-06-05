import { sanity } from "$lib/utils/sanity";
import type { Article } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const articles = await sanity.fetch<Article[]>(`*[_type == "article"]| order(_createdAt desc)`);

	return {
		articles,
	};
}) satisfies PageLoad;
