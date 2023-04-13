import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@suid/material";
import { darkTheme, lightTheme, commonTheme } from "./lib/theme";
import {useIsRouting, useLocation, useRoutes} from "@solidjs/router";
import {routes} from "./pages/routes";
import {createEffect, createMemo, Suspense} from "solid-js";
import {createPalette, Palette} from "@suid/material/styles/createPalette";
import Header from "./components/Header";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {Analytics, logEvent} from "firebase/analytics";
import {getPerformance} from "firebase/performance";
import {getAuth} from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {useA2HS} from "./hooks/useA2HS";
import {useAnalytics} from "./hooks/useAnalytics";


export default function App() {
	const app = useFirebaseApp();
	if (import.meta.env.MODE === "production") {
		getPerformance(app);
	}
	useAuth(getAuth(app));
	const location = useLocation();
	const isRouting = useIsRouting();
	const analytics = useAnalytics();
	initializeAppCheck(app, {
		provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY)
	});
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const Routes = useRoutes(routes);
	const palette = createMemo(() => createPalette(prefersDarkMode() ? darkTheme.palette as Palette : lightTheme.palette as Palette));
	// We use this hook to make sure that the prompt event is being hooked into the app
	useA2HS();

	const theme = createTheme({...commonTheme, palette});

	createEffect(() => {
		if (analytics() && !isRouting()) {
			console.log("Log event");
			logEvent(analytics() as Analytics, "page_view", {
				page_title: document.title,
				page_location: location.pathname,
				page_path: location.pathname,
			})
		}
	})

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme/>
			<Suspense fallback={<Header noNav title="Se incarca..." />}>
				<Routes />
			</Suspense>
		</ThemeProvider>
	)
}
