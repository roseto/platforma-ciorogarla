import { sanity } from "$lib/utils/sanity";
import type { Article, Business, Discussion, VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async () => {
	// TODO: Do not query locked discussions
	// This is for the future since we have few discussions
	// for now
	const data = await sanity.fetch<{
		urgentArticle: Article;
		articles: Article[];
		businesses: Business[];
		projects: VolunteeringProject[];
		discussions: Discussion[];
	}>(`
		{
			"urgentArticle": *[_type == "article" && isUrgent] | order(_createdAt desc)[0],
			"articles": *[_type == "article"] | order(_createdAt desc)[0...3],
			"businesses": *[_type == "business"] | order(_createdAt desc)[0...3],
			"projects": *[_type == "volunteeringProject" && dateTime(period.fromDate + 'T00:00:00Z') > dateTime(now())] | order(_createdAt desc)[0...3],
			"discussions": *[_type == "discussion"] | order(_updatedAt desc)[0...3] { ..., "upvotesCount": count(upvotes) }
		}
	`);

	return data;
}) satisfies PageLoad;
