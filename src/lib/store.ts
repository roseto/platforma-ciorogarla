import create from "solid-zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AnalyticsState {
	state: boolean
	set: (state: boolean) => void
}

export const useAnalyticsState = create(persist<AnalyticsState>((set) => ({
		state: false,
		set: (state: boolean) => set({ state }),
	}),
	{
		name: "analytics-state",
		storage: createJSONStorage(() => window.localStorage),
	}
));
