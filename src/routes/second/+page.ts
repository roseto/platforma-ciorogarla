import {sanity} from "$lib/sanity";
import type {PageLoad} from "../$types";



export const load = (async () => {
	const business = await sanity.fetch<{ name: string, description: string }>(`*[_type == "business"][0]`);

	return {
		business,
	};
}) satisfies PageLoad;
