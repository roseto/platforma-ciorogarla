import {A, useRouteData} from "@solidjs/router"
import {Alert, Container, List, ListItem, ListItemButton, ListItemText} from "@suid/material";
import {createResource, For, Show} from "solid-js"
import Assistant from "../../components/Assistant";
import Header from "../../components/Header"
import {sanityClient} from "../../lib/sanity"
import {Article} from "../../types/SanitySchema";


export default function Archive() {
	const data = useRouteData<typeof ArchiveGetData>();

	return (
		<>
			<Assistant />
			<Header
				title="Arhiva"
				back
			/>
			<Container>
				<List>
					<Show when={data()?.length === 0}>
						<Alert severity="info">
							Nu avem stiri inca.
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
						{article => (
							<ListItemButton component={A} href={`/news/${article.slug?.current}`}>
								<ListItemText
									primary={article.title}
									secondary={new Date(article._createdAt).toLocaleDateString("ro")}
								/>
							</ListItemButton>
						)}
					</For>
				</List>
			</Container>
		</>
	)
}


const fetcher = async () => {
	const data = await sanityClient.fetch<Article[]>(`*[_type == "article"] | order(_createdAt desc)`)

	return data;
}

export function ArchiveGetData() {
	const [data] = createResource(fetcher);

	return data;
}
