/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, version, files } from "$service-worker";

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = `cache-${version}`;

const ASSETS = [...build, ...files];

sw.addEventListener("install", (event) => {
	const addFilesToCache = async () => {
		const cache = await caches.open(CACHE_NAME);
		await cache.addAll(ASSETS);
	};

	event.waitUntil(addFilesToCache());
});

sw.addEventListener("activate", (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE_NAME) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	// Stale while revalidate
	const respond = async () => {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE_NAME);

		if (ASSETS.includes(url.pathname)) {
			return cache.match(event.request).then((response) => response || fetch(event.request));
		}

		const response = await cache.match(event.request);

		if (response) {
			event.waitUntil(cache.add(event.request));
			return response;
		}

		return fetch(event.request);
	};

	event.respondWith(respond());
});
