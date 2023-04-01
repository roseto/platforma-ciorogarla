import { registerRootComponent } from "expo";
import { setupURLPolyfill } from 'react-native-url-polyfill';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Platform, LogBox } from "react-native";
import { darkTheme, lightTheme } from "./lib/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { queryClient } from "./lib/queryClient";


if (Platform.OS !== "web") {
	setupURLPolyfill();
}

LogBox.ignoreLogs([
	"REACT_NATIVE_URL_POLYFILL",
	"has a shadow set but cannot calculate shadow efficiently"
])

export type RootStackParamList = {
	Home: undefined;
	Settings: undefined;
	Contribute: undefined;
	Landing: undefined;

	Businesses: {
		sortByTypes: string[]
	};
	Business: {
		id: string;
	}
}


export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: ["https://ciorogarlaunita.web.app", "ciorogarlaunita://"],
	config: {
		initialRouteName: "Home",
		screens: {
			Home: "",
			Settings: "settings",
			Contribute: "contribute",
			Landing: "landing",

			Businesses: "businesses",
			Business: "businesses/:id"
		}
	}
}


// Screens
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Contribute from "./screens/Contribute";
import Landing from "./screens/Landing";
import Businesses from "./screens/businesses/Businesses";
import Business from "./screens/businesses/Business";
import AppBar from "./components/AppBar";

const Stack = createNativeStackNavigator<RootStackParamList>();

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
})

function App() {
	const [hasSeenLanding, setHasSeenLanding] = React.useState(undefined);

	useEffect(() => {
		AsyncStorage.getItem("hasSeenLanding").then((value) => {
			if (value === "true") {
				setHasSeenLanding(true);
			} else {
				setHasSeenLanding(false);
			}
		})
	}, [])

	if (hasSeenLanding === undefined) {
		return null;
	}

	return (
		<Stack.Navigator 
			initialRouteName={hasSeenLanding ? "Home" : "Landing"}
			screenOptions={{
				header: (props) => <AppBar {...props} />,
			}}
		>
			<Stack.Screen name="Home" component={Home} options={{ title: "Acasa" }} />
			<Stack.Screen name="Settings" component={Settings} options={{ title: "Setari" }} />
			<Stack.Screen name="Contribute" component={Contribute} options={{ title: "Contribuie" }} />
			<Stack.Screen name="Landing" component={Landing} options={{ title: "Bine ai venit" }} />

			<Stack.Screen name="Businesses" component={Businesses} options={{ title: "Afaceri locale & altele" }} />
			<Stack.Screen name="Business" component={Business} />
		</Stack.Navigator>
	)
}


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
							return `${options.title ?? route.name} · Ciorogârla Unită`;
						}
					}} 
					theme={theme} 
					linking={linking}
				>
					<PersistQueryClientProvider persistOptions={{ persister: asyncStoragePersister }} client={queryClient}>
						<PaperProvider theme={theme}>
							<App />
							<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
						</PaperProvider>
					</PersistQueryClientProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

registerRootComponent(EntryPoint);
