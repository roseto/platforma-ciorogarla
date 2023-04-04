import {Card} from "@suid/material";
import CardProps from "@suid/material/Card/CardProps";
import {OverridableComponent} from "@suid/material/OverridableComponent";
import {SvgIconTypeMap} from "@suid/material/SvgIcon";

export interface CardWithIconProps {
	cardIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}


export default function CardWithIcon(props: CardWithIconProps & CardProps) {
	return (
		<Card 
			sx={{
				position: "relative",
				"&:hover .card-icon": {
					transform: "scale(1.2)",
				},
				...props.sx,
			}}
		>
			{props.children}
			<props.cardIcon
				class="card-icon"
				sx={{
					position: "absolute",
					bottom: -32,
					right: -32,
					width: 128,
					height: 128,
					opacity: 0.5,
					transition: "transform 0.5s",
					pointerEvents: "none",
				}}
				color="secondary"
			/>
		</Card>
	)
}
