import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {Avatar, Button, Card, Text} from "react-native-paper";
import Container from "../components/Container";
import Stack from "../components/Stack";
import {useHeader} from "../hooks/useHeader";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {View} from "react-native";
import {useTheme} from "../hooks/useTheme";

export default function Landing() {
	const navigation = useNavigation();
	const theme = useTheme();
	useHeader({
		animated: true,
	})

	const onButtonPress = () => {
		AsyncStorage.setItem("hasSeenLanding", "true");
		navigation.reset({
			index: 0,
			routes: [{ name: "Home" }]
		})
	}

	return (
		<Container.ScrollView>
			<Stack>
				<Avatar.Icon 
					icon="hand-wave"
					size={128}
					style={{
						alignSelf: "center",
					}}
				/>
				<Text
					variant="headlineLarge"
					style={{
						alignSelf: "center",
						textAlign: "center",
					}}
				>
					Bine ai venit!
				</Text>
				<Card>
					<Card.Title title="De comunitate, pentru comunitate" />
					<Card.Content>
						<Text>
							Ciorogârla Unită este o platforma comunitara pentru Ciorogârla.
							O platforma care conecteaza afacerile, institutiile, organizatiile
							si cetatenii impreuna pentru a asigura o comunitate mai puternica.
						</Text>
					</Card.Content>
				</Card>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 8
					}}
				>
					<Icon
						name="information"
						color={theme.colors.outline}
						size={18}
					/>
					<Text style={{ color: theme.colors.outline }}>
						Aceasta aplicatie este construita specific pentru comuna Ciorogârla, Ilfov.
					</Text>
				</View>
				<Button
					mode="contained"
					icon="arrow-right"
					onPress={onButtonPress}
				>
					Sa incepem
				</Button>
			</Stack>
		</Container.ScrollView>
	)
}
