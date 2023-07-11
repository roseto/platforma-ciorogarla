import { createSanityPreviewClient, groqAndId, sanity } from "$lib/utils/sanity";
import { redirect } from "@sveltejs/kit";
import type { VolunteeringProject } from "$lib/types/SanitySchema";
import type { PageLoad } from "./$types";

export const load = (async ({ params, url }) => {
	const isPreview = url.searchParams.get("preview") === "true";
	const id = url.searchParams.get("id");
	const token = url.searchParams.get("token");
	const slug = params.slug;

	if (isPreview) {
		if (!id || !token) {
			throw redirect(307, "/volunteering");
		}
	}

	const sanityClient = isPreview && token ? createSanityPreviewClient(token) : sanity;

	const project = await sanityClient
		.fetch<VolunteeringProject>(
			`*[_type == "volunteeringProject" && slug.current == $slug ${groqAndId(id)}][0] {
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
		throw redirect(307, "/volunteeringProject");
	}

	return {
		project,
	};
}) satisfies PageLoad;
