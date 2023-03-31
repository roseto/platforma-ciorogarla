import { Theme as NavTheme } from "@react-navigation/native";
import { MD3Theme, useTheme as useThemeMD3 } from "react-native-paper";

export const useTheme = () => {
	const theme = useThemeMD3<NavTheme & MD3Theme>();

	return theme;
};
