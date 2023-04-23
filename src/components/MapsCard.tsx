import {Divider, ListItemButton, ListItemIcon, ListItemText, Paper, Skeleton, Typography, useTheme} from "@suid/material";
import {getMapsEmbedURL, getMapsURL} from "../lib/maps";
import {createMemo, createSignal, Show} from "solid-js";

import MarkerIcon from "@suid/icons-material/PinDrop";
import MapIcon from "@suid/icons-material/Map";
import StreetViewIcon from "@suid/icons-material/Streetview";


interface MapsCardProps {
	address: string;
	override?: boolean;
	lat?: number;
	lng?: number;
}

export default function MapsCard(props: MapsCardProps) {
	const theme = useTheme();
	const url = getMapsURL(props.address ?? props.override);
	const isStreetViewEnabled = createMemo(() => props.lat && props.lng);
	const [streetViewMode, setStreetViewMode] = createSignal(false);

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
			<Show when={isStreetViewEnabled}>
				<Divider variant="middle" />
				<ListItemButton
					onClick={() => setStreetViewMode(!streetViewMode())}
				>
					<ListItemIcon sx={{ minWidth: 32 }}>
						{streetViewMode() ? <MapIcon /> : <StreetViewIcon />}
					</ListItemIcon>
					<ListItemText
						primary={streetViewMode() ? "View on map" : "View in Street View"}
					/>
				</ListItemButton>
			</Show>
			<div
				style={{
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Skeleton
					variant="rectangular"
					width="100%"
					height={streetViewMode() ? "512px" : "256px"}
					style={{
						"border-radius": theme.shape.borderRadius + "px",
					}}
				/>
				{/* We use object instead of iframe because the url 
				changes and iframe registers the changes in the history */}
				<object
					type="text/html"
					data={getMapsEmbedURL(streetViewMode() ? "streetview" : "place", props.address ?? props.override, `${props.lat},${props.lng}`)}
					width="100%"
					height={streetViewMode() ? "512px" : "256px"}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						border: 0,
						"border-radius": theme.shape.borderRadius + "px",
						filter: streetViewMode() ? "none" : theme.palette.mode === "dark" ? "invert(90%) hue-rotate(180deg)" : "none",
					}}
				/>
			</div>
		</Paper>
	)
}
