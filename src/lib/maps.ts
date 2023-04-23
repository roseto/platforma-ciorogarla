export const getMapsEmbedURL = (mode: "place" | "streetview", address: string, location?: string) => {
	const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
	const baseURL = new URL(`https://www.google.com/maps/embed/v1/${mode}`);

	baseURL.searchParams.set("key", apiKey);
	baseURL.searchParams.set("language", "ro");
	baseURL.searchParams.set("region", "ro");

	if (mode === "streetview") {
		baseURL.searchParams.set("location", location || address);
	} else {
		baseURL.searchParams.set("q", address);
	}


	return baseURL.toString();
}

export const getMapsURL = (address: string) => {
	const baseURL = new URL("https://www.google.com/maps/search/");

	baseURL.searchParams.set("api", "1");
	baseURL.searchParams.set("query", address);

	return baseURL.toString();
}
