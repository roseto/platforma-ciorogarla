import { Animated, ScrollView, ScrollViewProps, StyleSheet, View, type ViewProps } from "react-native";

function Container(props: ViewProps) {
	return (
		<View
			{...props}
			style={[styles.container, props.style]}
		/>
	)
}

Container.ScrollView = function ContainerScrollView(props: ScrollViewProps) {
	return (
		// We use this since we are going to use
		// stuff with animation often
		<Animated.ScrollView
			{...props}
			style={[styles.scrollViewContainer, props.style]}
			contentContainerStyle={[styles.scrollViewContainerContent, props.contentContainerStyle]}
		/>
	)
}


const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		maxWidth: 768,
		width: "100%",
		alignSelf: "center",
	},
	scrollViewContainer: {
		paddingHorizontal: 10,
		width: "100%",
		display: "flex",
	},
	scrollViewContainerContent: {
		maxWidth: 768,
		width: "100%",
		alignSelf: "center",
	}
})

export default Container;
