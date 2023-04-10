import { RouteDataFuncArgs, useRouteData } from "@solidjs/router";
import {Avatar, Box, Button, Card, CardContent, Chip, Container, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Skeleton, Stack, SvgIcon, Typography, useTheme} from "@suid/material";
import {createMemo, Show} from "solid-js";
import {createResource} from "solid-js";
import Header from "../../components/Header";
import {businessTypes} from "../../lib/businessTypes";
import {sanityClient, urlFor} from "../../lib/sanity";
import {Business} from "../../types/SanitySchema";
import {Dynamic} from "solid-js/web";
import {createEffect} from "solid-js";


import MapIcon from "@suid/icons-material/Map";
import WebsiteIcon from "@suid/icons-material/Link";
import EmailIcon from "@suid/icons-material/Email";
import PhoneIcon from "@suid/icons-material/Phone";
import StarIcon from "@suid/icons-material/Star";
import FacebookSvg from "../../resources/icons/facebook.svg?component-solid";
import InstagramSvg from "../../resources/icons/instagram.svg?component-solid";
import CardWithIcon from "../../components/CardWithIcon";

export default function BusinessPage() {
	const data = useRouteData<typeof BusinessGetData>();
	const theme = useTheme();
	const windowWidth = window.innerWidth;
	const ChipIcon = createMemo(() => businessTypes.get(data()?.type || "")?.icon || (() => null));


	return (
		<>
			<Header
				title={data()?.name ?? "Afaceri locale"}
				back
				noHeading
				themeColor={data()?.cover?.asset?.metadata?.palette?.dominant.background}
			/>
			<div
				style={{
					position: "relative",
					"padding-bottom": "68px",
				}}
			>
				<Show 
					when={data()?.cover} 
					fallback={(
						<Skeleton
							variant="rectangular"
							sx={{
								width: "100%",
								height: "128px",
							}}
						/>
					)}
				>
					<img 
						src={urlFor(data()?.cover).width(windowWidth).height(128).url() ?? ""}
						alt={data()?.name ?? ""}
						width={windowWidth}
						height="128px"
					/>
				</Show>
				<Box
					sx={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						top: 64,
						width: "128px",
						height: "128px",
						backgroundColor: "background.default",
						borderRadius: theme => theme.shape.borderRadius / 8,
						overflow: "hidden",
					}}
				>
					<Show 
						when={data()?.logo}
						fallback={(
							<Skeleton
								variant="rectangular"
								sx={{
									width: "128px",
									height: "128px",
								}}
							/>
						)}
					>
						<Avatar 
							src={urlFor(data()?.logo).width(128).height(128).url() ?? ""}
							alt={data()?.name ?? ""}
							variant="square"
							sx={{
								width: "128px",
								height: "128px",
							}}
						/>
					</Show>
				</Box>
			</div>
			<Container>
				<Stack>
					<Typography variant="h4" component="h1" textAlign="center">
						{data()?.name}
					</Typography>
					<Show when={data()?.type}>
						<Chip
							sx={{
								alignSelf: "center",
							}}
							label={businessTypes.get(data()?.type as string)?.name}
							icon={<Dynamic component={ChipIcon()} />}
							variant="outlined"
							size="small"
						/>
					</Show>
					<Show when={data()?.location}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<MapIcon />}
						>
							Arata locatia
						</Button>
					</Show>
					<Show when={data()?.contact?.website}>
						<Button
							variant="outlined"
							color="secondary"
							startIcon={<WebsiteIcon />}
						>
							Viziteaza site-ul
						</Button>
					</Show>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							margin: "8px 0"
						}}
					>
						<Show when={data()?.contact?.facebook}>
							<IconButton>
								<SvgIcon>
									<FacebookSvg />
								</SvgIcon>
							</IconButton>
						</Show>
						<Show when={data()?.contact?.instagram}>
							<IconButton>
								<SvgIcon>
									<InstagramSvg />
								</SvgIcon>
							</IconButton>
						</Show>
					</Box>
					<Card>
						<CardContent>
							<Typography
								variant="body1"
							>
								{data()?.description}
							</Typography>
						</CardContent>
					</Card>
					<Show when={data()?.isSponsor}>
						<CardWithIcon 
							cardIcon={StarIcon}
							cardIconColor={theme.palette.primary.dark}
							sx={{
								background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
							}}
						>
							<CardContent>
								<Typography
									variant="h5"
									color={theme.palette.primary.contrastText}
								>
									Aceasta afacere ajuta Ciorogârla Unită!
								</Typography>
								<Typography
									color={theme.palette.primary.contrastText}
								>
									{data()?.name} ne ajuta in misiunea noastra de 
									a sustine comunitatea noatra!
								</Typography>
							</CardContent>
						</CardWithIcon>
					</Show>
					<List>
						<ListSubheader disableSticky>
							Contact
						</ListSubheader>
						<Show when={data()?.contact?.email}>
							<a href={`mailto:${data()?.contact?.email}`} target="_blank">
								<ListItemButton>
									<ListItemIcon>
										<EmailIcon />
									</ListItemIcon>
									<ListItemText 
										primary="Email"
										secondary={data()?.contact?.email}
									/>
								</ListItemButton>
							</a>
						</Show>
						<Show when={data()?.contact?.phone}>
							<a href={`tel:${data()?.contact?.phone}`}>
								<ListItemButton>
									<ListItemIcon>
										<PhoneIcon />
									</ListItemIcon>
									<ListItemText 
										primary="Phone"
										secondary={data()?.contact?.phone}
									/>
								</ListItemButton>
							</a>
						</Show>
					</List>
				</Stack>
			</Container>
		</>
	)
}

const fetcher = async (id: string) => {
	const data = await sanityClient.fetch<Business>(`*[_type == "business" && slug.current == $slug][0] { ..., cover {..., asset -> {..., metadata}}}`, { slug: id })
		.catch(() => null);

	console.log(data);

	return data;
}

export const BusinessGetData = ({ params, navigate }: RouteDataFuncArgs) => {
	const [data] = createResource(() => params.id, fetcher);
	
	createEffect(() => {
		if (data() === null) {
			navigate("/businesses", { replace: true })
		}
	})

	return data;
}
