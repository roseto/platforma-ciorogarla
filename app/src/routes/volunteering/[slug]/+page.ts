import { sanity } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	const slug = params.slug;
	const project = await sanity
		.fetch<VolunteeringProject>(
			`*[_type == "volunteeringProject" && slug.current == $slug][0] {
		...,
		image {
			..., 
			asset -> {..., metadata}
		}, 
		organisation -> {...},
		participatingCountries[] -> {...},
		country -> {...}
		}`,
			{ slug },
		)
		.catch(() => null);

	if (!project) {
		throw redirect(307, "/businesses");
	}

	return {
		project,
	};
}) satisfies PageLoad;
