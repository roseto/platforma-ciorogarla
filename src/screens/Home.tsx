import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
	const navigation = useNavigation();

	return (
		<View>
			<Text>Home</Text>
			<Button
				mode="contained"
				onPress={() => navigation.navigate("About")}
			>
				Go to about
			</Button>
		</View>
	)
}
