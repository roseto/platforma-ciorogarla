import { registerRootComponent } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./lib/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



export type RootStackParamList = {
	Home: undefined;
	About: undefined;
}


export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: ["https://ciorogarlaunita.web.app", "ciorogarlaunita://"],
	config: {
		initialRouteName: "Home",
		screens: {
			Home: "",
			About: "about"
		}
	}
}


// Pages
import About from "./screens/About";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="About" component={About} />
		</Stack.Navigator>
	)
}


function EntryPoint() {
	const colorScheme = useColorScheme();
	const theme = colorScheme === "dark" ? darkTheme : lightTheme;

	return (
		<NavigationContainer theme={theme} linking={linking}>
			<PaperProvider theme={theme}>
				<App />
			</PaperProvider>
		</NavigationContainer>
	)
}

registerRootComponent(EntryPoint);
