import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, createTypedHooks, action, Action, persist } from "easy-peasy";


interface StoreModel {
	hasSeenLanding: boolean;

	setHasSeenLanding: Action<StoreModel, boolean>;
}

const storage = {
	async getItem(key: string) {
		return JSON.parse(await AsyncStorage.getItem(key))
	},
	async setItem(key: string, data: unknown) {
		AsyncStorage.setItem(key, JSON.stringify(data))
	},
	async removeItem(key: string) {
		AsyncStorage.removeItem(key)
	}
}

export const store = createStore<StoreModel>(
	persist({
		hasSeenLanding: false,

		setHasSeenLanding: action((state, payload) => {
			state.hasSeenLanding = payload;
		})
	}, {
		allow: ["hasSeenLanding"],
		storage
	})
);

export const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();
