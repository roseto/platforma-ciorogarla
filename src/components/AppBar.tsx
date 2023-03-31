import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, useTheme } from "react-native-paper";
import { Animated } from "react-native";

interface AppBarProps {
	mode?: "large" | "small",
	scrollPosition?: Animated.Value,
	transparent?: boolean,
	actions?: {
		icon: string,
		onPress: () => void,
	}[],
}

export default function AppBar({ back, route, options, navigation, mode, scrollPosition, transparent, actions }: AppBarProps & NativeStackHeaderProps) {
	const theme = useTheme();

	return (
		<Animated.View
			style={{
				elevation: scrollPosition ? scrollPosition.interpolate({
					inputRange: [0, 100],
					outputRange: [0, 4],
					extrapolate: "clamp"
				}) : 0,
				shadowOpacity: 0,
				backgroundColor: scrollPosition ? scrollPosition.interpolate({
					inputRange: [0, 100],
					outputRange: [transparent ? "transparent" : theme.colors.background, theme.colors.elevation.level1],
					extrapolate: "clamp"
				}) : transparent ? "transparent" : theme.colors.background
			}}
		>
			<Appbar.Header
				mode={mode ?? "small"} 
				style={{
					backgroundColor: mode === "large" ? theme.colors.elevation.level1 : "transparent",
					elevation: 0,
					shadowOpacity: 0
				}}
				elevated={false}
			>
				{back && <Appbar.BackAction onPress={navigation.goBack} />}
				{scrollPosition !== undefined ?
					<AnimatedContent 
						// @ts-ignore
						title={options.title || route.name}
						style={{
							marginHorizontal: 16,
							opacity: scrollPosition?.interpolate({
								inputRange: [0, 100],
								outputRange: [0, 1],
								extrapolate: "clamp"
							})
						}}
					/>
					:
					<Appbar.Content title={options.title || route.name} />
				}
				{actions && actions.map((action, idx) => (
					<Appbar.Action
						key={idx}
						icon={action.icon}
						onPress={action.onPress}
					/>
				))}
			</Appbar.Header>
		</Animated.View>
	)
}

const AnimatedContent = withAnimated(Appbar.Content);

// Some hack i found
function withAnimated(WrappedComponent: any) {

  // Extract the display name of the inputted component
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  // Create a class based on the React Component built-in
  class WithAnimated extends React.Component {
    
    // Set display name property of new class
    displayName = `WithAnimated( ${ displayName } )`

    // Return the inputted component wrapped as a WithAnimated that is so far only a default React Component
    render() {
      return <WrappedComponent { ...this.props } />
    }

  }

  // Run the React Component through the built-in animatifier
  return Animated.createAnimatedComponent( WithAnimated )

}
