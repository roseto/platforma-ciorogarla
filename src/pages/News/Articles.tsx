import {A, useRouteData} from "@solidjs/router";
import {Alert, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Link, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, Typography} from "@suid/material";
import {createResource, createSignal, For, Show} from "solid-js";
import Header from "../../components/Header";
import {sanityClient} from "../../lib/sanity";
import {Article} from "../../types/SanitySchema";

import ArchiveIcon from "@suid/icons-material/Archive";
import PostAddIcon from "@suid/icons-material/PostAdd";
import {UrgentArticleSection} from "../Home";
import {NEWS_EMAIL} from "../../lib/links";

export default function Articles() {
	const [addDialog, setAddDialog] = createSignal(false);
	const data = useRouteData<typeof ArticlesGetData>();

	return (
		<>
			<Header 
				title="Stiri"
				back
				actions={[
					{
						icon: PostAddIcon,
						onClick: () => setAddDialog(true),
					}
				]}
			/>
			<Container>
				<Stack>
					<UrgentArticleSection article={data.urgentArticle()} />
					<Paper>
						<List>
							<ListSubheader>
								Recent
							</ListSubheader>
							<Show when={data.recent()?.length === 0}>
								<Alert severity="info">
									Nu avem stiri inca.
								</Alert>
							</Show>
							<Show when={data.recent() === undefined}>
								<Alert severity="info">
									Se incarca...
								</Alert>
							</Show>
							<Show when={data.recent() === null}>
								<Alert severity="error">
									A aparut o eroare
								</Alert>
							</Show>
							<For each={data.recent()}>
								{(article: Article) => (
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
					</Paper>
					<ListItemButton component={A} href="/news/archive">
						<ListItemIcon>
							<ArchiveIcon />
						</ListItemIcon>
						<ListItemText
							primary="Arhiva"
						/>
					</ListItemButton>
				</Stack>
			</Container>
			<Dialog
				open={addDialog()}
				onClose={() => setAddDialog(false)}
			>
				<DialogTitle>
					Adaugare stire
				</DialogTitle>
				<DialogContent>
					<Typography>
						Pentru a adauga o stire, trimite un email cu titlul, continutul si tagurile stirii
						pe email la <Link href={`mailto:${NEWS_EMAIL}`} target="_blank"><strong>{NEWS_EMAIL}</strong></Link>
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

const recentFecher = async () => {
	const data = await sanityClient.fetch<Article[]>(`*[_type == "article"] | order(_createdAt desc) [0..10]`)
		.catch(() => null);

	return data;
}

const urgentArticleFetcher = async () => {
	const data = await sanityClient.fetch<Article>(`*[_type == "article" && urgent == true] | order(_createdAt desc) [0]`)
		.catch(() => null);
	
	return data;
}

export function ArticlesGetData() {
	const [recent] = createResource(recentFecher);
	const [urgentArticle] = createResource(urgentArticleFetcher);

	return {
		recent,
		urgentArticle
	}
}
