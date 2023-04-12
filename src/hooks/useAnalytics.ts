import {getAnalytics} from "firebase/analytics";
import {useFirebaseApp} from "solid-firebase";
import {createMemo} from "solid-js";
import {useAnalyticsState} from "../lib/store";

export const useAnalytics = () => {
	const firebaseApp = useFirebaseApp();
	const analyticsState = useAnalyticsState();
	const analytics = import.meta.env.MODE === "production" ? getAnalytics(firebaseApp) : null;
	
	const analyticsInstance = createMemo(() => {
		if (analyticsState.state) {
			return analytics;
		} else {
			return null;
		}
	});

	return analyticsInstance;
}
