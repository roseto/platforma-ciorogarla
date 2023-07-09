import { sanity } from "$lib/utils/sanity";
import type { Article, Business, VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const data = await sanity.fetch<{
		urgentArticle: Article;
		articles: Article[];
		businesses: Business[];
		projects: VolunteeringProject[];
	}>(`
		{
			"urgentArticle": *[_type == "article" && isUrgent] | order(_createdAt desc)[0],
			"articles": *[_type == "article"] | order(_createdAt desc)[0...3],
			"businesses": *[_type == "business"] | order(_createdAt desc)[0...3],
			"projects": *[_type == "volunteeringProject" && dateTime(period.fromDate + 'T00:00:00Z') > dateTime(now())] | order(_createdAt desc)[0...3]
		}
	`);

	return data;
}) satisfies PageLoad;
