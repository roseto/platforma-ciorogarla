import {Switch, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListItemButton, ListItemAvatar, Avatar, Divider, Container, Paper, Button} from "@suid/material";
import Header from "../components/Header";
import { version } from "../../package.json";
import {useAnalyticsState} from "../lib/store";
import {A} from "@solidjs/router";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth, signOut} from "firebase/auth";
import {Show} from "solid-js";

import InfoIcon from "@suid/icons-material/Info";
import AnalyticsIcon from "@suid/icons-material/Analytics";
import TermsIcon from "@suid/icons-material/Description";
import PrivacyIcon from "@suid/icons-material/PrivacyTip";


export default function Settings() {
	const anayltics = useAnalyticsState();

	return (
		<>
			<Header
				title="Setari"
				back
			/>
			<Container disableGutters>
				<List>
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
					>
						<ListItemIcon>
							<TermsIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Termeni si conditii"
						/>
					</ListItemButton>
					<ListItemButton
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
			</Container>
		</>
	)
}
