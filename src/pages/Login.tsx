import {Button, Container, TextField, Stack, SvgIcon, Typography, Divider} from "@suid/material";
import {useAuth, useFirebaseApp} from "solid-firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile, TwitterAuthProvider, GithubAuthProvider, sendSignInLinkToEmail } from "firebase/auth";
import Header from "../components/Header";
import {useNavigate} from "@solidjs/router";
import {createEffect, createSignal} from "solid-js";

import GoogleIcon from "../resources/icons/google.svg?component-solid";
import TwitterIcon from "../resources/icons/twitter.svg?component-solid";
import GitHubIcon from "../resources/icons/github.svg?component-solid";
import AppleIcon from "../resources/icons/apple.svg?component-solid";
import ShieldIcon from "@suid/icons-material/Shield";

export default function Login() {
	const firebase = useFirebaseApp();
	const [email, setEmail] = createSignal("");
	const auth = getAuth(firebase);
	const user = useAuth(auth);
	const navigate = useNavigate();

	createEffect(() => {
		if (!user.loading && user.data) {
		navigate("/", { replace: true });
		}
	});

	const login = async (provider: GoogleAuthProvider) => {
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

	const loginWithEmail = async (e: Event) => {
		e.preventDefault();

		sendSignInLinkToEmail(auth, email(), {
			url: window.location.origin + "?email=" + email(),
			handleCodeInApp: true,
		}).catch((error) => {
			console.log(error)
		});
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
						onClick={() => login(new GoogleAuthProvider())}
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
						startIcon={<SvgIcon><TwitterIcon/></SvgIcon>}
						onClick={() => login(new TwitterAuthProvider())}
						disableElevation
					>
						Conectare cu Twitter
					</Button>
					<Button
						startIcon={<SvgIcon><GitHubIcon/></SvgIcon>}
						onClick={() => login(new GithubAuthProvider())}
						disableElevation
					>
						Conectare cu GitHub
					</Button>
					<Divider variant="middle"/>
					<Typography 
						textAlign="center" 
						color="textSecondary" 
						textTransform="uppercase" 
						variant="caption"
					>
						Sau pe moda veche
					</Typography>
					<form onSubmit={loginWithEmail}>
						<Stack>
							<TextField
								type="email"
								label="Email"
								variant="outlined"
								name="email"
								disabled
								value={email()}
								onChange={(_, value) => setEmail(value)}
							/>
							<Button
								variant="outlined"
								type="submit"
								disabled
							>
								Conectare cu Email
							</Button>
						</Stack>
					</form>
					<Typography color="textSecondary" textAlign="center">
						<ShieldIcon fontSize="inherit" /> Protejat de App Check
					</Typography>
				</Stack>
			</Container>
		</>
	)
}
