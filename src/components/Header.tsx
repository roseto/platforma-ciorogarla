import {AppBar, Container, IconButton, Paper, Toolbar, Typography, Fade, useTheme} from "@suid/material";
import BackIcon from "@suid/icons-material/ArrowBack";
import BackIosIcon from "@suid/icons-material/ArrowBackIosNew";
import {createScrollTrigger} from "../hooks/useScrollTrigger";
import {isIos} from "../lib/device";
import {Meta, Title, Link} from "@solidjs/meta";
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
	color?: string;
	favicon?: string;
	actions?: {
		path?: string;
		onClick?: () => void;
		icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
	}[],
}

export default function Header(props: HeaderProps) {
	const theme = useTheme();
	const triggered = createScrollTrigger(56);

	return (
		<>
			<Title>{props.title}</Title>
			<Link rel="shortcut icon" type="image/ico" href={props?.favicon || "/favicon.ico"} />
			<Meta name="theme-color" content={props.themeColor ? triggered() ? theme.palette.background.default : props.themeColor : theme.palette.background.default} />
			<Show when={!props.noNav}>
				<AppBar
					position="fixed"
					color="transparent"
					elevation={triggered() ? 4 : 0}
					sx={{
						paddingTop: "env(safe-area-inset-top)",
						backgroundColor: theme => 
								triggered() ? 
									`${theme.palette.background.default}${triggered() && isIos() ? "cc" : ""}` 
									:
									"transparent",
						backdropFilter: triggered() && isIos() ? "blur(16px)" : undefined,
						WebkitBackdropFilter: triggered() && isIos() ? "blur(16px)" : undefined,
						transition: "background-color 0.2s ease-in-out",
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
									<BackIosIcon sx={{ color: triggered() ? "inherit" : props.color ?? "inherit" }}/>
									:
									<BackIcon sx={{ color: triggered() ? "inherit" : props.color ?? "inherit" }}/>
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
									component={action.path ? A : "button"}
									href={action.path}
									onClick={action.onClick}
								>
									<action.icon sx={{ color: triggered() ? "inherit" : props.color ?? "inherit" }}/>
								</IconButton>
							)}
						</For>
					</Toolbar>
				</AppBar>
				<Show when={!props.noHeading}>
					<Paper
						elevation={0}
						sx={{
							backgroundColor: "transparent",
							paddingTop: "calc(env(safe-area-inset-top) + 56px)",
							borderRadius: 0,
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
