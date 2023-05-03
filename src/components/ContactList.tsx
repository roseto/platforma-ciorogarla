import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SvgIcon} from "@suid/material";
import {Show} from "solid-js";

import EmailIcon from "@suid/icons-material/Email";
import PhoneIcon from "@suid/icons-material/Phone";
import FacebookSvg from "../resources/icons/facebook.svg?component-solid";
import InstagramSvg from "../resources/icons/instagram.svg?component-solid";
import WebsiteIcon from "@suid/icons-material/Web";

interface ContactList {
	website?: string,
	phone?: string,
	email?: string,
	facebook?: string,
	instagram?: string,
}


export default function ContactList(props: ContactList) {

	return (
		<List>
			<ListSubheader disableSticky>
				Contact
			</ListSubheader>
			<Show when={props.website}>
				<ListItemButton 
					component="a"
					href={props.website} 
					target="_blank"
				>
					<ListItemIcon>
						<WebsiteIcon />
					</ListItemIcon>
					<ListItemText 
						primary="Website"
						secondary={props.website}
					/>
				</ListItemButton>
			</Show>
			<Show when={props.email}>
				<ListItemButton 
					component="a"
					href={`mailto:${props.email}`} 
					target="_blank"
				>
					<ListItemIcon>
						<EmailIcon />
					</ListItemIcon>
					<ListItemText 
						primary="Email"
						secondary={props.email}
					/>
				</ListItemButton>
			</Show>
			<Show when={props.phone}>
				<ListItemButton
					component="a"
					href={`tel:${props.phone}`}
				>
					<ListItemIcon>
						<PhoneIcon />
					</ListItemIcon>
					<ListItemText 
						primary="Phone"
						secondary={props.phone}
					/>
				</ListItemButton>
			</Show>
			<Show when={props.facebook}>
				<ListItemButton
					component="a"
					href={props.facebook}
				>
					<ListItemIcon>
						<SvgIcon>
							<FacebookSvg />
						</SvgIcon>
					</ListItemIcon>
					<ListItemText 
						primary="Facebook"
						secondary={props.facebook}
					/>
				</ListItemButton>
			</Show>
			<Show when={props.instagram}>
				<ListItemButton
					component="a"
					href={props.instagram}
				>
					<ListItemIcon>
						<SvgIcon>
							<InstagramSvg />
						</SvgIcon>
					</ListItemIcon>
					<ListItemText 
						primary="Instagram"
						secondary={props.instagram}
					/>
				</ListItemButton>
			</Show>
		</List>
	);
}
