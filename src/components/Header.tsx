import {AppBar, Container, IconButton, Paper, Toolbar, Typography, Fade, useTheme} from "@suid/material";
import BackIcon from "@suid/icons-material/ArrowBack";
import BackIosIcon from "@suid/icons-material/ArrowBackIosNew";
import {createScrollTrigger} from "../hooks/useScrollTrigger";
import {isIos} from "../lib/device";
import {Meta, Title} from "@solidjs/meta";
import {OverridableComponent} from "@suid/material/OverridableComponent";
import {SvgIconTypeMap} from "@suid/material/SvgIcon";
import {For, Show} from "solid-js";
import {A} from "@solidjs/router";

interface HeaderProps {
	title: string;
	back?: boolean;
	noNav?: boolean;
	noHeading?: boolean;
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
			<Meta name="theme-color" content={props.themeColor ? triggered() ? theme.palette.background.paper : props.themeColor : theme.palette.background.paper} />
			<Show when={!props.noNav}>
				<AppBar
					position="fixed"
					color="transparent"
					elevation={0}
					sx={{
						paddingTop: "env(safe-area-inset-top)",
						backgroundColor: theme => 
							props.noHeading ? 
								triggered() ? 
									`${theme.palette.background.paper}${triggered() && isIos() ? "cc" : ""}` 
									:
									"transparent" 
								:
								`${theme.palette.background.paper}${triggered() && isIos() ? "cc" : ""}`,
						backdropFilter: triggered() ? "blur(16px)" : undefined,
						WebkitBackdropFilter: triggered() ? "blur(16px)" : undefined,
					}}
				>
					<Toolbar
						sx={{
							backgroundColor: "transparent",
							overflow: "hidden",
						}}
						>
						<Show when={props.back}>
							<IconButton
								edge="start"
								onClick={() => window.history.back()}
								sx={{ marginRight: isIos() ? 0 : 2 }}
							>
								{isIos() ?
									<BackIosIcon/>
									:
									<BackIcon />
								}
							</IconButton>
						</Show>
						<Fade in={triggered()} appear={false}>
							<Typography
								variant="h6"
								fontWeight="initial"
								component="div"
								sx={{ flexGrow: 1 }}
								>
								{props.title}
							</Typography>
						</Fade>
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
				<Show when={!props.noHeading}>
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
				</Show>
			</Show>
		</>
	)
}
