import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@suid/material";
import { darkTheme, lightTheme, commonTheme } from "./lib/theme";
import {Navigate, Route, useRoutes} from "@solidjs/router";
import {routes} from "./pages/routes";
import {createMemo, Show, Suspense} from "solid-js";
import {createPalette, Palette} from "@suid/material/styles/createPalette";
import Header from "./components/Header";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";
import {useA2HS} from "./hooks/useA2HS";
import {scheduleIdle} from "@solid-primitives/scheduled";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";
import WelcomeDialog from "./components/WelcomeDialog";
import {BUSINESS_STANDALONE_MODE} from "./pages/Businesses/Business";


const backgroundTrigger = scheduleIdle(() => {
	import("./background");
}, 1000);

window.onload = () => {
	backgroundTrigger();
}

export default function App() {
	const app = useFirebaseApp();
	initializeAppCheck(app, {
		provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY)
	});
	useAuth(getAuth(app));
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const Routes = useRoutes(routes);
	const palette = createMemo(() => createPalette(prefersDarkMode() ? darkTheme.palette as Palette : lightTheme.palette as Palette));
	// We use this hook to make sure that the prompt event is being hooked into the app
	useA2HS();

	const theme = createTheme({...commonTheme, palette});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme/>
			<Suspense fallback={<Header noNav title="Se incarca..." />}>
				<Routes />
				<Show when={!BUSINESS_STANDALONE_MODE}>
					<WelcomeDialog />
				</Show>
			</Suspense>
		</ThemeProvider>
	)
}
