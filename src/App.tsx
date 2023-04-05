import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@suid/material";
import { darkTheme, lightTheme, commonTheme } from "./lib/theme";
import {useRoutes} from "@solidjs/router";
import {routes} from "./pages/routes";
import {createMemo, Suspense} from "solid-js";
import {createPalette, Palette} from "@suid/material/styles/createPalette";
import Header from "./components/Header";


export default function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const Routes = useRoutes(routes);

	const palette = createMemo(() => createPalette(prefersDarkMode() ? darkTheme.palette as Palette : lightTheme.palette as Palette));

	const theme = createTheme({...commonTheme, palette});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme/>
			<Suspense fallback={<Header noNav title="Se incarca..." />}>
				<Routes />
			</Suspense>
		</ThemeProvider>
	)
}
