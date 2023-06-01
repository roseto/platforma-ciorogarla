import {sanity} from "$lib/sanity";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const businesses = await sanity.fetch<{ name: string, description: string }[]>(`*[_type == "business"][0...5]`);

	return {
		businesses,
	};
}) satisfies PageLoad;
