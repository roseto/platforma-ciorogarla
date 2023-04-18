import {Button, Container, Dialog, Link, ListItem, ListItemSecondaryAction, ListItemText, Slide, Toolbar, Typography, Switch} from "@suid/material";
import {createSignal, JSXElement} from "solid-js";
import {TransitionProps} from "@suid/material/transitions";
import {useAnalyticsState, useFirstTime} from "../lib/store";


import TermsIcon from "@suid/icons-material/Description";
import AnalyticsIcon from "@suid/icons-material/Analytics";

const Transition = function Transition(
	props: TransitionProps & {
		children: JSXElement;
	}
) {
	return <Slide direction="up" appear={false} {...props} />;
};

export default function WelcomeDialog() {
	const firstTime = useFirstTime();
	const setAnalyticsState = useAnalyticsState(state => state.set);
	const [allowsAnalytics, setAllowsAnalytics] = createSignal(true);
	const [confirmAllowed, setConfirmAllowed] = createSignal(true);

	const handleConfirm = () => {
		setAnalyticsState(allowsAnalytics());
		firstTime.set(false);
	}

	return (
		<Dialog
			open={firstTime.state}
			onClose={() => firstTime.set(false)}
			fullScreen
			TransitionComponent={Transition}
		>
			<Container sx={{ pt: 2, mt: "env(safe-area-inset-top)" }}>
				<Typography
					variant="h1"
					textAlign="center"
					fontSize={96}
					gutterBottom
				>
					👋
				</Typography>
				<Typography gutterBottom>
					Salut! Inainte de a explora Ciorogarla, trebuie sa va informam ca
					folosim date pentru analitica pentru a observa cum folositi aplicatia.
					Aceste date sunt complet anonime si nu sunt legate la dumneavoastra ca persoana in
					nici un fel.
				</Typography>
				<Typography>
					De asemenea trebuie sa fiti de acord cu <Link href="https://ciorogarlaunita.eu.org/privacy-policy" target="_blank">termenii si conditiile noastre</Link>.
				</Typography>
				<ListItem dense>
					<ListItemText
						primary="Aprob termenii si conditiile"
						secondary="Sunt de acord termenii si conditiile"
						sx={{ mr: 8 }}
					/>
					<ListItemSecondaryAction>
						<Switch
							onClick={(e) => e.stopPropagation()}
							edge="end"
							checked={confirmAllowed()}
							onChange={(_, checked) => setConfirmAllowed(checked)}
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem dense>
					<ListItemText
						primary="Permite analitica"
						secondary="Sunt de acord cu folosirea datelor pentru analitica"
						sx={{ mr: 8 }}
					/>
					<ListItemSecondaryAction>
						<Switch
							onClick={(e) => e.stopPropagation()}
							edge="end"
							checked={allowsAnalytics()}
							onChange={(_, checked) => setAllowsAnalytics(checked)}
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<Button
					fullWidth
					disabled={!confirmAllowed()}
					onClick={handleConfirm}
				>
					Confirma
				</Button>
			</Container>
		</Dialog>
	)
}
