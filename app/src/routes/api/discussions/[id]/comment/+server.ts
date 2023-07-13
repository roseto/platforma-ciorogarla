import { openai } from "$lib/utils/openai";
import { sanitySudo } from "$lib/utils/sanitySudo";
import { supabaseSudo } from "$lib/utils/supabaseSudo";
import { error } from "@sveltejs/kit";

export const POST = async ({ request, params }) => {
	const jwt = request.headers.get("Authorization")?.split(" ")[1];
	const documentId = params.id;
	const commentText = await request.json().then((body) => body.content);

	if (!jwt) {
		throw error(400, "No JWT provided");
	}

	if (!documentId) {
		throw error(400, "No document ID provided");
	}

	const results = await openai
		.createModeration({
			model: "text-moderation-latest",
			input: commentText,
		})
		.then((res) => res.data.results)
		.catch((err) => {
			console.log(err);
			throw error(500, "Could not check query");
		});

	if (results[0]?.flagged) {
		throw error(400, "Bad Request");
	}

	const { data: { user } } = await supabaseSudo.auth.getUser(jwt);

	if (!user) {
		throw error(400, "Invalid JWT");
	}

	const { data: userData } = await supabaseSudo.from("profiles")
		.select("id, discussion_ban")
		.eq("id", user.id)
		.single();

	if (!userData) {
		throw error(400, "User not found");
	}

	if (userData.discussion_ban) {
		throw error(400, "User is banned from discussions");
	}

	const { _type, locked } = await sanitySudo.fetch(`*[_id == "${documentId}"][0] { _type, locked }`);

	if (_type !== "discussion") {
		throw error(400, "Document is not a discussion");
	}

	if (locked) {
		throw error(400, "Discussion is locked");
	}

	try {
		const comment = await sanitySudo
			.create({
				_type: "discussionComment",
				userId: user.id,
				content: commentText,
			})

		await sanitySudo
			.patch(documentId)
			.setIfMissing({ comments: [] })
			.append("comments", [{ _key: comment._id, _ref: comment._id, _type: "reference" }])
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
