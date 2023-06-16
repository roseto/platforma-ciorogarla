import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { openai } from "$lib/utils/openai";
import type { Business, VolunteeringProject } from "$lib/types/SanitySchema";
import { sanity } from "$lib/utils/sanity";

export const load = (async ({ url, locals }) => {
	const supabase = locals.supabase;
	const query = url.searchParams.get("query") as string;

	if (!query) {
		return;
	}

	const queryEmbedding = await openai
		.createEmbedding({
			model: "text-embedding-ada-002",
			input: query,
		})
		.then((res) => res.data.data);

	// Maximum of 25 matches
	// Can be lower if there are not enough matches
	const { data: matches, error: supabaseError } = await supabase.rpc("match_documents", {
		query_embedding: queryEmbedding[0].embedding,
		match_count: 25,
		match_threshold: 0.75,
	});

	if (supabaseError) {
		console.log(supabaseError);
		throw error(500, "Internal Server Error");
	}

	const documents = await sanity.fetch<Array<Business | VolunteeringProject>>(`*[_id in $ids]`, {
		ids: matches.map((match: { id: string }) => match.id),
	});

	// Order documents by matches order
	// since sanity scrambles the order of the documents
	const matchesIds: string[] = matches.map((match: { id: string }) => match.id);
	documents.sort((a, b) => matchesIds.indexOf(a._id) - matchesIds.indexOf(b._id));

	return {
		query,
		documents,
	};
}) satisfies PageServerLoad;
