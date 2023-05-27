import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@suid/material";
import { darkTheme, lightTheme, commonTheme } from "./lib/theme";
import {useRoutes} from "@solidjs/router";
import {routes} from "./pages/routes";
import {createMemo, Show, Suspense} from "solid-js";
import {createPalette, Palette} from "@suid/material/styles/createPalette";
import Header from "./components/Header";
import {useA2HS} from "./hooks/useA2HS";
import WelcomeDialog from "./components/WelcomeDialog";
import {BUSINESS_STANDALONE_MODE} from "./pages/Businesses/Business";
import {useAnalyticsState} from "./lib/store";
import { DEV } from "./lib/dev";


export default function App() {
	const analyticsState = useAnalyticsState();
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
			<Show when={!DEV && analyticsState.state}>
				<script async src="https://umami.ciorogarlaunita.eu.org/script.js" data-website-id="40d9680c-e1f1-40f4-85fe-e54a9b82cc40"></script>
			</Show>
		</ThemeProvider>
	)
}
