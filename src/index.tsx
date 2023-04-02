import "expo-dev-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Platform, LogBox } from "react-native";
import { darkTheme, lightTheme } from "./lib/theme";
import {SafeAreaProvider} from "react-native-safe-area-context";
import App, {linking} from "./App";
import { StatusBar } from "expo-status-bar";
import { queryClient } from "./lib/queryClient";
import { store } from "./lib/store";
import { StoreProvider } from "easy-peasy";


if (Platform.OS !== "web") {
	setupURLPolyfill();
}

LogBox.ignoreLogs([
	"REACT_NATIVE_URL_POLYFILL",
	"has a shadow set but cannot calculate shadow efficiently"
])

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
})



function EntryPoint() {
	const colorScheme = useColorScheme();
	const theme = colorScheme === "dark" ? darkTheme : lightTheme;

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView
				style={{
					flex: 1,
					backgroundColor: theme.colors.background
				}}
			>
				<NavigationContainer 
					documentTitle={{ 
						enabled: true,
						formatter: (options, route) => {
							return `${options?.title ?? route?.name ?? "Loading..."} · Ciorogârla Unită`;
						}
					}} 
					theme={theme} 
					linking={linking}
				>
					<StoreProvider store={store}>
						<PersistQueryClientProvider persistOptions={{ persister: asyncStoragePersister }} client={queryClient}>
							<PaperProvider theme={theme}>
								<App />
								<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
							</PaperProvider>
						</PersistQueryClientProvider>
					</StoreProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

registerRootComponent(EntryPoint);
