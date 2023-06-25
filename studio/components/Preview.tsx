import { Card, Text } from '@sanity/ui';
import React from 'react';

export default function PostsPreview(props: any) {
	if (!props.document.displayed.slug) {
		return (
			<Card tone="primary" margin={5} padding={6}>
				<Text align="center">Please add a slug to the post to see the preview!</Text>
			</Card>
		);
	}

	return (
		<iframe
			style={{
				width: '100%',
				height: '99%',
				margin: "0px",
				padding: "0px",
				border: "none",
				outline: "none",
			}}
			src={getUrl(props)}
		/>
	);
}

function getUrl({ document }: { document: any }) {
	const url = new URL('https://ciorogarla.eu.org/api/preview');
	const token = process.env.SANITY_STUDIO_PREVIEW_TOKEN;

	if (!token) {
		console.error('SANITY_STUDIO_PREVIEW_TOKEN is not set');
		return '';
	}

	url.searchParams.set('token', token);
	url.searchParams.set('slug', document.displayed.slug.current);
	url.searchParams.set('type', document.displayed._type);
	url.searchParams.set('id', document.displayed._id);
	url.searchParams.set('random', Math.random().toString(36).substring(7));

	return url.toString();
}
