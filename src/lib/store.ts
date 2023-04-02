import AsyncStorage from "@react-native-async-storage/async-storage";
import {action, Action, createStore, createTypedHooks, persist} from "easy-peasy";

interface StoreModel {
	hasSeenLanding: boolean;

	setHasSeenLanding: Action<StoreModel, boolean>;
}

const customStorage = {
	getItem: async (key: string) => {
		const item = await AsyncStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	},
	setItem: async (key: string, value: any) => {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	},
	removeItem: async (key: string) => {
		await AsyncStorage.removeItem(key);
	},
}

// Weird bug fix for iOS
// This is a bug with react-native and it doesn't affect
// other platforms.
// See https://github.com/facebook/react-native/issues/28602
window.requestIdleCallback = null;
export const store = createStore<StoreModel>(
	persist({
		hasSeenLanding: false,

		setHasSeenLanding: action((state, payload) => {
			state.hasSeenLanding = payload;
		})
	}, {
		allow: ["hasSeenLanding"],
		storage: customStorage,
	})
);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
