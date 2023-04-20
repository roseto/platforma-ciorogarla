import {RouteDataFuncArgs, useRouteData} from "@solidjs/router";
import {Avatar, Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@suid/material";
import {createEffect, createResource, Show} from "solid-js";
import Header from "../../components/Header";
import {sanityClient, urlFor} from "../../lib/sanity"
import {Organisation, VolunteeringProject} from "../../types/SanitySchema"

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
				</Stack>
			</Container>
		</>
	)
}


const fetcher = async (id: string) => {
	const data = await sanityClient.fetch<VolunteeringProject>(`*[_type == "volunteeringProject" && slug.current == $slug][0] { ..., image {..., asset -> {..., metadata}}, organisation->{...}}`, { slug: id })
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
