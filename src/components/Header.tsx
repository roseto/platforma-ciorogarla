import {Container, Paper} from "@suid/material";
import Typography, {TypographyProps} from "@suid/material/Typography";

export default function Header(props: TypographyProps) {
	return (
		<Paper
			sx={{
				borderRadius: 0,
				paddingTop: 8,
				marginBottom: 2,
			}}
		>
			<Container>
				<Typography
					variant="h1"
				>
					{props.children}
				</Typography>
			</Container>
		</Paper>
	)
}
