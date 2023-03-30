import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useLayoutEffect, useRef } from "react";
import { Animated } from "react-native";
import AppBar from "../components/AppBar";

interface UseHeaderProps {
	mode?: "large" | "small",
	animated?: boolean,
	title?: string,
	transparent?: boolean,
}

export const useHeader = (props?: UseHeaderProps) => {
	const scrollPosition = useRef(new Animated.Value(0)).current;
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			header: (hProps) => <AppBar 
					{...hProps} 
					scrollPosition={props?.animated ? scrollPosition : undefined} 
					mode={props?.mode ?? "small"} 
					transparent={props?.transparent ?? false}
				/>,
			headerTransparent: props?.transparent ?? false,
		} as NativeStackNavigationOptions)

		if (props.title) {
			navigation.setOptions({
				title: props.title
			})
		}
	}, [props.title, props.mode, props.animated])


	const onScroll = Animated.event(
		[ { nativeEvent: { contentOffset: { y: scrollPosition } } } ],
		{ useNativeDriver: false }
	);

	return {
		onScroll,
	}
}
