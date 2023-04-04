import {CardActionArea, CardContent, Container, Stack, Typography} from "@suid/material";
import GrassIcon from "@suid/icons-material/Grass";
import PeopleIcon from "@suid/icons-material/People";
import CardWithIcon from "../components/CardWithIcon";
import Header from "../components/Header";

export default function Home() {
	return (
		<>
			<Header>
				Acasa
			</Header>
			<Container>
				<Stack>
					<CardWithIcon cardIcon={GrassIcon}>
						<CardContent>
							<Typography variant="h4">
								Lista de afaceri
							</Typography>
							<Typography variant="body1">
								Aici gasiti o lista cu afaceri
								din Ciorogarla.
							</Typography>
						</CardContent>
					</CardWithIcon>
					<CardWithIcon cardIcon={PeopleIcon}>
						<CardActionArea>
							<CardContent>
								<Typography variant="h4">
									Card cu iconita
								</Typography>
								<Typography variant="body1">
									Card cu iconita
								</Typography>
							</CardContent>
						</CardActionArea>
					</CardWithIcon>
				</Stack>
			</Container>
		</>
	)
}
