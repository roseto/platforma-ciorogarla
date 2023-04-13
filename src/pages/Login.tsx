import {Button, Container, ListItem, ListItemIcon, ListItemText, Stack, SvgIcon, Typography} from "@suid/material";
import {useAuth, useFirebaseApp} from "solid-firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import Header from "../components/Header";
import {useNavigate} from "@solidjs/router";
import {createEffect} from "solid-js";

import GoogleIcon from "../resources/icons/google.svg?component-solid";
import FacebookIcon from "../resources/icons/facebook.svg?component-solid";
import MicrosoftIcon from "../resources/icons/microsoft.svg?component-solid";
import AppleIcon from "../resources/icons/apple.svg?component-solid";
import ForumIcon from "@suid/icons-material/Forum";
import ShieldIcon from "@suid/icons-material/Shield";
import KeyOffIcon from "@suid/icons-material/KeyOff";

export default function Login() {
	const firebase = useFirebaseApp();
	const auth = getAuth(firebase);
	const user = useAuth(auth);
	const navigate = useNavigate();

	createEffect(() => {
		if (!user.loading && user.data) {
		navigate("/", { replace: true });
		}
	});

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider).then((res) => {
			const providerId = res.providerId;

			// Find provider id
			// And update profile
			res.user.providerData.forEach((profile) => {
				if (profile.providerId === providerId) {
				updateProfile(res.user, {
						displayName: profile.displayName,
						photoURL: profile.photoURL,
					});
				}
			});
		})
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
						disableElevation
					>
						Conectare cu Google
					</Button>
					<Button
						startIcon={<SvgIcon><AppleIcon/></SvgIcon>}
						disabled
						disableElevation
					>
						Conectare cu Apple
					</Button>
					<Button
						startIcon={<SvgIcon><FacebookIcon/></SvgIcon>}
						disabled
						disableElevation
					>
						Conectare cu Facebook
					</Button>
					<Button
						startIcon={<SvgIcon><MicrosoftIcon/></SvgIcon>}
						disabled
						disableElevation
					>
						Conectare cu Microsoft
					</Button>
					<Typography color="textSecondary" textAlign="center">
						<ShieldIcon fontSize="inherit" /> Protejat de App Check
					</Typography>
					<ListItem>
						<ListItemIcon>
							<ForumIcon />
						</ListItemIcon>
						<ListItemText
							primary="Postati pe forum"
							secondary="Folositi contul pentru a posta pe forum."
						/>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<KeyOffIcon />
						</ListItemIcon>
						<ListItemText
							primary="De ce nu pot sa folosesc parola?"
							secondary="Pentru a va proteja datele, nu puteti sa va conectati cu parola. Va puteti conecta doar cu un cont third-party (Google, Facebook, etc)."
						/>
					</ListItem>
				</Stack>
			</Container>
		</>
	)
}
