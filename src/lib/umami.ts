interface TrackOptions extends Record<string, any> {
	name?: string
	id?: number
}

declare global {
	interface Window {
		umami: {
			track: (eventName: string, options?: TrackOptions) => Promise<void>
		}
	}
}

export const track = (eventName: string, options?: TrackOptions) => {
	if ("umami" in window) {
		window.umami.track(eventName, options)
	}
}

export const setAnalytics = (state: boolean) => {
	if (!state) {
		window.localStorage.setItem("umami.disabled", "true");
	} else {
		window.localStorage.removeItem("umami.disabled");
	}
}
