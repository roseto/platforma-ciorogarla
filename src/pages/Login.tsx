import {Button, Container, Stack, SvgIcon, Typography} from "@suid/material";
import {useFirebaseApp} from "solid-firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Header from "../components/Header";

import GoogleIcon from "../resources/icons/google.svg?component-solid";
import ShieldIcon from "@suid/icons-material/Shield";

export default function Login() {
	const firebase = useFirebaseApp();
	const auth = getAuth(firebase);


	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
	}

	return (
		<>
			<Header
				title="Conectare"
				back
			/>
			<Container>
				<Stack>
					<Button
						startIcon={<SvgIcon><GoogleIcon/></SvgIcon>}
						onClick={loginWithGoogle}
					>
						Conectare cu Google
					</Button>
					<Typography color="textSecondary" textAlign="center">
						<ShieldIcon fontSize="inherit" /> Protejat de App Check
					</Typography>
				</Stack>
			</Container>
		</>
	)
}
