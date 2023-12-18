import type { Business } from "$lib/types/SanitySchema";
import { sanity } from "$lib/utils/sanity";
import type { PageLoad } from "./$types";

export const load = ( async () => {
	const data = await sanity.fetch<Business[]>("*[_type == 'business'] | order(_createdAt desc)[0...3]");

	return {
		businesses: data
	};
}) satisfies PageLoad;