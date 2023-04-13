import {useRouteData} from "@solidjs/router";
import {Avatar, Container, List, ListItemAvatar, ListItemButton, Paper, Typography} from "@suid/material";
import {createResource, For, Show} from "solid-js";
import Header from "../../components/Header";
import {sanityClient, urlFor} from "../../lib/sanity";
import {VolunteeringProject} from "../../types/SanitySchema";

export default function Projects() {
	const data = useRouteData<typeof VolunteeringProjectsGetData>();

	return (
		<>
			<Header 
				title="Voluntariat"
				back
			/>
			<Container>
				<Paper>
					<Show when={data()?.length === 0}>
						<Typography textAlign="center" pt={2}>
							Nu există niciun proiect de voluntariat.
						</Typography>
					</Show>
					<List>
						<For each={data()}>
							{(project) => (
								<ListItemButton>
									<ListItemAvatar>
										<Avatar
											src={urlFor(project.logo).width(64).height(64).url()}
										/>
									</ListItemAvatar>
								</ListItemButton>
							)}
						</For>
					</List>
				</Paper>
			</Container>
		</>
	)
}

const fetcher = async () => {
	const res = sanityClient.fetch<VolunteeringProject[]>(`*[_type == "volunteeringProject"]`)
		.catch(() => null);


	return res;
}

export function VolunteeringProjectsGetData() {
	const [data] = createResource(fetcher);

	return data;
}
