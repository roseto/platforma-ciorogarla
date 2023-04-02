import * as Updates from "expo-updates";
import {Divider, List} from "react-native-paper";
import Constants from "expo-constants";
import Container from "../components/Container";
import {useHeader} from "../hooks/useHeader";
import {Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const platform = (() => {
	switch (Platform.OS) {
		case "ios":
			return "iOS";
		case "android":
			return "Android";
		case "web":
			return "Web";
		default:
			return "Platforma necunoscuta";
	}
})();

export default function Settings() {
	const navigation = useNavigation();
	useHeader({
		mode: "large"
	});

	const clearStorage = async () => {
		await AsyncStorage.clear();
		Updates.reloadAsync();
	}

	return (
		<Container.ScrollView>
			<List.Section>
				<List.Item 
					title="Cont"
					description="Conecteaza-te la contul de Ciorogârla Unită"
					left={props => <List.Icon {...props} icon="account" />}
					onPress={() => navigation.navigate("Login")}
				/>
				<List.Item
					title="Contribuie"
					description="Afla cum poti contribui la dezvoltarea aplicatiei"
					left={props => <List.Icon {...props} icon="hand-coin" />}
					onPress={() => navigation.navigate("Contribute")}
				/>
				<List.Item
					title="Resetare"
					description="Reseteaza aplicatia"
					left={props => <List.Icon {...props} icon="restart" />}
					onPress={clearStorage}
				/>
				<Divider />
				<List.Item
					title="Platforma"
					description={platform}
					left={props => <List.Icon {...props} icon="cellphone-link" />}
				/>
				<List.Item
					title="Versiune Expo SDK"
					description={Constants.expoConfig.sdkVersion}
					left={props => <List.Icon {...props} icon="toolbox" />}
				/>
				<List.Item
					title="Versiune"
					description={Constants.expoConfig.version}
					left={props => <List.Icon {...props} icon="information" />}
				/>
			</List.Section>
		</Container.ScrollView>
	)
}
