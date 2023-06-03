import { sanity } from "$lib/utils/sanity";
import type { Article, Business, VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const urgentArticlePromise = sanity.fetch<Article>(
		`*[_type == "article" && isUrgent] | order(_createdAt desc)[0]`
	);
	const articlesPromise = sanity.fetch<Article[]>(
		`*[_type == "article"] | order(_createdAt desc)[0...3]`
	);
	const businessesPromise = sanity.fetch<Business[]>(
		`*[_type == "business"] | order(_createdAt desc)[0...3]`
	);
	const projectsPromise = sanity.fetch<VolunteeringProject[]>(
		`*[_type == "volunteeringProject"] | order(_createdAt desc)[0...3]`
	);

	const [urgentArticle, articles, businesses, projects] = await Promise.all([
		urgentArticlePromise,
		articlesPromise,
		businessesPromise,
		projectsPromise
	]);

	return {
		urgentArticle,
		articles,
		businesses,
		projects
	};
}) satisfies PageLoad;
