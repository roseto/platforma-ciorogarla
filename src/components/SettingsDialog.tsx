import {Switch, Avatar, Button, Dialog, DialogContent, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper} from "@suid/material";
import {getAuth, signOut} from "firebase/auth";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {Show} from "solid-js";
import {useAnalyticsState} from "../lib/store";
import {A} from "@solidjs/router";
import { version } from "../../package.json";


import AccountIcon from "@suid/icons-material/AccountCircle";
import InfoIcon from "@suid/icons-material/Info";
import AnalyticsIcon from "@suid/icons-material/Analytics";
import TermsIcon from "@suid/icons-material/Description";
import PrivacyIcon from "@suid/icons-material/PrivacyTip";

interface SettingsDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function SettingsDialog(props: SettingsDialogProps) {
	const firebaseApp = useFirebaseApp();
	const anayltics = useAnalyticsState();
	const auth = getAuth(firebaseApp);
	const user = useAuth(auth);

	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			PaperProps={{
				sx: {
					backgroundColor: "background.default",
					backgroundImage: "none"
				}
			}}
		>
			<DialogContent sx={{ px: .5, py: 1 }}>
				<Paper>
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
									secondary="Nu sunteti conectat"
								/>
							</>
						)}>
							<ListItemAvatar>
								<Avatar
									src={user.data?.photoURL || ""}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={user.data?.displayName || "Fara nume de utilizator"}
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
				<List disablePadding>
					<ListItemButton
						onClick={() => anayltics.set(!anayltics.state)}
					>
						<ListItemIcon>
							<AnalyticsIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Analitica"
							secondary={anayltics.state ? "Impartasiti informatie pentru analitica" : "Nu impartasiti informatii pentru analitica"}
							sx={{
								mr: 8
							}}
						/>
						<ListItemSecondaryAction>
							<Switch
								onClick={(e) => e.stopPropagation()}
								edge="end"
								checked={anayltics.state}
								onChange={(_, checked) => anayltics.set(checked)}
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
						dense
					>
						<ListItemIcon>
							<TermsIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Termeni si conditii"
						/>
					</ListItemButton>
					<ListItemButton
						dense
						component="a"
						href="https://ciorogarlaunita.eu.org/privacy-policy"
						target="_blank"
					>
						<ListItemIcon>
							<PrivacyIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Politica de confidentialitate"
						/>
					</ListItemButton>
					<ListItem dense>
						<ListItemIcon>
							<InfoIcon/>
						</ListItemIcon>
						<ListItemText 
							primary="Versiune"
							secondary={version}
						/>
					</ListItem>
				</List>
			</DialogContent>
		</Dialog>
	)
}
