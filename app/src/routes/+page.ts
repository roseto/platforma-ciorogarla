import { sanity } from "$lib/utils/sanity";
import type { Article, Business } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const data = await sanity.fetch<{
		urgentArticle: Article;
		articles: Article[];
		businesses: Business[];
	}>(`
		{
			"urgentArticle": *[_type == "article" && isUrgent] | order(_createdAt desc)[0],
			"articles": *[_type == "article"] | order(_createdAt desc)[0...3],
			"businesses": *[_type == "business"] | order(_createdAt desc)[0...3]
		}
	`);

	return data;
}) satisfies PageLoad;
