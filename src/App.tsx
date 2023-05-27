import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@suid/material";
import { darkTheme, lightTheme, commonTheme } from "./lib/theme";
import {useRoutes} from "@solidjs/router";
import {routes} from "./pages/routes";
import {createEffect, createMemo, Show, Suspense} from "solid-js";
import {createPalette, Palette} from "@suid/material/styles/createPalette";
import Header from "./components/Header";
import {useA2HS} from "./hooks/useA2HS";
import WelcomeDialog from "./components/WelcomeDialog";
import {BUSINESS_STANDALONE_MODE} from "./pages/Businesses/Business";
import {useAnalyticsState} from "./lib/store";
import {setAnalytics} from "./lib/umami";


export default function App() {
	const analyticsState = useAnalyticsState();
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const Routes = useRoutes(routes);
	const palette = createMemo(() => createPalette(prefersDarkMode() ? darkTheme.palette as Palette : lightTheme.palette as Palette));
	// We use this hook to make sure that the prompt event is being hooked into the app
	useA2HS();

	const theme = createTheme({...commonTheme, palette});

	createEffect(() => {
		setAnalytics(analyticsState.state);
	})

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
