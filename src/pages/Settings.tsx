import {Switch, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListItemButton, Divider, Container } from "@suid/material";
import Header from "../components/Header";
import { version } from "../../package.json";
import {useAnalyticsState} from "../lib/store";
import { DEV } from "../lib/dev";

import InfoIcon from "@suid/icons-material/Info";
import AnalyticsIcon from "@suid/icons-material/Analytics";
import TermsIcon from "@suid/icons-material/Description";
import PrivacyIcon from "@suid/icons-material/PrivacyTip";
import {Show} from "solid-js";
import {PRIVACY_POLICY, TERMS_AND_CONDITIONS} from "../lib/links";


export default function Settings() {
	const analytics = useAnalyticsState();

	return (
		<>
			<Header
				title="Setari"
				back
			/>
			<Container disableGutters>
				<List>
					<ListItemButton
						onClick={() => analytics.set(!analytics.state)}
						disabled={DEV}
					>
						<ListItemIcon>
							<AnalyticsIcon/>
						</ListItemIcon>
						<ListItemText
							primary="Analitica"
							secondary={!DEV && analytics.state ? "Impartasiti informatie pentru analitica" : "Nu impartasiti informatii pentru analitica"}
							sx={{
								mr: 8
							}}
						/>
						<ListItemSecondaryAction>
							<Switch
								onClick={(e) => e.stopPropagation()}
								edge="end"
								disabled={DEV}
								checked={!DEV && analytics.state}
								onChange={(_, checked) => !DEV && analytics.set(checked)}
							/>
						</ListItemSecondaryAction>
					</ListItemButton>
					
					<Divider
						variant="middle"
					/>

					<ListItemButton
						component="a"
						href={TERMS_AND_CONDITIONS}
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
						href={PRIVACY_POLICY}
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
					<Show when={DEV}>
						<ListItem>
							<ListItemIcon>
								<InfoIcon/>
							</ListItemIcon>
							<ListItemText 
								primary="Mod development"
								secondary="Modul de development este activat"
							/>
						</ListItem>
					</Show>
				</List>
			</Container>
		</>
	)
}
