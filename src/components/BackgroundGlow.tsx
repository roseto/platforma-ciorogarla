import {Box, useTheme} from "@suid/material";

export interface BackgroundGlowProps {
	top?: number;
}

export default function BackgroundGlow(props: BackgroundGlowProps) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				position: "absolute",
				top: props.top ?? 0,
				left: "50%",
				transform: "translateX(-50%)",
				width: "100%",
				height: "100%",
				zIndex: 0,
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					position: "absolute",
					width: "1024px",
					height: "1024px",
					borderRadius: "50%",
					background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, ${theme.palette.primary.main}10 25%, #00000000 50%, #00000000 100%)`,
					zIndex: 0,
				}}
			/>
		</Box>
	)
}
