import {Button, Container, Link, Stack, Typography} from "@suid/material";
import Header from "../components/Header";
import {isInstalled, parser} from "../lib/device";

import InfoIcon from "@suid/icons-material/Info";
import IosShareIcon from "@suid/icons-material/IosShare";
import MoreVertIcon from "@suid/icons-material/MoreVert"
import InstallIcon from "@suid/icons-material/InstallMobile";
import {Match, Show, Switch} from "solid-js";
import {useNavigate} from "@solidjs/router";
import {useA2HS} from "../hooks/useA2HS";

export default function Install() {
	const deviceVendor = parser.getDevice().vendor;
	const deviceModel = parser.getDevice().model;
	const deviceOs = parser.getOS().name;
	const browserName = parser.getBrowser().name;
	const mobile = parser.getDevice().type === "mobile";
	const navigate = useNavigate();
	const [prompt, install] = useA2HS();

	if (isInstalled()) {
		navigate("/", { replace: true });
	}

	return (
		<>
			<Header
				title="Instalare"
				back
			/>
			<Container>
				<Stack>
					<Typography color="textSecondary">
						<InfoIcon fontSize="inherit"/>{" "}
						
						Am detectat ca folosesti un
						{deviceVendor ? " " + deviceVendor : ""} {deviceModel ? deviceModel : "dispozitiv" + (mobile ? " mobil" : "")}
						{browserName ? " cu " + browserName : ""}.
					</Typography>
					<Show when={prompt()}>
						<Button
							onClick={install}
							startIcon={<InstallIcon />}
						>
							Instalare
						</Button>
					</Show>
					<Typography variant="h5" gutterBottom>
						Instructiuni
					</Typography>
					<Switch>
						<Match when={deviceVendor === "Apple" && browserName === "Mobile Safari"}>
							<IosInstructionsSafari/>
						</Match>
						<Match when={deviceVendor === "Apple" && browserName !== "Mobile Safari"}>
							<IosInstructionsNotSafari/>
						</Match>
						<Match when={deviceOs === "Android"}>
							<AndroidInstructions/>
						</Match>
						<Match when={!parser.getDevice().type}>
							<DesktopInstructions/>
						</Match>
					</Switch>
				</Stack>
			</Container>
		</>
	)
}

function IosInstructionsSafari() {
	return (
		<ol>
			<li>Apasa pe butonul <IosShareIcon fontSize="inherit"/> din partea de sus a ecranului.</li>
			<li>Alege "Adauga pe ecranul principal".</li>
			<li>Apasa pe butonul "Adauga".</li>
		</ol>
	)
}

function IosInstructionsNotSafari() {
	return (
		<ol>
			<li>Deschide <Link href="https://ciorogarlaunita.web.app">ciorogarlaunita.web.app</Link> in Safari.</li>
			<li>Apasa pe butonul <IosShareIcon fontSize="inherit"/> din partea de sus a ecranului.</li>
			<li>Alege "Adauga pe ecranul principal".</li>
			<li>Apasa pe butonul "Adauga".</li>
		</ol>
	)
}

function AndroidInstructions() {
	return (
		<ol>
			<li>Apasa pe butonul <MoreVertIcon fontSize="inherit"/> din partea de sus a ecranului.</li>
			<li>Alege "Adauga pe ecranul principal".</li>
			<li>Apasa pe butonul "Adauga".</li>
		</ol>
	)
}

function DesktopInstructions() {
	return (
		<ol>
			<li>Apasa pe butonul <MoreVertIcon fontSize="inherit"/> din partea de sus a ecranului.</li>
			<li>Alege "Adauga pe ecranul principal".</li>
			<li>Apasa pe butonul "Adauga".</li>
		</ol>
	)
}
