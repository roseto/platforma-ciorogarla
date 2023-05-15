import {A, useRouteData} from "@solidjs/router";
import {Chip, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography} from "@suid/material";
import {createResource, For} from "solid-js";
import Header from "../../components/Header";
import {sanityClient} from "../../lib/sanity";
import {News} from "../../types/SanitySchema";

export default function Articles() {
	const data = useRouteData<typeof ArticlesGetData>();

	return (
		<>
			<Header 
				title="Stiri"
				back
			/>
			<Container>
				<List>
					<ListSubheader disableSticky>
						Recent
					</ListSubheader>
					<For each={data.recent()}>
						{(article: News) => (
							<ListItemButton component={A} href={`/news/${article.slug?.current}`}>
								<ListItemText
									primary={<Typography>{article.title}</Typography>}
									secondary={
										<>
											<For each={article.tags}>
												{(tag) => (
													<Chip label={`#${tag}`} size="small" variant="outlined" sx={{ mr: .5 }} />
												)}
											</For>
										</>
									}
									disableTypography
								/>
							</ListItemButton>
						)}
					</For>
				</List>
			</Container>
		</>
	)
}

const recentFecher = async () => {
	const data = await sanityClient.fetch<News[]>(`*[_type == "news"] | order(_createdAt desc) [0..5]`)
		.catch(() => null);

	return data;
}

export function ArticlesGetData() {
	const [recent] = createResource(recentFecher);

	return {
		recent
	}
}
