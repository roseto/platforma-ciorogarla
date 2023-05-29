import {Handler} from "@netlify/functions";
import crypto from "crypto";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSanityClient } from "@sanity/client";
import { Configuration, OpenAIApi } from "openai";
import { businessContentGenerator } from "../contentGenerator";
import { Business } from "../../src/types/SanitySchema";


const sanityClient = createSanityClient({
	projectId: process.env.VITE_SANITY_PROJECT_ID as string,
	dataset: process.env.VITE_SANITY_DATASET as string,
	apiVersion: process.env.VITE_SANITY_API_VERSION as string,
	useCdn: false
});

const supabaseClient = createSupabaseClient(
	process.env.VITE_SUPABASE_URL as string,
	process.env.SUPABASE_SERVICE_KEY as string
);

const openaiClient = new OpenAIApi(new Configuration({
	apiKey: process.env.OPENAI_API_KEY as string,
}))

export const handler: Handler = async () => {
	const businesses = await sanityClient.fetch<Business[]>(`*[_type == "business"]`);

	return {
		statusCode: 200,
		body: businessContentGenerator(businesses[0])
	};

	for (const business of businesses) {
		const id = business._id;
		const content = businessContentGenerator(business);
		const checksum = crypto.createHash("md5").update(content).digest("hex");
		const created_at = business._createdAt;

		const { data } = await supabaseClient.from("documents")
			.select("*")
			.eq("id", id)
			.single()

		if (!data) {
			const embeddings = await openaiClient.createEmbedding({
				input: content,
				model: "text-embedding-ada-002"
			})

			const { error } = await supabaseClient.from("documents")
				.insert([
					{
						id,
						content,
						checksum,
						created_at,
						embeddings: embeddings.data
					}
				])
				
			if (error) {
				console.error(error);
				continue;
			}
		} else {
			if (data.checksum !== checksum) {
				const embeddings = await openaiClient.createEmbedding({
					input: content,
					model: "text-embedding-ada-002"
				})

				const { error } = await supabaseClient.from("documents")
					.update({
						content,
						checksum,
						created_at,
						embeddings: embeddings.data
					})
					.eq("id", id)

				if (error) {
					console.error(error);
					continue;
				}
			} else {
				console.log("No changes");
			}
		}
	}


	return {
		statusCode: 200,
		body: "OK"
	}
}
