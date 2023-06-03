import { sanity } from "$lib/utils/sanity";
import type { Business } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
	const filterParam = url.searchParams.get("filter");
	const filter = filterParam ? filterParam.split(",") : [];
	const businesses = await sanity.fetch<Business[]>(
		`*[_type == "business" ${filter.length ? `&& type in $filter` : ""}]`,
		{ filter },
	);

	return {
		businesses,
		search: url.searchParams || "",
	};
}) satisfies PageLoad;
