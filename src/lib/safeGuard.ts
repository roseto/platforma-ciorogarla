export const DOMAIN = "app.ciorogarlaunita.eu.org";

// Since we are using Firebase Hosting,
// we also have .web.app and .firebaseapp.com domains
// that we want to redirect to our main domain
export const checkDomain = () => {
	if (import.meta.env.MODE !== "production") return;

	const domain = window.location.hostname;

	if (domain !== DOMAIN) {
		console.log("Redirecting to", DOMAIN);
		window.location.href = "https://" + DOMAIN;
	}
}
