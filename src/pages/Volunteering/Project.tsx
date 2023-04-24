import {RouteDataFuncArgs, useRouteData} from "@solidjs/router";
import {Avatar, Button, Card, CardContent, Chip, Container, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography, useTheme} from "@suid/material";
import {createEffect, createResource, Show} from "solid-js";
import Header from "../../components/Header";
import {sanityClient, urlFor} from "../../lib/sanity";
import {Country, Organisation, VolunteeringProject} from "../../types/SanitySchema";

import InfoIcon from "@suid/icons-material/Info";
import InfoPackIcon from "@suid/icons-material/Feed";
import MapsCard from "../../components/MapsCard";

export default function Project() {
	const data = useRouteData<typeof VolunteeringProjectGetData>();
	const theme = useTheme();
	const windowWidth = window.innerWidth;

	return (
		<>
			<Header
				title={data()?.name ?? "Proiect"}
				back
				noHeading
				//@ts-ignore: Metadata is there but not specified
				themeColor={data()?.image?.asset?.metadata?.palette?.dominant.background}
				//@ts-ignore: Metadata is there but not specified
				color={data()?.image?.asset?.metadata?.palette?.dominant.title}
			/>
			<Show when={data()?.image}>
				<img
					src={urlFor(data()?.image).width(windowWidth * 2).height(256).url()}
					width={windowWidth}
					height="128px"
					style={{
						"border-bottom-left-radius": theme.shape.borderRadius + "px",
						"border-bottom-right-radius": theme.shape.borderRadius + "px",
					}}
				/>
			</Show>
			<Container>
				<Stack>
					<Typography variant="h3">
						{data()?.name}
					</Typography>
					<Typography color="textSecondary">
						{data()?.topic}
					</Typography>
					<Typography>
						{data()?.description}
					</Typography>
					<Chip
						label={(data()?.country as unknown as Country)?.name}
						sx={{ alignSelf: "start" }}
					/>
					<Card>
						<CardContent>
							<Typography>
								Made possible by
							</Typography>
							<Show when={data()?.organisation}>
								<Button
									component="a"
									href={(data()?.organisation as unknown as Organisation).link}
									target="_blank"
									startIcon={
										<Avatar
											src={urlFor((data()?.organisation as unknown as Organisation).logo).width(64).height(64).url()}
											sx={{ width: 24, height: 24 }}
										/>
									}
									variant="outlined"
									size="small"
									sx={{ borderRadius: "4rem" }}
								>
									{(data()?.organisation as unknown as Organisation).name}
								</Button>
							</Show>
						</CardContent>
					</Card>
					<MapsCard
						address={data()?.location?.address || ""}
						plusCode={data()?.location?.plus || ""}
						streetViewLocation={data()?.location?.locationStreetview || ""}
					/>
					<ListItemButton
						component="a"
						//@ts-ignore: URL added manually
						href={data()?.infopack?.asset.url}
						target="_blank"
					>
						<ListItemAvatar>
							<Avatar sx={{ backgroundColor: "primary.main" }}>
								<InfoPackIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Info Pack"
							secondary="Descarca informatiile despre acest proiect"
						/>
					</ListItemButton>
					<Typography color="textSecondary" variant="body2">
						<InfoIcon fontSize="inherit"/>{" "}
						Nu putem urmari disponibilitatea locurilor libere pentru acest proiect, 
						asa ca te rugam sa contactezi organizatorul pentru a afla mai multe.
					</Typography>
				</Stack>
			</Container>
		</>
	)
}


const fetcher = async (id: string) => {
	const data = await sanityClient.fetch<VolunteeringProject>(`*[_type == "volunteeringProject" && slug.current == $slug][0]
			{ ..., 
			image {
				..., 
				asset -> {..., metadata}
			},
			infopack {
				..., 
				asset->{...,url}
			},
			organisation->{...}, 
			country->{...}
		}`, { slug: id })
		.catch(() => null);

	return data;
}

export function VolunteeringProjectGetData({ params, navigate }: RouteDataFuncArgs) {
	const [data] = createResource(() => params.id, fetcher);
	
	createEffect(() => {
		if (data() === null) {
			navigate("/volunteering", { replace: true })
		}
	})

	return data;
}
