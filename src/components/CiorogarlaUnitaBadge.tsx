import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from "@suid/material";

export default function CiorogarlaUnitaBadge() {
	return (
		<ListItemButton
			component="a"
			href="https://ciorogarlaunita.eu.org"
			target="_blank"
			dense
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: 1
			}}
		>
			<ListItemAvatar>
				<Avatar
					src="/android-chrome-192x192.png"
				/>
			</ListItemAvatar>
			<ListItemText
				primary="Ciorogarla Unită"
				secondary="Facut cu ❤️ de către Ciorogârla Unită"
			/>
		</ListItemButton>
	)
}
