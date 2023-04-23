import { A, RouteDataFuncArgs, useRouteData, useSearchParams } from "@solidjs/router";
import {Avatar, Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Link, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Typography} from "@suid/material";
import {createResource, createSignal, For, Show} from "solid-js";
import Header from "../../components/Header";
import Searchbox from "../../components/Searchbox";
import {sanityClient, urlFor} from "../../lib/sanity";
import { businessTypes } from "../../lib/businessTypes";
import { Business } from "../../types/SanitySchema";
import { debounce } from "@solid-primitives/scheduled";


import AddBusinessIcon from "@suid/icons-material/AddBusiness";

export default function Businesses() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filterByTypes, setFilterByTypes] = createSignal<string[]>([]);
	const [addDialog, setAddDialog] = createSignal(false);
	const [search, setSearch] = createSignal<string>("");
	const data = useRouteData<typeof BusinessesGetData>();

	const toggleFilter = (type: string) => {
		const types = filterByTypes();

		if (types.includes(type)) {
			setFilterByTypes(types.filter((t) => t !== type));
			setSearchParams({ filter: types.filter((t) => t !== type).join(",") }, { replace: true });
		} else {
			setFilterByTypes([...types, type]);
			setSearchParams({ filter: [...types, type].join(",") }, { replace: true });
		}
	}

	const debounceSearch = debounce((input: string) => {
		setSearchParams({ search: input }, { replace: true });
	}, 500)

	return (
		<>
			<Header 
				title="Afaceri locale"
				back
				actions={[
					{
						icon: AddBusinessIcon,
						onClick: () => setAddDialog(true),
					}
				]}
			/>
			<Container
				sx={{ pb: 2 }}
			>
				<Stack>
					<Searchbox
						defaultValue={searchParams.search}
						value={search()}
						onChange={(value) => {
							setSearch(value);
							debounceSearch(value);
						}}
					/>
					
					<Box
						sx={{
							display: "flex",
							gap: 1,
							flexDirection: "row",
							overflowX: "auto",
						}}
					>
						<For 
							each={
								Array.from(businessTypes, ([id, value]) => ({ id, ...value}))
									// order by filterByTypes
									.sort((a, b) => {
										const types = filterByTypes();
										
										if (!types) return 0;
										
										const aIndex = types.indexOf(a.id);
										const bIndex = types.indexOf(b.id);

										if (aIndex === -1 && bIndex === -1) return 0;
										if (aIndex === -1) return 1;
										if (bIndex === -1) return -1;
										
										return aIndex - bIndex;
									})
							}
						>
							{(businessType) => (
								<Chip
									label={businessType.name}
									icon={<businessType.icon/>}
									variant={filterByTypes()?.includes(businessType.id) ? "filled" : "outlined"}
									color="secondary"
									clickable
									onClick={() => toggleFilter(businessType.id)}
								/>
							)}
						</For>
					</Box>


					<Paper>
						<Show when={data()?.length === 0}>
							<Typography textAlign="center" pt={2}>
								Fara rezultate
							</Typography>
						</Show>
						<Show when={data() === undefined}>
							<Typography textAlign="center" pt={2}>
								Se incarca...
							</Typography>
						</Show>
						<Show when={data() === null}>
							<Typography textAlign="center" pt={2}>
								A aparut o eroare
							</Typography>
						</Show>
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
				<Dialog
					open={addDialog()}
					onClose={() => setAddDialog(false)}
				>
					<DialogTitle>
						Adaugare afacere
					</DialogTitle>
					<DialogContent>
						<Typography>
							Pentru adaugarea unei afaceri, va rugam sa ne contactati
							pe email la <Link href="mailto:afacere@ciorogarlaunita.eu.org" target="_blank"><strong>afacere@ciorogarlaunita.eu.org</strong></Link>
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
			</Container>
		</>
	);
}


const fetcher = async ({search, types} : { search: string, types: string[] }) => {
	const groqQuery = `
		*[_type == "business" 
			${types.length ? `&& type in ${JSON.stringify(types)}` : ""}
			${search ? `&& name match "*${search}*"` : ""}
		] { slug, name, description, logo, isSponsor } | order(isSponsor desc)
	`

	const res = await sanityClient.fetch<Business[]>(groqQuery)
		.catch(() => null);

	return res;
}

export function BusinessesGetData({ location }: RouteDataFuncArgs) {
	const [data] = createResource(() => ({
		search: location.query?.search || "",
		types: location.query?.filter ? location.query.filter.split(",") : []
	}), fetcher); 

	return data;
}
