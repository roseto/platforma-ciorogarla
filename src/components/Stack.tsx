import { View, ViewProps } from "react-native";


export default function Stack(props: ViewProps) {
	return (
		<View
			{...props}
			style={[{
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "stretch",
				gap: 8,
			}, props.style]}
		/>
	)
}