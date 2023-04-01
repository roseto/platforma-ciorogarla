import { registerRootComponent } from "expo";
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Platform, LogBox } from "react-native";
import { darkTheme, lightTheme } from "./lib/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "react-query";


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

			Businesses: "businesses",
			Business: "businesses/:id"
		}
	}
}


// Pages
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Businesses from "./screens/businesses/Businesses";
import Business from "./screens/businesses/Business";
import AppBar from "./components/AppBar";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<Stack.Navigator 
			initialRouteName="Home"
			screenOptions={{
				header: (props) => <AppBar {...props} />,
			}}
		>
			<Stack.Screen name="Home" component={Home} options={{ title: "Acasa" }} />
			<Stack.Screen name="Settings" component={Settings} options={{ title: "Setari" }} />

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
					<QueryClientProvider client={queryClient}>
						<PaperProvider theme={theme}>
							<App />
							<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
						</PaperProvider>
					</QueryClientProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

registerRootComponent(EntryPoint);
