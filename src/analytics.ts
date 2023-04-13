import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {firebaseConfig} from "./lib/firebaseConfig";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";


const app = initializeApp(firebaseConfig);
const analytics = import.meta.env.MODE === "production" ? getAnalytics(app) : undefined;

// @ts-ignore
self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.MODE === "development";

if (import.meta.env.MODE === "production") {
	getAnalytics(app);
}

initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY)
});

if (analytics) {
	window.addEventListener("popstate", () => {
		logEvent(analytics, "page_view", {
			page_title: document.title,
			page_location: location.pathname,
			page_path: location.pathname,
		})
	})
}
