import {ButtonBase, Grid, Typography} from "@suid/material";
import {For} from "solid-js";

import ScheduleIcon from "@suid/icons-material/Schedule";
import {SCHEDULE_431} from "../lib/links";
import {Link} from "@solidjs/router";

const buttons = [
	{
		label: "Orar 431",
		icon: ScheduleIcon,
		link: SCHEDULE_431
	}
] as const;

export default function HomeButtons() {
	return (
		<Grid container>
			<For each={buttons}>
				{(btn) => (
					<Grid item>
						<ButtonBase
							component={btn.link.startsWith("http") ? "a" : Link}
							href={btn.link}
							target={btn.link.startsWith("http") ? "_blank" : undefined}
							sx={{
								display: "flex",
								flexDirection: "column",
								padding: 2,
								borderRadius: theme => theme.shape.borderRadius / 8
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
