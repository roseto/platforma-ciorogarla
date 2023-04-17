import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import {firebaseConfig} from "./lib/firebaseConfig";
import {useAnalyticsState} from "./lib/store";

const app = initializeApp(firebaseConfig);
const analyticsState = useAnalyticsState();

const ANALYTICS_ENABLED = import.meta.env.MODE === "production" && analyticsState.state;

const analytics = ANALYTICS_ENABLED ? getAnalytics(app) : undefined;
ANALYTICS_ENABLED ? getPerformance(app) : undefined;

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
