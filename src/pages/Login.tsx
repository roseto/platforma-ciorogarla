import {Button, Container, TextField, Stack, SvgIcon, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link} from "@suid/material";
import { useSupabaseAuth } from "solid-supabase";
import Header from "../components/Header";
import {useNavigate} from "@solidjs/router";
import {createEffect, createSignal} from "solid-js";

import GoogleIcon from "../resources/icons/google.svg?component-solid";
import TwitterIcon from "../resources/icons/twitter.svg?component-solid";
import GitHubIcon from "../resources/icons/github.svg?component-solid";
import AppleIcon from "../resources/icons/apple.svg?component-solid";
import {useUser} from "../hooks/useUser";

export default function Login() {
	const [loading, setLoading] = createSignal(false);
	const [confirmationDialogOpen, setConfirmationDialogOpen] = createSignal(false);
	const [errorDialogOpen, setErrorDialogOpen] = createSignal(false);
	const [email, setEmail] = createSignal("");
	const auth = useSupabaseAuth();
	const navigate = useNavigate();
	const user = useUser();

	createEffect(() => {
		if (!user.loading && user()) {
			navigate("/", { replace: true });
		}
	});

	const login = (provider: "google" | "github" | "twitter") => {
		setLoading(true);
		
		auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: window.location.origin + "/login"
			}
		}).catch((err) => {
			console.log(err);
				setErrorDialogOpen(true);
		})
	}

	const loginWithEmail = (e: Event) => {
		e.preventDefault();
		setLoading(true);

		auth.signInWithOtp({
			email: email(),
			options: {
				emailRedirectTo: window.location.origin + "/login"
			}
		})
			.then(() => {
				setConfirmationDialogOpen(true);
			})
			.catch((err) => {
				console.log(err);
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
						onClick={() => login("google")}
						disabled={loading()}
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
						onClick={() => login("twitter")}
						disabled={loading()}
						disableElevation
					>
						Conectare cu Twitter
					</Button>
					<Button
						startIcon={<SvgIcon><GitHubIcon/></SvgIcon>}
						onClick={() => login("github")}
						disabled={loading()}
						disableElevation
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
