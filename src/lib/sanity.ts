// @ts-ignore
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Constants from "expo-constants";

const projectId = Constants.expoConfig?.extra?.sanity.projectId;
const dataset = Constants.expoConfig?.extra?.sanity.dataset;
const apiVersion = Constants.expoConfig?.extra?.sanity.apiVersion;

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

// deno-lint-ignore no-explicit-any
export function urlFor(source: any) {
	return builder.image(source);
}

