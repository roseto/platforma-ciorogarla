<script lang="ts">
	import { goto } from "$app/navigation";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Alert from "$lib/components/Alert.svelte";
	import { isInstalled } from "$lib/utils/device";
	import { onMount } from "svelte";
	import { UAParser } from "ua-parser-js";
	import { browser } from "$app/environment";
	import { installPromptEvent } from "$lib/utils/a2hs";
	import Button from "$lib/components/Button.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import InstallInstructions from "./InstallInstructions.svelte";
	import GooglePlayIcon from "$lib/resources/icons/play.svelte";
	import AppGalleryIcon from "$lib/resources/icons/huawei.svelte";
	import PaquetIcon from "$lib/resources/icons/paquet.svelte";

	onMount(() => {
		if (isInstalled()) {
			goto("/");
		}
	});

	const parser = new UAParser();
	const deviceVendor = parser.getDevice().vendor;
	const deviceModel = parser.getDevice().model;
	const deviceOs = parser.getOS().name;
	const browserName = parser.getBrowser().name;
	const mobile = parser.getDevice().type === "mobile";
</script>

<Header title="Instalare" back />

<Container>
	<Stack>
		{#if browser}
			<Alert icon="info" outline>
				Am detectat ca folosesti un
				{deviceVendor ? " " + deviceVendor : ""}
				{deviceModel ? deviceModel : "dispozitiv" + (mobile ? " mobil" : "")}
				{browserName ? " cu " + browserName : ""}
			</Alert>
		{/if}

		{#if $installPromptEvent}
			<Button icon="download" on:click={() => $installPromptEvent?.prompt()} fullWidth>
				Instalare
			</Button>

			<div class="divider">sau</div>
		{/if}

		<InstallInstructions {deviceVendor} {deviceModel} {deviceOs} {browserName} {mobile} />

		<a href="https://play.google.com/store/apps/details?id=org.eu.ciorogarlaunita.app">
			<Button fullWidth outline>
				<div class="w-4 h-4 fill-current">
					<GooglePlayIcon />
				</div>
				Descarca pe Google Play
			</Button>
		</a>
		<a href="https://appgallery.huawei.com/app/C108094061">
			<Button fullWidth outline>
				<div class="w-4 h-4 fill-current">
					<AppGalleryIcon />
				</div>
				Descarca pe AppGallery
			</Button>
		</a>
		<a href="https://paquet.app/app/013c536e-4a2d-4bce-90fd-c33c954bdc04">
			<Button fullWidth outline>
				<div class="w-4 h-4 fill-current">
					<PaquetIcon />
				</div>
				Deschide pe Paquet
			</Button>
		</a>
	</Stack>
</Container>
