import { sanityEager } from "$lib/utils/sanity";
import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
	const { session } = await parent();

	const data = await sanityEager.fetch<{ firstDiscussion: { _id: string }[] }>(`
		*[_type == "discussion" && approved] {
			_id
		}
	`);

	const isFirstTime = data.firstDiscussion.length === 0;

	return { isFirstTime };

}) satisfies PageLoad;
