import { sanity } from "$lib/utils/sanity";
import type { VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async () => {
	const projects = await sanity.fetch<VolunteeringProject[]>(`
		*[_type == "volunteeringProject"]| order(_createdAt desc) {
			...,
			country -> {...}
		}
	`);

	return {
		projects,
	};
}) satisfies PageLoad;
