import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Container from "../components/Container";
import Stack from "../components/Stack";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {useTheme} from "../hooks/useTheme";
import {Button, Card, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {auth, Firebase, firebase} from "../lib/firebaseClient";


export default function Login() {
	const theme = useTheme();
	
	const signInWithGoogle = () => {
		auth().signInWithPopup(new Firebase.auth.GoogleAuthProvider());
	}

	return (
		<Container>
			<Stack>
				<Card>
					<Card.Content>
						<Icon
							name="account"
							size={128}
							color={theme.colors.primary}
							style={{ alignSelf: "center" }}
						/>
					</Card.Content>
				</Card>
				<Text style={{ textAlign: "center" }} variant="headlineLarge">
					Conectare
				</Text>
				<Button
					mode="contained-tonal"
					onPress={signInWithGoogle}
					icon="google"
				>
					Conectare cu Google
				</Button>
			</Stack>
		</Container>
	)
}
