import { sanityEager } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Discussion } from "$lib/types/SanitySchema";
import { supabase } from "$lib/utils/supabase";
import type { UserProfile } from "$lib/types/UserProfile";
import { notypecheck } from "$lib/utils/typecheck";

export const load = (async ({ params, data }) => {
	const id = params.id;
	const session = data?.session;

	
	if (!id) {
		throw redirect(307, "/discussions");
	}

	const discussion = await sanityEager.fetch<Discussion>(`*[_type == "discussion" && _id == $id][0] {
		...,
		comments[] -> {...},
		media { ..., "url": asset->url },
		"upvotesCount": count(upvotes) - count(upvotes[@ == $userId]),
		relevantDocument -> {
			...,
			"title": coalesce(title, name),
			"image": coalesce(logo, cover, image),
			"description": coalesce(description),
			"urlBase": select(
				_type == "volunteeringProject" => "/projects/" + slug.current,
				_type == "business" => "/businesses/" + slug.current,
				_type == "article" => "/news/" + slug.current,
			)
		}
	}`, { id, userId: session?.user?.id || "" });


	if (!discussion) {
		throw redirect(307, "/discussions");
	}

	const authorUserId = discussion.userId;

	if (!authorUserId) {
		throw redirect(307, "/discussions");
	}

	const { data: userData } = await supabase.from("profiles")
		.select("id, full_name, avatar_url")
		.eq("id", authorUserId)
		.single();

	const upvoted = discussion.upvotes?.some(upvote => upvote === authorUserId) || false;
	const userIds = discussion.comments?.map(comment => notypecheck(comment).userId) || [];

	const { data: usersData } = await supabase.from("profiles").select("id, full_name, avatar_url")
		.in("id", userIds || []);

	return {
		upvoted,
		discussion,
		author: userData as UserProfile,
		users: usersData as UserProfile[] || [],
	};
}) satisfies PageLoad;
