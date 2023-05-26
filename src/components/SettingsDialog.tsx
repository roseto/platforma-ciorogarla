import {Avatar, Button, Dialog, DialogContent, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Menu, MenuItem} from "@suid/material";
import {createResource, createSignal, Show} from "solid-js";
import {A} from "@solidjs/router";
import { useSupabaseAuth } from "solid-supabase";


import AccountIcon from "@suid/icons-material/AccountCircle";
import LogoutIcon from "@suid/icons-material/Logout";
import SettingsIcon from "@suid/icons-material/Settings";
import TermsIcon from "@suid/icons-material/Description";
import PrivacyIcon from "@suid/icons-material/PrivacyTip";
import {useUser} from "../hooks/useUser";

interface SettingsDialogProps {
	open: boolean;
	onClose: () => void;
}

export default function SettingsDialog(props: SettingsDialogProps) {
	const auth = useSupabaseAuth();
	const [accountMenuAnchor, setAccountMenuAnchor] = createSignal<HTMLElement | null>(null)
	const open = () => Boolean(accountMenuAnchor());
	const user = useUser();

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
						component={user() ? "button" : A}
						href={user() ? "" : "/login"}
						onClick={user() ? ((e: Event) => {
							setAccountMenuAnchor(e.currentTarget as HTMLElement);
						}) : undefined}
					>
						<Show when={user()} fallback={(
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
									src={user()?.user_metadata.avatar_url}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={user()?.user_metadata?.full_name || "Fara Nume"}
								secondary={user()?.email}
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
								auth.signOut();
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
