import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from "$env/static/public";
import { SANITY_TOKEN } from "$env/static/private";
import { createClient } from "@sanity/client";

export const sanitySudo = createClient({
	dataset: PUBLIC_SANITY_DATASET,
	projectId: PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2021-03-25",
	useCdn: false,
	token: SANITY_TOKEN,
});
