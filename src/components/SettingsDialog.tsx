import {Avatar, Button, Dialog, DialogContent, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Menu, MenuItem} from "@suid/material";
import {getAuth, signOut} from "firebase/auth";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {createSignal, Show} from "solid-js";
import {A} from "@solidjs/router";


import AccountIcon from "@suid/icons-material/AccountCircle";
import LogoutIcon from "@suid/icons-material/Logout";
import SettingsIcon from "@suid/icons-material/Settings";
import TermsIcon from "@suid/icons-material/Description";
import PrivacyIcon from "@suid/icons-material/PrivacyTip";

interface SettingsDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function SettingsDialog(props: SettingsDialogProps) {
	const firebaseApp = useFirebaseApp();
	const [accountMenuAnchor, setAccountMenuAnchor] = createSignal<HTMLElement | null>(null)
	const open = () => Boolean(accountMenuAnchor());
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
			fullWidth
		>
			<DialogContent sx={{ p: 1 }}>
				<Paper>
					<ListItemButton
						sx={{ width: "100%" }}
						component={user.data ? "button" : A}
						href={user.data ? "" : "/login"}
						onClick={user.data ? ((e: Event) => {
							setAccountMenuAnchor(e.currentTarget as HTMLElement);
						}) : undefined}
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
					<Menu
						open={open()}
						anchorEl={accountMenuAnchor()}
						onClose={() => setAccountMenuAnchor(null)}
						onClick={() => setAccountMenuAnchor(null)}
						PaperProps={{
							sx: {
								width: accountMenuAnchor()?.offsetWidth
							}
						}}
					>
						<MenuItem
							onClick={() => {
								signOut(auth);
								props.onClose();
							}}
						>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							Deconectare
						</MenuItem>
					</Menu>
					<ListItemButton
						component={A}
						href="/settings"
					>
						<ListItemIcon>
							<SettingsIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Setari"
						/>
					</ListItemButton>
				</Paper>
				<List>
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
				</List>
			</DialogContent>
		</Dialog>
	)
}
