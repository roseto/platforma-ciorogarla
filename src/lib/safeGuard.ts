// First domain is the primary one
export const DOMAINS = [
	"app.ciorogarlaunita.eu.org",
	"ciorogarla.eu.org",
	"ciorogarlaunita.web.app",
]

export const PRIMARY_DOMAIN = DOMAINS[0];

// Since we are using Firebase Hosting,
// we also have .web.app and .firebaseapp.com domains
// that we want to redirect to our main domain
export const checkDomain = () => {
	if (import.meta.env.MODE !== "production") return;

	const domain = window.location.hostname;

	if (!DOMAINS.includes(domain)) {
		console.log("Redirecting to", PRIMARY_DOMAIN);
		window.location.href = "https://" + PRIMARY_DOMAIN;
	}
}
