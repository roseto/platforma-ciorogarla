import {Button, Container, TextField, Stack, SvgIcon, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link} from "@suid/material";
import {useAuth, useFirebaseApp} from "solid-firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile, TwitterAuthProvider, GithubAuthProvider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, setPersistence, browserLocalPersistence } from "firebase/auth";
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
	const [loading, setLoading] = createSignal(false);
	const [confirmationDialogOpen, setConfirmationDialogOpen] = createSignal(false);
	const [errorDialogOpen, setErrorDialogOpen] = createSignal(false);
	const [email, setEmail] = createSignal("");
	const auth = getAuth(firebase);
	const user = useAuth(auth);
	const navigate = useNavigate();

	createEffect(() => {
		if (!user.loading && user.data) {
			navigate("/", { replace: true });
		}
	});

	if (isSignInWithEmailLink(auth, window.location.href)) {
		let emailConfirm = new URLSearchParams(window.location.search).get("email") || "";

		if (!emailConfirm) {
			emailConfirm = window.prompt("Please provide your email for confirmation") || "";
		}

		setPersistence(auth, browserLocalPersistence).finally(() => {
			signInWithEmailLink(auth, emailConfirm, window.location.href)
				.catch(() => {
					setErrorDialogOpen(true)
			}).finally(() => {
					setLoading(false)
			});
		})

	}

	const login = async (provider: GoogleAuthProvider) => {
		setLoading(true);
		await setPersistence(auth, browserLocalPersistence);
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
		}).catch(() => {
			setErrorDialogOpen(true);
		}).finally(() => {
			setLoading(false);
		})
	}

	const loginWithEmail = async (e: Event) => {
		e.preventDefault();
		setLoading(true);

		await setPersistence(auth, browserLocalPersistence);
		sendSignInLinkToEmail(auth, email(), {
			url: window.location.origin + "/login?email=" + email(),
			handleCodeInApp: true,
		})
			.then(() => {
				setConfirmationDialogOpen(true);
			})
			.catch(() => {
				setErrorDialogOpen(true)
			})
			.finally(() => {
				setLoading(false);
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
						disabled={loading()}
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
						disabled={loading()}
					>
						Conectare cu Twitter
					</Button>
					<Button
						startIcon={<SvgIcon><GitHubIcon/></SvgIcon>}
						onClick={() => login(new GithubAuthProvider())}
						disableElevation
						disabled={loading()}
					>
						Conectare cu GitHub
					</Button>
					<Divider variant="middle"/>
					<Typography 
						textAlign="center" 
						color="textSecondary" 
						variant="caption"
					>
						sau pe moda veche
					</Typography>
					<form onSubmit={loginWithEmail}>
						<Stack>
							<TextField
								type="email"
								label="Email"
								variant="outlined"
								name="email"
								disabled={loading()}
								value={email()}
								onChange={(_, value) => setEmail(value)}
							/>
							<Button
								variant="outlined"
								type="submit"
								disabled={loading()}
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
			<Dialog
				open={confirmationDialogOpen()}
				onClose={() => setConfirmationDialogOpen(false)}
			>
				<DialogTitle>
					Email de confirmare trimis
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Am trimis un email de confirmare catre 
						<strong>{email()}</strong>
					</DialogContentText>
					<DialogContentText>
						Asigurati-va ca email-ul vine de la 
						<strong>noreply@ciorogarlaunita.eu.org</strong>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="text"
						onClick={() => setConfirmationDialogOpen(false)}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={errorDialogOpen()}
				onClose={() => setErrorDialogOpen(false)}
			>
				<DialogTitle>
					Eroare la conectare
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Va rugam sa incercati mai tarziu.
					</DialogContentText>
					<DialogContentText>
						Daca problema persista, contactati-ne la 
						<Link href="mailto:cont@ciorogarlaunita.eu.org" target="_blank"><strong>cont@ciorogarlaunita.eu.org</strong></Link>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="text"
						onClick={() => setErrorDialogOpen(false)}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
