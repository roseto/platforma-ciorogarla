import { RootStackParamList } from "./App";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
		interface RootNavigationProp extends NavigationProp<RootParamList> {}
	}
}

declare module '@env' {
	export const SANITY_DATASET: string;
	export const SANITY_API_TOKEN: string;
	export const SANITY_PROJECT_ID: string;
	export const SANITY_API_VERSION: string;
}
