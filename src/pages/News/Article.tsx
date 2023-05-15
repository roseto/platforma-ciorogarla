import {RouteDataFuncArgs, useRouteData} from "@solidjs/router";
import Markdown from "solid-markdown";
import {createResource, For, Show} from "solid-js";
import Header from "../../components/Header";
import {sanityClient} from "../../lib/sanity";
import {News} from "../../types/SanitySchema";
import {Chip, Container} from "@suid/material";

export default function Article() {
	const data = useRouteData<typeof ArticleGetData>();

	return (
		<>
			<Header
				title={data()?.title ?? "Articol"}
				back
			/>
			<Container>
				<For each={data()?.tags}>
					{(tag) => (
						<Chip label={`#${tag}`} size="small" variant="outlined" sx={{ mr: .5 }} />
					)}
				</For>
				<Show when={data()?.content}>
					<Markdown children={data()?.content} />
				</Show>
			</Container>
		</>
	)
}

const fetcher = async (id: string) => {
	const data = await sanityClient.fetch<News>(`*[_type == "news" && slug.current == $slug][0]`, { slug: id })

	return data;
}

export function ArticleGetData({ params }: RouteDataFuncArgs) {
	const [news] = createResource(() => params.id, fetcher);

	return news
}
