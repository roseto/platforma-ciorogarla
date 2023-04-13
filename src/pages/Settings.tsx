import {Switch, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListItemButton, ListItemAvatar, Avatar, Divider, Container, Paper, Button} from "@suid/material";
import Header from "../components/Header";
import InfoIcon from "@suid/icons-material/Info";
import { version } from "../../package.json";
import {useAnalyticsState} from "../lib/store";
import {A} from "@solidjs/router";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth, signOut} from "firebase/auth";
import {Show} from "solid-js";

import AccountIcon from "@suid/icons-material/AccountCircle";
import AnalyticsIcon from "@suid/icons-material/Analytics";
import TermsIcon from "@suid/icons-material/Description";


export default function Settings() {
	const firebaseApp = useFirebaseApp();
	const anayltics = useAnalyticsState();
	const auth = getAuth(firebaseApp);
	const user = useAuth(auth);

	return (
		<>
			<Header
				title="Setari"
				back
			/>
			<Container>
				<Paper
				>
					<ListItemButton
						component={A}
						href={user.data ? "" : "/login"}
					>
						<Show when={user.data} fallback={(
							<>
								<ListItemIcon>
									<AccountIcon/>
								</ListItemIcon>
								<ListItemText
									primary="Cont"
									secondary="Nu sunteti logat"
								/>
							</>
						)}>
							<ListItemAvatar>
								<Avatar
									src={user.data?.photoURL || ""}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={user.data?.displayName}
								secondary={user.data?.email}
							/>
						</Show>
					</ListItemButton>
					<Show when={user.data}>
						<Button
							variant="outlined"
							color="error"
							onClick={() => signOut(auth)}
							fullWidth
						>
							Deconectare
						</Button>
					</Show>
				</Paper>
			</Container>
			<List>
				<ListItemButton
					onClick={() => anayltics.set(!anayltics.state)}
				>
					<ListItemIcon>
						<AnalyticsIcon/>
					</ListItemIcon>
					<ListItemText
						primary="Analitica"
						secondary={anayltics.state ? "Impartasiti informatie anonima" : "Nu impartasiti informatie anonima"}
						sx={{
							mr: 8
						}}
					/>
					<ListItemSecondaryAction>
						<Switch
							checked={anayltics.state}
							onChange={e => anayltics.set(e.target.checked)}
						/>
					</ListItemSecondaryAction>
				</ListItemButton>
				
				<Divider
					variant="middle"
				/>

				<ListItemButton
					component="a"
					href="https://ciorogarlaunita.eu.org/terms-and-conditions"
					target="_blank"
				>
					<ListItemIcon>
						<TermsIcon/>
					</ListItemIcon>
					<ListItemText
						primary="Termeni si conditii"
					/>
				</ListItemButton>
				<ListItem>
					<ListItemIcon>
						<InfoIcon/>
					</ListItemIcon>
					<ListItemText 
						primary="Versiune"
						secondary={version}
					/>
				</ListItem>
			</List>
		</>
	)
}
