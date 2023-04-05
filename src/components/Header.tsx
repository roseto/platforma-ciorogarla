import {AppBar, Container, Slide, IconButton, Paper, Toolbar, Typography, Fade, useTheme} from "@suid/material";
import BackIcon from "@suid/icons-material/ArrowBack";
import {createScrollTrigger} from "../hooks/useScrollTrigger";
import {isIos} from "../lib/device";
import {Meta, Title} from "@solidjs/meta";
import {OverridableComponent} from "@suid/material/OverridableComponent";
import {SvgIconTypeMap} from "@suid/material/SvgIcon";
import {For} from "solid-js";
import {A} from "@solidjs/router";

interface HeaderProps {
	title: string;
	back?: boolean;
	noNav?: boolean;
	themeColor?: string;
	actions?: {
		path: string;
		icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
	}[],
}

export default function Header(props: HeaderProps) {
	const theme = useTheme();
	const triggered = createScrollTrigger(56);

	return (
		<>
			<Title>{props.title} &middot; Ciorogârla Unită</Title>
			<Meta name="theme-color" content={props.themeColor ?? theme.palette.background.paper} />
			{!props.noNav && 
				<>
					<AppBar
						position="fixed"
						color="transparent"
						elevation={triggered() ? 8 : 0}
						sx={{
							paddingTop: "env(safe-area-inset-top)",
							backgroundColor: theme => `${theme.palette.background.paper}${triggered() && isIos() ? "cc" : ""}`,
							backdropFilter: "blur(16px)",
							WebkitBackdropFilter: "blur(16px)",
						}}
					>
						<Toolbar
							sx={{
								backgroundColor: "transparent",
								overflow: "hidden",
							}}
							>
							{props.back &&
								<IconButton
									edge="start"
									onClick={() => window.history.back()}
								>
									<BackIcon />
								</IconButton>
							}
							<Slide in={triggered()} direction="up" appear={false}>
								<Typography
									variant="h6"
									fontWeight="initial"
									component="div"
									sx={{ flexGrow: 1 }}
									>
									{props.title}
								</Typography>
							</Slide>
							<For each={props.actions}>
								{(action) => (
									<IconButton
										edge="end"
										component={A}
										href={action.path}
									>
										<action.icon />
									</IconButton>
								)}
							</For>
						</Toolbar>
					</AppBar>
					<Paper
						sx={{
							paddingTop: "calc(env(safe-area-inset-top) + 56px)",
							borderRadius: 0,
							marginBottom: 2,
							overflow: "hidden",
						}}
					>
						<Container>
							<Fade in={!triggered()} appear={false}>
								<Typography
									variant="h1"
									>
									{props.title}
								</Typography>
							</Fade>
						</Container>
					</Paper>
				</>
			}
		</>
	)
}
