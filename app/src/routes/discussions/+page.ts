import type { Discussion } from "$lib/types/SanitySchema";
import { sanity } from "$lib/utils/sanity";
import type { PageLoad } from "./$types"

export const load = (async () => {
	// Discussions that have been upvoted at least once
	// and updated in the last 10 days
	const data = sanity.fetch<{ activeDiscussions: Discussion[], allDiscussions: Discussion[] }>(`{
		"activeDiscussions": *[_type == "discussion" && approved && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*10 && defined(upvotes[0]) && !locked] {
			...,
			"upvotesCount": count(upvotes)
		},
		"allDiscussions": *[_type == "discussion" && approved] {
			...,
			"upvotesCount": count(upvotes)
		}
	}`);

	return data;
}) satisfies PageLoad;
