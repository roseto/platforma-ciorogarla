import {Alert, Avatar, Box, ButtonBase, Card, CardActionArea, CardContent, CardMedia, Chip, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Paper, Stack, Typography, useTheme} from "@suid/material";
import SettingsIcon from "@suid/icons-material/Settings";
import InstallIcon from "@suid/icons-material/InstallMobile";
import CardWithIcon from "../components/CardWithIcon";
import Header from "../components/Header";
import {createEffect, createResource, createSignal, For, Show} from "solid-js";
import {modules} from "../lib/modules";
import {A, useRouteData} from "@solidjs/router";
import {isInstalled} from "../lib/device";
import SettingsDialog from "../components/SettingsDialog";
import {Article, Business, VolunteeringProject} from "../types/SanitySchema";

import ArrowForwardIcon from "@suid/icons-material/ArrowForward";
import {sanityClient, urlFor} from "../lib/sanity";
import HomeButtons from "../components/HomeButtons";
import BackgroundGlow from "../components/BackgroundGlow";
import Assistant from "../components/Assistant";

export default function Home() {
	const theme = useTheme();
	const [settingsDialogOpen, setSettingsDialogOpen] = createSignal(false);
	const data = useRouteData<typeof HomeGetData>();

	return (
		<>
			<Assistant />
			<BackgroundGlow top={128}/>
			<SettingsDialog
				open={settingsDialogOpen()}
				onClose={() => setSettingsDialogOpen(false)}
			/>
			<Header 
				title="Ciorogârla Unită"
				noHeading
				themeColor={theme.palette.background.default}
				actions={[
					{
						onClick: () => setSettingsDialogOpen(true),
						icon: SettingsIcon,
					}
				]}
			/>
			<Container
				sx={{
					marginTop: "env(safe-area-inset-top)",
					pb: 2
				}}
			>
				<Stack>
					<Box
						displayRaw="flex"
						gap={1}
						flexDirection="row"
						alignItems="center"
						my={2}
					>
						<Avatar
							src="/android-chrome-192x192.png"
							sx={{
								width: "32px",
								height: "32px",
							}}
						/>
						<Typography
							variant="h6"
						>
							Ciorogârla Unită
						</Typography>
					</Box>
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

					<HomeButtons/>

					<UrgentArticleSection article={data.urgentArticle()} />
					<NewsSection articles={data.articles()} />
					<BusinessSection businesses={data.businesses()}/>
					<ProjectsSection projects={data.projects()}/>

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


const fetcherUrgentArticle = async () => {
	const data = sanityClient.fetch<Article>(`*[_type == "article" && urgent] | order(_createdAt desc)[0]`)
		.catch(() => null);

	return data;
}


const fetcherNews = async () => {
	const data = sanityClient.fetch<Article[]>(`*[_type == "article"] | order(_createdAt desc)[0..3]`)
		.catch(() => null);

	return data;
}

const fetcherBusinesses = async () => {
	const data = sanityClient.fetch<Business[]>(`*[_type == "business"] | order(_createdAt desc)[0...3]`)
		.catch(() => null);

	return data;
}


const fetcherProjects = async () => {
	const data = sanityClient.fetch<VolunteeringProject[]>(`*[_type == "volunteeringProject"] | order(_createdAt desc)[0...3]`)
		.catch(() => null);

	return data;
}

export function HomeGetData() {
	const [urgentArticle] = createResource(fetcherUrgentArticle);
	const [articles] = createResource(fetcherNews);
	const [businesses] = createResource(fetcherBusinesses);
	const [projects] = createResource(fetcherProjects);

	return {
		urgentArticle,
		articles,
		businesses,
		projects
	}
}

export function UrgentArticleSection(props: { article?: Article | null }) {
	return (
		<Show when={props.article}>
			<ButtonBase 
				sx={{
					textAlign: "start",
				}}
				component={A}
				href={`/news/${props.article?.slug?.current}`}
			>
				<Alert severity="error" sx={{ width: "100%" }}>
					<Typography variant="caption" color="textSecondary">
						URGENT
					</Typography>
					<br />
					<strong>{props.article?.title}</strong>
					<br />
					<For each={props.article?.tags}>
						{(tag) => (
							<Chip label={`#${tag}`} size="small" variant="outlined" sx={{ mr: .5, my: .25 }} />
						)}
					</For>
					<br />
					<Typography variant="overline" color="textSecondary">
						{new Date(props.article?._createdAt || "").toLocaleDateString("ro-RO")}
					</Typography>
				</Alert>
			</ButtonBase>
		</Show>
	)
}

function NewsSection(props: { articles?: Article[] | null }) {
	return (
		<Show when={props.articles?.length}>
			<List>
				<ListSubheader>
					Stiri recente
				</ListSubheader>
				<For each={props.articles}>
					{(article, idx) => (
						<A href={`/news/${article.slug?.current}`}>
							<Card
								elevation={0}
								variant="outlined"
								sx={{ 
									backgroundColor: "transparent",
									borderTopLeftRadius: idx() === 0 ? undefined : 0,
									borderTopRightRadius: idx() === 0 ? undefined : 0,
									borderBottomLeftRadius: idx() === props.articles?.length! - 1 ? undefined : 0,
									borderBottomRightRadius: idx() === props.articles?.length! - 1 ? undefined : 0,
									borderBottom: idx() === props.articles?.length! - 1 ? undefined : "none",
								}}
							>
								<CardActionArea>
									<Show when={article.cover}>
										<CardMedia
											image={urlFor(article.cover).width(1024).height(256).url()}
											sx={{
												height: 64,
												width: "100%"
											}}
										/>
									</Show>
									<ListItem>
										<ListItemText
											primary={article.title}
											secondary={new Date(article._createdAt || "").toLocaleDateString("ro")}
										/>
									</ListItem>
								</CardActionArea>
							</Card>
						</A>
					)}
				</For>
				<A href="/news">
					<ListItemButton>
						<ListItemText
							primary="Mai multe"
						/>
						<ListItemSecondaryAction>
							<ArrowForwardIcon />
						</ListItemSecondaryAction>
					</ListItemButton>
				</A>
			</List>
		</Show>
	)
}

function BusinessSection(props: { businesses?: Business[] | null }) {
	return (
		<Show when={props.businesses?.length}>
			<List>
				<ListSubheader>
					Afaceri noi adaugate
				</ListSubheader>
				<For each={props.businesses}>
					{(business) => (
						<A href={`/businesses/${business.slug?.current}`}>
							<ListItemButton>
								<ListItemAvatar>
									<Avatar
										src={urlFor(business.logo).width(64).height(64).url()}
										variant="rounded"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={business.name}
									secondary={business.description}
									secondaryTypographyProps={{ noWrap: true }}
								/>
							</ListItemButton>
						</A>
					)}
				</For>
				<A href="/businesses">
					<ListItemButton>
						<ListItemText
							primary="Mai multe"
						/>
						<ListItemSecondaryAction>
						<ArrowForwardIcon />
						</ListItemSecondaryAction>
					</ListItemButton>
				</A>
			</List>
		</Show>
	)
}


function ProjectsSection(props: { projects?: VolunteeringProject[] | null }) {

	return (
		<Show when={props.projects?.length}>
			<List>
				<ListSubheader>
					Proiecte noi adaugate
				</ListSubheader>
				<For each={props.projects}>
					{(project) => (
						<A href={`/volunteering/${project.slug?.current}`}>
							<ListItemButton>
								<ListItemAvatar>
									<Avatar
										src={urlFor(project.image).width(64).height(64).url()}
										variant="rounded"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={project.name}
									secondary={project.description}
									secondaryTypographyProps={{ noWrap: true }}
								/>
							</ListItemButton>
						</A>
					)}
				</For>
				<A href="/volunteering">
					<ListItemButton>
						<ListItemText
							primary="Mai multe"
						/>
						<ListItemSecondaryAction>
						<ArrowForwardIcon />
						</ListItemSecondaryAction>
					</ListItemButton>
				</A>
			</List>
		</Show>
	)
}
