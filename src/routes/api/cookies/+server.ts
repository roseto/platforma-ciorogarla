export const GET = async ({ request, cookies }) => {
	const data = await request.json().catch(() => ({}));
	const cookieName = data.name;

	if (!cookieName) return new Response("Missing cookie name", { status: 400 });

	const cookieValue = cookies.get(cookieName);

	return new Response(JSON.stringify({ name: cookieName, value: cookieValue }));
}
	

export const POST = async ({ request, cookies }) => {
	const data = await request.json().catch(() => ({}));
	const cookieName = data.name;
	const cookieValue = data.value;

	if (!cookieName || !cookieValue) return new Response("Missing cookie name or value", { status: 400 });

	cookies.set(cookieName, cookieValue);
	
	return new Response("OK");
}

export const DELETE = async ({ request, cookies }) => {
	const data = await request.json().catch(() => ({}));
	const cookieName = data.name;

	if (!cookieName) return new Response("Missing cookie name", { status: 400 });

	cookies.delete(cookieName);
	
	return new Response("OK");
}
