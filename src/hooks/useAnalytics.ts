import {getAnalytics} from "firebase/analytics";
import {useFirebaseApp} from "solid-firebase";
import {createMemo} from "solid-js";
import {DEV} from "../lib/dev";
import {useAnalyticsState} from "../lib/store";

export const useAnalytics = () => {
	const firebaseApp = useFirebaseApp();
	const analyticsState = useAnalyticsState();
	const analytics = !DEV ? getAnalytics(firebaseApp) : null;
	
	const analyticsInstance = createMemo(() => {
		if (analyticsState.state) {
			return analytics;
		} else {
			return null;
		}
	});

	return analyticsInstance;
}

export const analyticsEnabled = !DEV;
