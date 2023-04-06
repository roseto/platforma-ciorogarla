import {Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Stack} from "@suid/material";
import {For} from "solid-js";
import Header from "../../components/Header";


const aprilEvents = [
	{
		day: 10,
		name: "Eveniment 1",
		description: "Descriere eveniment 1",
	},
	{
		day: 12,
		name: "Eveniment 2",
		description: "Descriere eveniment 2",
	},
	{
		day: 14,
		name: "Eveniment 3",
		description: "Descriere eveniment 3",
	},
	{
		day: 18,
		name: "Eveniment 1",
		description: "Descriere eveniment 1",
	},
	{
		day: 19,
		name: "Eveniment 2",
		description: "Descriere eveniment 2",
	}
];

const mayEvents = [
	{
		day: 4,
		name: "Eveniment 2",
		description: "Descriere eveniment 2",
	},
	{
		day: 8,
		name: "Eveniment 3",
		description: "Descriere eveniment 3",
	},
	{
		day: 18,
		name: "Eveniment 1",
		description: "Descriere eveniment 1",
	},
	{
		day: 30,
		name: "Eveniment 2",
		description: "Descriere eveniment 2",
	}
];

export default function Events() {
	const availableHeight = window.innerHeight - 128 - 48;

	return (
		<>
			<Header
				title="Evenimente"
				back
			/>
			<Container>
				<Paper
					sx={{
						overflow: "hidden"
					}}
				>
					<List
						dense
						disablePadding
						sx={{
							maxHeight: availableHeight,
							overflow: "auto",
							position: "relative",
						}}
					>
						<ListSubheader>
							Aprilie
						</ListSubheader>
						<For each={aprilEvents}>
							{(event) => (
								<ListItem>
									<ListItemAvatar>
										<Avatar
											sx={{
												backgroundColor: "primary.main",
											}}
										>
											{event.day}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={event.name}
										secondary={event.description}
									/>
								</ListItem>
							)}
						</For>
						<ListSubheader>
							Mai
						</ListSubheader>
						<For each={mayEvents}>
							{(event) => (
								<ListItem>
									<ListItemAvatar>
										<Avatar
											sx={{
												backgroundColor: "primary.main",
											}}
										>
											{event.day}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={event.name}
										secondary={event.description}
									/>
								</ListItem>
							)}
						</For>
					</List>
				</Paper>
			</Container>
		</>
	)
}
