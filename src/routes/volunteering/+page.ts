import { sanity } from "$lib/utils/sanity";
import type { VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async () => {
	const projects = await sanity.fetch<VolunteeringProject[]>(`
		*[_type == "volunteeringProject" && dateTime(period.fromDate + 'T00:00:00Z') > dateTime(now())]| order(_createdAt desc) {
			...,
			country -> {...}
		}
	`).catch(() => null);

	if (projects === null) {
		throw error(500, "Could not fetch projects");
	}

	return {
		projects,
	};
}) satisfies PageLoad;
