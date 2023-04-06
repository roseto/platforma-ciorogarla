import {CardActionArea, CardContent, Container, Stack, Typography} from "@suid/material";
import SettingsIcon from "@suid/icons-material/Settings";
import CardWithIcon from "../components/CardWithIcon";
import Header from "../components/Header";
import {For} from "solid-js";
import {modules} from "../lib/modules";
import {A} from "@solidjs/router";

export default function Home() {
	return (
		<>
			<Header 
				title="Acasa"
				actions={[
					{
						path: "/settings",
						icon: SettingsIcon,
					}
				]}
			/>
			<Container>
				<Stack>
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
