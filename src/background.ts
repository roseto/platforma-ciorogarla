import { initializeApp } from "firebase/app";
import { getAnalytics, initializeAnalytics, logEvent } from "firebase/analytics";
import { initializePerformance } from "firebase/performance";
import {firebaseConfig} from "./lib/firebaseConfig";
import {useAnalyticsState} from "./lib/store";

const app = initializeApp(firebaseConfig);
const analyticsState = useAnalyticsState();

const ANALYTICS_ENABLED = import.meta.env.MODE === "production" && analyticsState.state;

const analytics = ANALYTICS_ENABLED ? getAnalytics(app) : undefined;

if (ANALYTICS_ENABLED && analytics) {
	initializePerformance(app);
	initializeAnalytics(app, {
		config: {
			allow_ad_personalization_signals: false,
			allow_google_signals: false,
			send_page_view: true,
		},
	});
}

// @ts-ignore
self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.MODE === "development";


if (analytics) {
	window.addEventListener("popstate", () => {
		logEvent(analytics, "page_view", {
			page_title: document.title,
			page_location: location.pathname,
			page_path: location.pathname,
		})
	})
}
