import {Divider, List} from "react-native-paper";
import Constants from "expo-constants";
import Container from "../components/Container";
import {useHeader} from "../hooks/useHeader";
import {Platform} from "react-native";


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
	useHeader({
		mode: "large"
	});

	return (
		<Container.ScrollView>
			<List.Section>
				<List.Item
					title="Contributie"
					description="Afla cum poti contribui la dezvoltarea aplicatiei"
					left={props => <List.Icon {...props} icon="hand-coin" />}
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
