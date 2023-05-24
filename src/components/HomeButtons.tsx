import {ButtonBase, Grid, Typography} from "@suid/material";
import {FACEBOOK_GROUP, SCHEDULE_431, TOWN_HALL} from "../lib/links";
import {Link} from "@solidjs/router";
import {For} from "solid-js";

import ScheduleIcon from "@suid/icons-material/Schedule";
import TownHallIcon from "@suid/icons-material/LocationCity";
import GroupIcon from "@suid/icons-material/Group";

const buttons = [
	{
		label: "Orar 431",
		icon: ScheduleIcon,
		link: SCHEDULE_431
	},
	{
		label: "Primăria",
		icon: TownHallIcon,
		link: TOWN_HALL
	},
	{
		label: "Facebook",
		icon: GroupIcon,
		link: FACEBOOK_GROUP
	}
] as const;

export default function HomeButtons() {
	return (
		<Grid container sx={{ width: "100%" }}>
			<For each={buttons}>
				{(btn) => (
					<Grid item xs={4}>
						<ButtonBase
							component={btn.link.startsWith("http") ? "a" : Link}
							href={btn.link}
							target={btn.link.startsWith("http") ? "_blank" : undefined}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								padding: 2,
								borderRadius: theme => theme.shape.borderRadius / 8,
								textAlign: "center",
							}}
						>
							<btn.icon color="primary" />
							<Typography color="primary">
								{btn.label}
							</Typography>
						</ButtonBase>
					</Grid>
				)}
			</For>
		</Grid>
	)
}
