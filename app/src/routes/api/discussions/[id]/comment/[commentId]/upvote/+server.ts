import { sanitySudo } from "$lib/utils/sanitySudo";
import { supabaseSudo } from "$lib/utils/supabaseSudo";
import { error } from "@sveltejs/kit";

export const POST = async ({ request, params }) => { 
	const jwt = request.headers.get("Authorization")?.split(" ")[1];
	const documentId = params.id;
	const commentId = params.commentId;

	if (!jwt) {
		throw error(400, "No JWT provided");
	}

	if (!documentId) {
		throw error(400, "No document ID provided");
	}

	const { data: { user } } = await supabaseSudo.auth.getUser(jwt);

	if (!user) {
		throw error(400, "Invalid JWT");
	}

	// Check if document is a discussion
	const { _type, locked } = await sanitySudo.fetch(`*[_id == "${documentId}"][0] { _type, locked }`);

	if (_type !== "discussion") {
		throw error(400, "Document is not a discussion");
	}

	if (locked) {
		throw error(400, "Discussion is locked");
	}

	const comment = await sanitySudo.fetch(`*[_id == "${commentId}"][0] { _type, upvotes }`);

	if (comment._type !== "discussionComment") {
		throw error(400, "Document is not a comment");
	}

	// Check if user has already upvoted
	if (comment.upvotes?.includes(user.id)) {
		throw error(400, "User has already upvoted");
	}

	try {
		await sanitySudo.patch(commentId)
			.setIfMissing({ upvotes: [] })
			.append("upvotes", [user.id])
			.commit({
				autoGenerateArrayKeys: true,
			});

		return new Response(null, {
			status: 200,
		});
	} catch (err) {
		throw error(400, err.message);
	}
};


export const DELETE = async ({ request, params }) => { 
	const jwt = request.headers.get("Authorization")?.split(" ")[1];
	const documentId = params.id;
	const commentId = params.commentId;

	if (!jwt) {
		throw error(400, "No JWT provided");
	}

	if (!documentId) {
		throw error(400, "No document ID provided");
	}

	const { data: { user } } = await supabaseSudo.auth.getUser(jwt);

	if (!user) {
		throw error(400, "Invalid JWT");
	}

	// Check if document is a discussion
	const { _type, locked } = await sanitySudo.fetch(`*[_id == "${documentId}"][0] { _type, locked }`);

	if (_type !== "discussion") {
		throw error(400, "Document is not a discussion");
	}

	if (locked) {
		throw error(400, "Discussion is locked");
	}

	const comment = await sanitySudo.fetch(`*[_id == "${commentId}"][0] { _type, upvotes }`);

	if (comment._type !== "discussionComment") {
		throw error(400, "Document is not a comment");
	}

	// Check if user has already upvoted
	if (!comment.upvotes?.includes(user.id)) {
		throw error(400, "User didn't upvote");
	}

	try {
		// upvotes is an array of strings, so we need to use unset
		// there is no _key
		await sanitySudo.patch(commentId)
			.unset([`upvotes[@ == "${user.id}"]`])
			.commit();

		return new Response(null, {
			status: 200,
		});
	} catch (err) {
		throw error(400, err.message);
	}
};
