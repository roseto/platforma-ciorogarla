import {useRouteData} from "@solidjs/router";
import {Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, List, Paper, Typography} from "@suid/material";
import {createResource, For, Show} from "solid-js";
import Header from "../../components/Header";
import {sanityClient, urlFor} from "../../lib/sanity";
import {Country, Organisation, VolunteeringProject} from "../../types/SanitySchema";

export default function Projects() {
	const data = useRouteData<typeof VolunteeringProjectsGetData>();

	return (
		<>
			<Header 
				title="Voluntariat"
				back
			/>
			<Container>
				<Show when={data()?.length === 0}>
					<Paper>
						<Typography textAlign="center" pt={2}>
							Nu există niciun proiect de voluntariat.
						</Typography>
					</Paper>
				</Show>
				<For each={data()}>
					{(project) => (
						<Card>
							<CardActionArea onClick={() => console.log("hello")}>
								<CardMedia
									image={urlFor(project.image).height(128).width(768).url()}
									sx={{ width: "100%", height: 128 }}
								/>
								<CardContent>
									<Typography variant="h5" gutterBottom>
										{project.name}
									</Typography>
									<Button
										onClick={(e) => {
											e.stopPropagation();
										}}
										component="a"
										href={(project.organisation as unknown as Organisation).link}
										target="_blank"
										startIcon={
											<Avatar
												src={urlFor((project.organisation as unknown as Organisation).logo).width(64).height(64).url()}
												sx={{ width: 24, height: 24 }}
											/>
										}
										variant="outlined"
										size="small"
										sx={{ mb: 2, borderRadius: "4rem" }}
									>
										{(project.organisation as unknown as Organisation).name}
									</Button>
									<Box gap={.5} displayRaw="flex" flexDirection="row">
										<Show when={project.period?.fromDate && project.period?.toDate}>
											<Chip
												label={`${calculateDays(project.period?.fromDate!, project.period?.toDate!)} zile`}
												size="small"
											/>
										</Show>
										<Show when={project.country}>
											<Chip
												label={(project.country as unknown as Country).name}
												size="small"
											/>
										</Show>
									</Box>
								</CardContent>
							</CardActionArea>
						</Card>
					)}
				</For>
			</Container>
		</>
	)
}

const calculateDays = (start: string, end: string) => {
	const startDate = new Date(start);
	const endDate = new Date(end);

	const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
	const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	return diffDays;
}

const fetcher = async () => {
	const res = sanityClient.fetch<VolunteeringProject[]>(`*[_type == "volunteeringProject"] {
		...,
		organisation->{...},
		country->{...}
	}`).catch(() => null);


	return res;
}

export function VolunteeringProjectsGetData() {
	const [data] = createResource(fetcher);

	return data;
}
