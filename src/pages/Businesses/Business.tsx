import { RouteDataFuncArgs, useRouteData } from "@solidjs/router";
import {Avatar, Box, Button, Card, CardActionArea, CardContent, Chip, Container, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Skeleton, Stack, SvgIcon, Typography, useTheme} from "@suid/material";
import CardWithIcon from "../../components/CardWithIcon";
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
import ListIcon from "@suid/icons-material/Assignment";
import MarkerIcon from "@suid/icons-material/PinDrop";
import FacebookSvg from "../../resources/icons/facebook.svg?component-solid";
import InstagramSvg from "../../resources/icons/instagram.svg?component-solid";
import {getMapsURL} from "../../lib/maps";
import MapsCard from "../../components/MapsCard";

export default function BusinessPage() {
	const data = useRouteData<typeof BusinessGetData>();
	const theme = useTheme();
	const windowWidth = window.innerWidth;
	const ChipIcon = createMemo(() => businessTypes.get(data()?.type || "")?.icon || (() => null));


	return (
		<>
			<Header
				title={data()?.name ?? "Afacere"}
				back
				noHeading
				// @ts-ignore: Metadata is there but not specified
				themeColor={data()?.cover?.asset?.metadata?.palette?.dominant.background}
				// @ts-ignore: Metadata is there but not specified
				color={data()?.cover?.asset?.metadata?.palette?.dominant.title}
			/>
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
					src={urlFor(data()?.cover).width(windowWidth * 2).height(256).url() ?? ""}
					alt={data()?.name ?? ""}
					width={windowWidth}
					height="128px"
					style={{
						"border-bottom-left-radius": theme.shape.borderRadius + "px",
						"border-bottom-right-radius": theme.shape.borderRadius + "px",
					}}
				/>
			</Show>
			<Container
				sx={{ pb: 2 }}
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
						src={urlFor(data()?.logo).width(256).height(256).url() ?? ""}
						alt={data()?.name ?? ""}
						variant="rounded"
						sx={{
							width: "128px",
							height: "128px",
							marginTop: "-64px",
						}}
					/>
				</Show>
				<Stack>
					<Typography variant="h4" component="h1">
						{data()?.name}
					</Typography>
					<Show when={data()?.type}>
						<Chip
							sx={{
								alignSelf: "start",
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
							component="a"
							href={getMapsURL(data()?.location?.plus || "")}
							target="_blank"
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
							component="a"
							href={data()?.contact?.website}
							target="_blank"
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
							<IconButton
								component="a"
								href={data()?.contact?.facebook}
								target="_blank"
							>
								<SvgIcon>
									<FacebookSvg />
								</SvgIcon>
							</IconButton>
						</Show>
						<Show when={data()?.contact?.instagram}>
							<IconButton
								component="a"
								href={data()?.contact?.instagram}
								target="_blank"
							>
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
					<Box
						displayRaw="flex"
						flexDirection="row"
						gap={1}
					>
						<Show when={data()?.pricesLink}>
							<Chip
								label="Vezi lista de preturi"
								component="a"
								target="_blank"
								color="secondary"
								clickable
								icon={<ListIcon />}
								href={data()?.pricesLink}
							/>
						</Show>
						<Show when={data()?.prices}>
							<Chip 
								label={`Preturi: ${data()?.prices}`}
								variant="outlined"
							/>
						</Show>
					</Box>
					<Show when={data()?.location}>
						<MapsCard 
							address={data()?.location?.address!}
							plusCode={data()?.location?.plus!}
							streetViewLocation={data()?.location?.locationStreetview!}
						/>
					</Show>
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
							<ListItemButton 
								component="a"
								href={`mailto:${data()?.contact?.email}`} 
								target="_blank"
							>
								<ListItemIcon>
									<EmailIcon />
								</ListItemIcon>
								<ListItemText 
									primary="Email"
									secondary={data()?.contact?.email}
								/>
							</ListItemButton>
						</Show>
						<Show when={data()?.contact?.phone}>
							<ListItemButton
								component="a"
								href={`tel:${data()?.contact?.phone}`}
							>
								<ListItemIcon>
									<PhoneIcon />
								</ListItemIcon>
								<ListItemText 
									primary="Phone"
									secondary={data()?.contact?.phone}
								/>
							</ListItemButton>
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

	return data;
}

export function BusinessGetData({ params, navigate }: RouteDataFuncArgs) {
	const [data] = createResource(() => params.id, fetcher);
	
	createEffect(() => {
		if (data() === null) {
			navigate("/businesses", { replace: true })
		}
	})

	return data;
}
