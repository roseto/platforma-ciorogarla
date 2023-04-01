import Container from "../components/Container";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import {useTheme} from "../hooks/useTheme";
import {Button, Card, Text} from "react-native-paper";
import Stack from "../components/Stack";
import {Linking} from "react-native";
import {Link} from "@react-navigation/native";

export default function Contribute() {
	const theme = useTheme();

	return (
		<Container>
			<Stack>
				<Card>
					<Card.Content>
						<Icon 
							name="hand-coin"
							size={128}
							color={theme.colors.primary}
							style={{ alignSelf: "center" }}
						/>
					</Card.Content>
				</Card>
				<Text
					variant="headlineMedium"
					style={{
						alignSelf: "center",
						textAlign: "center",
					}}
				>
					Contribuie
				</Text>
				<Text
					style={{
						alignSelf: "center",
						textAlign: "center",
					}}
				>
					Pentru a oferi o experienta cat mai buna utilizatorilor, 
					aplicatia este dezvoltata in mod constant.
					Ciorogârla Unită este posibila doar cu ajutorul comunitatii.
				</Text>
				<Button
					mode="contained"
					onPress={() => {
						Linking.openURL("https://opencollective.com/ciorogarlaunita")
					}}
					icon="open-in-new"
				>
					Doneaza
				</Button>
				<Card>
					<Card.Title
						title="Open Collective"
					/>
					<Card.Content>
						<Text>
							Noi folosim Open Collective pentru a primi donatii si sponsorizari.
							Aceasta platforma ne permite sa avem un buget si o lista de tranzactie
							publica. Transparenta este una dintre prioritatile noastre principale.
						</Text>
					</Card.Content>
				</Card>
			</Stack>
		</Container>
	)
}
