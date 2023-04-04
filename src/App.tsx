import {Avatar, Button, CssBaseline, ListItem, ListItemAvatar, ListItemText, ThemeProvider} from "@suid/material";
import {lightTheme} from "./lib/theme";
import { sanityClient, urlFor } from "./lib/sanity";
import {createResource, For} from "solid-js";


const fetcher = async () => {
	const data = await sanityClient.fetch(`*[_type == "business"]{name, logo, description}`)

	return data
}

export default function App() {
	const [data] = createResource(fetcher);

	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<Button
				variant="contained"
			>
				Button
			</Button>
			<For each={data()}>
				{item => 
					<ListItem>
						<ListItemAvatar>
							<Avatar
								src={urlFor(item.logo).width(48).height(48).url()}
							/>
						</ListItemAvatar>
						<ListItemText primary={item.name} secondary={item.description} secondaryTypographyProps={{ noWrap: true }}/>
					</ListItem>
				}
			</For>
		</ThemeProvider>
	)
}
