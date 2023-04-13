import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";
import {firebaseConfig} from "./lib/firebaseConfig";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";


const app = initializeApp(firebaseConfig);

// @ts-ignore
self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.MODE === "development";

if (import.meta.env.MODE === "production") {
	getPerformance(app);
	getAnalytics(app);
}

initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY)
});
