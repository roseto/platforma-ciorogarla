import {Handler} from "@netlify/functions";
import crypto from "crypto";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSanityClient } from "@sanity/client";
import {businessContentGenerator} from "../contentGenerator";
import {Business} from "../../src/types/SanitySchema";


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

export const handler: Handler = async () => {
	const businesses = await sanityClient.fetch<Business[]>(`*[_type == "business"]`);
	
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
			const { error } = await supabaseClient.from("documents")
				.insert([
					{
						id,
						content,
						checksum,
						created_at
					}
				])
				
			if (error) {
				console.error(error);
				continue;
			}
		} else {
			if (data.checksum !== checksum) {
				const { error } = await supabaseClient.from("documents")
					.update({
						content,
						checksum,
						created_at
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
