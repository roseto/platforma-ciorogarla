import type { Discussion } from "$lib/types/SanitySchema";
import { sanity } from "$lib/utils/sanity";
import type { PageLoad } from "./$types"

export const load = (async ({ parent }) => {
	const { session } = await parent();
	// Discussions that have been upvoted at least once
	// and updated in the last 10 days
	const sanityData = await sanity.fetch<{ activeDiscussions: Discussion[], allDiscussions: Discussion[], hasUnapprovedDiscussion: Discussion[] }>(`{
		"activeDiscussions": *[_type == "discussion" && approved && dateTime(_updatedAt) > dateTime(now()) - 60*60*24*10 && defined(upvotes[0]) && !locked][0...3] {
			...,
			"upvotesCount": count(upvotes)
		},
		"allDiscussions": *[_type == "discussion" && approved] {
			...,
			"upvotesCount": count(upvotes)
		}
	}`, { userId: session?.user?.id || "" });

	return sanityData;
}) satisfies PageLoad;
