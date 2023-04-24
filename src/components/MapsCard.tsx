import {AppBar, Dialog, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, Paper, Skeleton, Slide, Toolbar, Typography, useTheme} from "@suid/material";
import {getMapsEmbedURL, getMapsURL} from "../lib/maps";
import {createSignal, JSXElement} from "solid-js";

import MarkerIcon from "@suid/icons-material/PinDrop";
import StreetViewIcon from "@suid/icons-material/Streetview";
import CloseIcon from "@suid/icons-material/Close";
import {TransitionProps} from "solid-transition-group";


interface MapsCardProps {
	address: string;
	plusCode: string;
	streetViewLocation: string;
}

export default function MapsCard(props: MapsCardProps) {
	const theme = useTheme();
	const url = getMapsURL(props.plusCode);
	const [streetViewDialog, setStreetViewDialog] = createSignal(false);

	return (
		<Paper
			sx={{
				overflow: "hidden",
			}}
			variant="outlined"
		>
			<ListItemButton 
				dense 
				component="a" 
				href={url} 
				target="_blank"
			>
				<ListItemIcon sx={{ minWidth: 32 }}>
					<MarkerIcon />
				</ListItemIcon>
				<ListItemText
					secondary={props.address}
				/>
			</ListItemButton>
			<Divider variant="middle" />
			<ListItemButton
				onClick={() => setStreetViewDialog(true)}
			>
				<ListItemIcon sx={{ minWidth: 32 }}>
					<StreetViewIcon />
				</ListItemIcon>
				<ListItemText
					primary="Vedere in Street View"
				/>
			</ListItemButton>
			<div
				style={{
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Skeleton
					variant="rectangular"
					width="100%"
					height="256px"
					style={{
						"border-radius": theme.shape.borderRadius + "px",
					}}
				/>
				{/* We use object instead of iframe because the url 
				changes and iframe registers the changes in the history */}
				<object
					type="text/html"
					data={getMapsEmbedURL("place", props.plusCode)}
					width="100%"
					height="256px"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						border: 0,
						"border-radius": theme.shape.borderRadius + "px",
						filter: theme.palette.mode === "dark" ? "invert(90%) hue-rotate(180deg)" : "none",
					}}
				/>
			</div>
			<Dialog
				open={streetViewDialog()}
				onClose={() => setStreetViewDialog(false)}
				fullScreen
				TransitionComponent={DialogTransition}
			>
				<AppBar sx={{ position: "relative", pt: "env(safe-area-inset-top)" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={() => setStreetViewDialog(false)}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography
							sx={{
								ml: 2,
								flex: 1,
							}}
							variant="h6"
							component="div"
						>
							Street View
						</Typography>
					</Toolbar>
				</AppBar>
				<object
					type="text/html"
					data={getMapsEmbedURL("streetview", props.address, props.streetViewLocation)}
					width="100%"
					height="100%"
					style={{
						border: 0,
					}}
				/>
			</Dialog>
		</Paper>
	)
}


const DialogTransition = function Transition(props: TransitionProps & { children: JSXElement }) {
	//@ts-expect-error: Some type error I can't be bothered to fix
	return <Slide direction="up" {...props} />;
};
