import {CardActionArea, CardContent, Chip, Container, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography} from "@suid/material";
import SettingsIcon from "@suid/icons-material/Settings";
import InstallIcon from "@suid/icons-material/InstallMobile";
import CardWithIcon from "../components/CardWithIcon";
import Header from "../components/Header";
import {For, Show} from "solid-js";
import {modules} from "../lib/modules";
import {A} from "@solidjs/router";
import {isInstalled} from "../lib/device";

export default function Home() {
	return (
		<>
			<Header 
				title="Acasa"
				noHeading
				actions={[
					{
						path: "/settings",
						icon: SettingsIcon,
					}
				]}
			/>
			<Container>
				<Stack>
					<Typography
						mt={2}
						variant="h6"
						gutterBottom
					>
						Ciorogârla Unită
					</Typography>
					<Show when={!isInstalled()}>
						<A href="/install">
							<Paper variant="outlined" sx={{ backgroundColor: "transparent" }}>
								<ListItemButton>
									<ListItemIcon>
										<InstallIcon />
									</ListItemIcon>
									<ListItemText 
										primary="Instaleaza aplicatia"
										secondary="Pare ca nu ai instalat aplicatia. Apasa aici pentru acces mai usor."
									/>
								</ListItemButton>
							</Paper>
						</A>
					</Show>
					<For each={modules}>
						{(module) => (
							<A href={module.disabled ? "" : module.path || ""}>
								<CardWithIcon 
									cardIcon={module.icon}
									disabled={module.disabled}
									sx={{
										opacity: module.disabled ? 0.5 : 1,
									}}
								>
									<CardActionArea disabled={module.disabled}>
										<CardContent>
											<Typography variant="h4">
												{module.name}
											</Typography>
											<Show when={module.disabled}>
												<Chip 
													size="small"
													variant="outlined"
													label="In curand"
												/>
											</Show>
											<Typography variant="body1" color="textSecondary">
												{module.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</CardWithIcon>
							</A>
						)}
					</For>
				</Stack>
			</Container>
		</>
	)
}
