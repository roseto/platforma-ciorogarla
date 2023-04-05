import { useRouteData } from "@solidjs/router";
import {Avatar, Container, List, ListItem, ListItemAvatar, ListItemText} from "@suid/material";
import {createResource, For} from "solid-js";
import Header from "../../components/Header";
import {sanityClient, urlFor} from "../../lib/sanity";
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
				<List disablePadding>
					<For each={data()}>
						{(business) => (
							<ListItem>
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
							</ListItem>
						)}
					</For>
				</List>
			</Container>
		</>
	);
}


const fetcher = async () => {
	const res = await sanityClient.fetch(`*[_type == "business"] { slug, name, description, logo }`);

	return res;
}

export function BusinessesGetData() {
	const [data] = createResource<Business[]>(fetcher);

	return data;
}
