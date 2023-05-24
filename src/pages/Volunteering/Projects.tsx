import {debounce} from "@solid-primitives/scheduled";
import {A, RouteDataFuncArgs, useRouteData, useSearchParams} from "@solidjs/router";
import {Alert, Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Link, Stack, Typography} from "@suid/material";
import {createResource, createSignal, For, Show} from "solid-js";
import Header from "../../components/Header";
import Searchbox from "../../components/Searchbox";
import {sanityClient, urlFor} from "../../lib/sanity";
import {Country, Organisation, VolunteeringProject} from "../../types/SanitySchema";

import AddProjectIcon from "@suid/icons-material/NoteAdd";
import {PROJECT_EMAIL} from "../../lib/links";

export default function Projects() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = createSignal("");
	const [addDialog, setAddDialog] = createSignal(false);
	const data = useRouteData<typeof VolunteeringProjectsGetData>();

	const debounceSearch = debounce((input: string) => {
		setSearchParams({ search: input }, { replace: true });
	}, 500)
			

	return (
		<>
			<Header 
				title="Voluntariat"
				back
				actions={[
					{
						icon: AddProjectIcon,
						onClick: () => setAddDialog(true),
					}
				]}
			/>
			<Container>
				<Stack>
					<Searchbox
						defaultValue={searchParams.search}
						value={search()}
						onChange={(value) => {
							setSearch(value);
							debounceSearch(value);
						}}
					/>
					<Show when={data()?.length === 0}>
						<Alert severity="info">
							Nu există niciun proiect de voluntariat.
							Cautam proiecte de voluntariat constant,
							asa ca incearca mai tarziu.
						</Alert>
					</Show>
					<Show when={data() === undefined}>
						<Alert severity="info">
							Se incarca...
						</Alert>
					</Show>
					<Show when={data() === null}>
						<Alert severity="error">
							A aparut o eroare
						</Alert>
					</Show>
					<For each={data()}>
						{(project) => (
							<A
								href={`/volunteering/${project.slug?.current}`}
							>
								<Card>
									<CardActionArea>
										<CardMedia
											image={urlFor(project.image).height(256).width(1024).url()}
											sx={{ width: "100%", height: 128 }}
										/>
										<CardContent>
											<Typography variant="h5" gutterBottom>
												{project.name}
											</Typography>
											<Typography color="textSecondary" gutterBottom>
												{project.topic}
											</Typography>
											<Button
												onClick={(e) => {
													e.stopPropagation();
												}}
												component="a"
												href={(project.organisation as unknown as Organisation).contact?.website}
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
							</A>
						)}
					</For>
				</Stack>
			</Container>
			<Dialog
				open={addDialog()}
				onClose={() => setAddDialog(false)}
			>
				<DialogTitle>
					Adaugare proiect
				</DialogTitle>
				<DialogContent>
					<Typography>
						Pentru adaugarea unui proiect de voluntariat, va rugam sa ne contactati
						pe email la <Link href={`mailto:${PROJECT_EMAIL}`} target="_blank"><strong>{PROJECT_EMAIL}</strong></Link>
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						variant="text"
						onClick={() => setAddDialog(false)}
					>
						OK
					</Button>
				</DialogActions>
			</Dialog>
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

const fetcher = async ({ search }: { search: string }) => {
	const groqQuery = `
		*[_type == "volunteeringProject"
			${search ? `&& (name match "*${search}*" || topic match "*${search}*" || description match "*${search}*" || country->name match "*${search}*")` : ""}
		] {
			...,
			organisation->{...},
			country->{...}
		}
	`;

	const res = sanityClient.fetch<VolunteeringProject[]>(groqQuery).catch(() => null);


	return res;
}

export function VolunteeringProjectsGetData({ location }: RouteDataFuncArgs) {
	const [data] = createResource(() => ({
		search: location.query?.search
	}), fetcher);

	return data;
}
