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

interface FirstTimeState {
	state: boolean
	set: (state: boolean) => void
}

export const useFirstTime = create(persist<FirstTimeState>((set) => ({
		state: true,
		set: (state: boolean) => set({ state }),
	}),
	{
		name: "first-time",
		storage: createJSONStorage(() => window.localStorage),
	}
));
