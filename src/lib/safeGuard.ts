export const DOMAIN = "app.ciorogarlaunita.eu.org";

export const checkDomain = () => {
	if (import.meta.env.MODE !== "production") return;

	const domain = window.location.hostname;

	if (domain !== DOMAIN) {
		console.log("Redirecting to", DOMAIN);
		window.location.href = DOMAIN;
	}
}
