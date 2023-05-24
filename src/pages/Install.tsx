import {Alert, Button, Container, Link, Stack, SvgIcon, Typography} from "@suid/material";
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
import HuaweiIcon from "../resources/icons/huawei.svg?component-solid";
import {APPGALLERY, GOOGLE_PLAY, PAQUET} from "../lib/links";

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
					<Show when={deviceVendor !== "Apple"}>
						<Alert severity="info">
							Recomandăm instalarea aplicației prin magazinele de aplicații.
							Dacă asta nu este posibil, vă recomandăm instalarea prin Chrome.
						</Alert>
					</Show>
					<Typography color="textSecondary">
						<InfoIcon fontSize="inherit"/>{" "}
						Am detectat că folosești un
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
						Instrucțiuni
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
					<Button
						component="a"
						href={GOOGLE_PLAY}
						target="_blank"
						startIcon={<SvgIcon><PlayIcon/></SvgIcon>}
					>
						Descarcă pe Google Play
					</Button>
					<Button
						component="a"
						href={APPGALLERY}
						target="_blank"
						startIcon={<SvgIcon><HuaweiIcon/></SvgIcon>}
					>
						Descarcă pe AppGallery
					</Button>
					<Button
						startIcon={<SvgIcon><PaquetIcon/></SvgIcon>}
						variant="outlined"
						component="a"
						href={PAQUET}
						target="_blank"
					>
						Deschide pe Paquet
					</Button>
				</Stack>
			</Container>
		</>
	)
}

function IosInstructionsSafari() {
	return (
		<ol> 
			<li>Apasă pe butonul <IosShareIcon fontSize="inherit"/> din partea de jos a ecranului.</li> 
			<li>Alege "Adaugă pe ecranul principal".</li> 
			<li>Apasă pe butonul "Adaugă".</li> 
		</ol>
	)
}

function IosInstructionsNotSafari() {
	return (
		<ol>
			<li>Deschide <Link href="https://ciorogarlaunita.web.app">ciorogarlaunita.web.app</Link> in Safari.</li>
			<li>Apasa pe butonul <IosShareIcon fontSize="inherit"/> din partea de jos a ecranului.</li>
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
