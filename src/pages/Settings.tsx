import {Container, List, ListItem, ListItemIcon, ListItemText} from "@suid/material";
import Header from "../components/Header";
import InfoIcon from "@suid/icons-material/Info";
import { version } from "../../package.json";


export default function Settings() {
	return (
		<>
			<Header
				title="Setari"
				back
			/>
			<Container>
				<List disablePadding>
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
