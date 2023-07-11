import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from "$env/static/public";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
	dataset: PUBLIC_SANITY_DATASET,
	projectId: PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-03-25",
	useCdn: true,
});

export const sanityEager = createClient({
	dataset: PUBLIC_SANITY_DATASET,
	projectId: PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-03-25",
	useCdn: false,
});

export const createSanityPreviewClient = (token: string) =>
	createClient({
		dataset: PUBLIC_SANITY_DATASET,
		projectId: PUBLIC_SANITY_PROJECT_ID,
		apiVersion: "2021-03-25",
		useCdn: false,
		token,
	});

const builder = imageUrlBuilder(sanity);

export const groqAndId = (id?: string | null) => (id ? ` && _id == "${id}"` : "");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
	return builder.image(source);
}
