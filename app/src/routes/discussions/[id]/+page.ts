import { sanityEager } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Discussion, DiscussionComment } from "$lib/types/SanitySchema";
import { supabase } from "$lib/utils/supabase";
import type { UserProfile } from "$lib/types/UserProfile";
import { notypecheck } from "$lib/utils/typecheck";

export const load = (async ({ params, parent }) => {
	const id = params.id;
	const data = await parent();
	const session = data?.session;


	if (!id) {
		throw redirect(307, "/discussions");
	}

	// TODO: Rename urlBase
	const discussionData = await sanityEager.fetch<{comments: DiscussionComment[], discussion: Discussion}>(`{
		"comments": *[_type == "discussionComment" && discussion._ref == $id] {
			...,
			"upvotesCount": count(upvotes) - count(upvotes[@ == $userId]),
			"upvotedByUser": count(upvotes[@ == $userId]) > 0,
			replyTo -> {...}
		} | order(upvotesCount asc),
		"discussion": *[_type == "discussion" && _id == $id][0] {
			...,
			media { ..., "url": asset->url },
			"upvotesCount": count(upvotes) - count(upvotes[@ == $userId]),
			"upvotedByUser": count(upvotes[@ == $userId]) > 0,
			relevantDocument -> {
				...,
				"title": coalesce(title, name),
				"image": coalesce(logo, cover, image),
				"description": coalesce(description),
				"url": select(
					_type == "volunteeringProject" => "/projects/" + slug.current,
					_type == "business" => "/businesses/" + slug.current,
					_type == "article" => "/news/" + slug.current,
				)
			}
		}
	}`, { id, userId: session?.user?.id || "" });

	if (!discussionData) {
		throw redirect(307, "/discussions");
	}

	const authorUserId = discussionData.discussion.userId;

	if (!authorUserId) {
		throw redirect(307, "/discussions");
	}

	let authorData: UserProfile | null = null;

	// Here we check if the author is the current user, if so we don't need to fetch the author data
	// This results in a faster page load
	if (authorUserId === session?.user?.id) {
		authorData = {
			id: session.user.id,
			full_name: session.user.user_metadata.full_name,
			avatar_url: session.user.user_metadata.avatar_url,
			// We suppose that the current user is not banned
			// otherwise he wouldn't be able to create a discussion
			// Either way, it doesn't matter the authorData is only 
			// to display the author of the discussion
			discussion_ban: false
		};
	} else {
		const { data: userData } = await supabase.from("profiles")
			.select("id, full_name, avatar_url, discussion_ban")
			.eq("id", authorUserId)
			.single();

		if (!userData) {
			throw redirect(307, "/discussions");
		}

		authorData = userData as UserProfile;
	}

	const userIds = discussionData.comments?.map(comment => notypecheck(comment).userId) || [];

	const { data: usersData } = await supabase.from("profiles").select("id, full_name, avatar_url")
		.in("id", userIds || []);

	return {
		discussion: discussionData.discussion,
		comments: discussionData.comments,
		author: authorData,
		users: usersData as UserProfile[] || [],
	};
}) satisfies PageLoad;
