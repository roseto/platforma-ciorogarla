import { env } from "$env/dynamic/public";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


export const sanity = createClient({
	dataset: env.PUBLIC_SANITY_DATASET,
	projectId: env.PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-03-25",
	useCdn: true,
});

const builder = imageUrlBuilder(sanity);

// deno-lint-ignore no-explicit-any
export function urlFor(source: any) {
	return builder.image(source);
}
