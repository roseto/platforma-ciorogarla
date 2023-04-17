import {Button, Container, Link, Stack, SvgIcon, Typography} from "@suid/material";
import Header from "../components/Header";
import {isInstalled, parser} from "../lib/device";
import {Match, Show, Switch} from "solid-js";
import {useNavigate} from "@solidjs/router";
import {useA2HS} from "../hooks/useA2HS";

import InfoIcon from "@suid/icons-material/Info";
import IosShareIcon from "@suid/icons-material/IosShare";
import MoreVertIcon from "@suid/icons-material/MoreVert"
import InstallIcon from "@suid/icons-material/InstallMobile";
import PaquetIcon from "../resources/icons/paquet.svg?component-solid";
import PlayIcon from "../resources/icons/play.svg?component-solid";
import AppStoreIcon from "../resources/icons/app-store.svg?component-solid";

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
							{/*<Button
								startIcon={<SvgIcon><AppStoreIcon/></SvgIcon>}
							>
								Descarca pe App Store
							</Button>*/}
						</Match>
						<Match when={deviceVendor === "Apple" && browserName !== "Mobile Safari"}>
							<IosInstructionsNotSafari/>
							{/* <Button
								startIcon={<SvgIcon><AppStoreIcon/></SvgIcon>}
							>
								Descarca pe App Store
							</Button> */}
						</Match>
						<Match when={deviceOs === "Android"}>
							<AndroidInstructions/>
							<Button
								component="a"
								href="https://play.google.com/store/apps/details?id=org.eu.ciorogarlaunita.app"
								target="_blank"
								startIcon={<SvgIcon><PlayIcon/></SvgIcon>}
							>
								Descarca pe Google Play
							</Button>
						</Match>
						<Match when={!parser.getDevice().type}>
							<DesktopInstructions/>
						</Match>
					</Switch>
					<Button
						startIcon={<SvgIcon><PaquetIcon/></SvgIcon>}
						variant="outlined"
						component="a"
						href="https://paquet.shop/app/013c536e-4a2d-4bce-90fd-c33c954bdc04"
						target="_blank"
					>
						Descarca pe Paquet
					</Button>
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
