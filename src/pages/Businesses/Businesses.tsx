import { A, useRouteData } from "@solidjs/router";
import {Avatar, Box, Chip, Container, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack} from "@suid/material";
import {createResource, For} from "solid-js";
import Header from "../../components/Header";
import Searchbox from "../../components/Searchbox";
import {sanityClient, urlFor} from "../../lib/sanity";
import { businessTypes } from "../../lib/businessTypes";
import { Business } from "../../types/SanitySchema";


export default function Businesses() {
	const data = useRouteData<typeof BusinessesGetData>();

	return (
		<>
			<Header 
				title="Afaceri locale"
				back
			/>
			<Container>
				<Stack>
					<Searchbox/>
					
					<Box
						sx={{
							display: "flex",
							gap: 1,
							flexDirection: "row",
							overflowX: "auto",
						}}
					>
						<For each={Array.from(businessTypes, ([_, value]) => value)}>
							{(businessType) => (
								<Chip
									label={businessType.name}
									icon={<businessType.icon/>}
									variant="outlined"
									color="secondary"
								/>
							)}
						</For>
					</Box>


					<Paper>
						<List>
							<For each={data()}>
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
						</List>
					</Paper>
				</Stack>
			</Container>
		</>
	);
}


const fetcher = async () => {
	const res = await sanityClient.fetch(`*[_type == "business"] { slug, name, description, logo, isSponsor } | order(isSponsor desc)`)
		.catch(() => null);

	return res;
}

export function BusinessesGetData() {
	const [data] = createResource<Business[]>(fetcher);

	return data;
}
