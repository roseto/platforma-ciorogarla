import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const origin = url.origin;
	const slug = url.searchParams.get("slug");
	const type = url.searchParams.get("type");
	const token = url.searchParams.get("token");
	const id = url.searchParams.get("id");

	if (!slug || !type || !id || !token) throw error(400, "Missing slug or type or id or token");

	console.log("slug", slug);
	console.log("type", type);
	console.log("id", id);
	console.log("token", token);

	if (type === "business") {
		throw redirect(307, `${origin}/businesses/${slug}?preview=true&id=${id}&token=${token}`,);
	}

	if (type === "article") {
		throw redirect(307, `${origin}/news/${slug}?preview=true&id=${id}&token=${token}`,);
	}

	if (type === "volunteeringProject") {
		throw redirect(307, `${origin}/volunteering/${slug}?preview=true&id=${id}&token=${token}`,);
	}

	throw error(400, "Invalid type");
}