import * as dotenv from "dotenv";
import crypto from "crypto";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSanityClient } from "@sanity/client";
import { Configuration, OpenAIApi } from "openai";
import { businessContentGenerator } from "./contentGenerator";
import { Business } from "../src/lib/types/SanitySchema";

dotenv.config();

const sanityClient = createSanityClient({
	projectId: process.env.PUBLIC_SANITY_PROJECT_ID as string,
	dataset: process.env.PUBLIC_SANITY_DATASET as string,
	apiVersion: "2021-03-25",
	useCdn: false,
});

const supabaseClient = createSupabaseClient(
	process.env.PUBLIC_SUPABASE_URL as string,
	process.env.SUPABASE_SERVICE_KEY as string,
	{
		auth: {
			persistSession: false
		}
	}
);

const openaiConfiguration = new Configuration({
	apiKey: process.env.OPENAI_KEY as string,
});

const openaiClient = new OpenAIApi(openaiConfiguration);

const businesses = await sanityClient.fetch<Business[]>(`*[_type == "business"]`);

const promises = businesses.map(async (business) => {
	const id = business._id;
	const content = businessContentGenerator(business);
	const checksum = crypto.createHash("md5").update(content).digest("hex");
	const created_at = business._createdAt;

	const { data } = await supabaseClient.from("documents").select("*").eq("id", id).single();

	if (!data) {
		const embeddings = await openaiClient
			.createEmbedding({
				input: content,
				model: "text-embedding-ada-002",
			})
			.then((res) => res.data.data);

		const { error } = await supabaseClient.from("documents").insert([
			{
				id,
				content,
				checksum,
				created_at,
				embedding: embeddings[0].embedding,
			},
		]);

		if (error) {
			console.error(error);
			return;
		}
	} else {
		if (data.checksum !== checksum) {
			const embeddings = await openaiClient
				.createEmbedding({
					input: content,
					model: "text-embedding-ada-002",
				})
				.then((res) => res.data);

			const { error } = await supabaseClient
				.from("documents")
				.update({
					content,
					checksum,
					created_at,
					embedding: embeddings.data[0].embedding,
				})
				.eq("id", id);

			if (error) {
				console.error(error);
				return;
			}
		} else {
			console.log("No changes");
		}
	}
});

await Promise.all(promises);
console.log("Done");
