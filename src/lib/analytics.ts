import {getAnalytics} from "firebase/analytics";
import {useFirebaseApp} from "solid-firebase";
import {useAnalyticsState} from "./store";

export const useAnalytics = () => {
	const firebaseApp = useFirebaseApp();
	const analyticsState = useAnalyticsState();
	const analytics = import.meta.env.MODE === "production" ? getAnalytics(firebaseApp) : null;
	
	if (analyticsState.state && analytics) {
		return analytics;
	}

	return null;
}
