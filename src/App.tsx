import "./lib/firebaseClient";
import AppBar from "./components/AppBar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useStoreState} from "./lib/store";


export type RootStackParamList = {
	Home: undefined;
	Settings: undefined;
	Contribute: undefined;
	Landing: undefined;
	Login: undefined;

	Businesses: {
		sortByTypes: string[],
		search: string,
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
import Login from "./screens/Login";
import Landing from "./screens/Landing";
import Businesses from "./screens/businesses/Businesses";
import Business from "./screens/businesses/Business";
import {LinkingOptions} from "@react-navigation/native";


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
	const hasSeenLanding = useStoreState((state) => state.hasSeenLanding)

	return (
		<Stack.Navigator 
			initialRouteName={hasSeenLanding ? "Home" : "Landing"}
			screenOptions={{
				header: (props) => <AppBar {...props} />,
			}}
		>
			<Stack.Screen name="Home" component={Home} options={{ title: "Acasa" }} />
			<Stack.Screen name="Landing" component={Landing} options={{ title: "Bine ai venit" }} />
			<Stack.Screen name="Settings" component={Settings} options={{ title: "Setari" }} />
			<Stack.Screen name="Contribute" component={Contribute} options={{ title: "Contribuie" }} />
			<Stack.Screen name="Login" component={Login} options={{ title: "Autentificare" }} />

			<Stack.Screen name="Businesses" component={Businesses} options={{ title: "Afaceri locale & altele" }} />
			<Stack.Screen name="Business" component={Business} />
		</Stack.Navigator>
	)
}


