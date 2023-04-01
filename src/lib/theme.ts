import { MD3LightTheme, MD3DarkTheme, type MD3Theme } from "react-native-paper"
import { DefaultTheme as NLightTheme, DarkTheme as NDarkTheme, type Theme as NTheme } from "@react-navigation/native";

const lightColors = {
	"primary": "rgb(0, 109, 63)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(149, 247, 185)",
    "onPrimaryContainer": "rgb(0, 33, 16)",
    "secondary": "rgb(79, 99, 84)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(209, 232, 213)",
    "onSecondaryContainer": "rgb(12, 31, 20)",
    "tertiary": "rgb(59, 100, 112)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(190, 233, 247)",
    "onTertiaryContainer": "rgb(0, 31, 39)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(251, 253, 248)",
    "onBackground": "rgb(25, 28, 26)",
    "surface": "rgb(251, 253, 248)",
    "onSurface": "rgb(25, 28, 26)",
    "surfaceVariant": "rgb(220, 229, 219)",
    "onSurfaceVariant": "rgb(65, 73, 66)",
    "outline": "rgb(113, 121, 113)",
    "outlineVariant": "rgb(192, 201, 192)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 46)",
    "inverseOnSurface": "rgb(240, 241, 236)",
    "inversePrimary": "rgb(121, 218, 158)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(238, 246, 239)",
      "level2": "rgb(231, 242, 233)",
      "level3": "rgb(223, 237, 228)",
      "level4": "rgb(221, 236, 226)",
      "level5": "rgb(216, 233, 222)"
    },
    "surfaceDisabled": "rgba(25, 28, 26, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 26, 0.38)",
    "backdrop": "rgba(42, 50, 44, 0.4)"
};

const darkColors = {
	"primary": "rgb(121, 218, 158)",
    "onPrimary": "rgb(0, 57, 30)",
    "primaryContainer": "rgb(0, 82, 46)",
    "onPrimaryContainer": "rgb(149, 247, 185)",
    "secondary": "rgb(181, 204, 186)",
    "onSecondary": "rgb(33, 53, 40)",
    "secondaryContainer": "rgb(55, 75, 61)",
    "onSecondaryContainer": "rgb(209, 232, 213)",
    "tertiary": "rgb(163, 205, 219)",
    "onTertiary": "rgb(3, 54, 64)",
    "tertiaryContainer": "rgb(33, 76, 88)",
    "onTertiaryContainer": "rgb(190, 233, 247)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(25, 28, 26)",
    "onBackground": "rgb(225, 227, 222)",
    "surface": "rgb(25, 28, 26)",
    "onSurface": "rgb(225, 227, 222)",
    "surfaceVariant": "rgb(65, 73, 66)",
    "onSurfaceVariant": "rgb(192, 201, 192)",
    "outline": "rgb(138, 147, 139)",
    "outlineVariant": "rgb(65, 73, 66)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(225, 227, 222)",
    "inverseOnSurface": "rgb(46, 49, 46)",
    "inversePrimary": "rgb(0, 109, 63)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(30, 38, 33)",
      "level2": "rgb(33, 43, 37)",
      "level3": "rgb(36, 49, 41)",
      "level4": "rgb(37, 51, 42)",
      "level5": "rgb(38, 55, 45)"
    },
    "surfaceDisabled": "rgba(225, 227, 222, 0.12)",
    "onSurfaceDisabled": "rgba(225, 227, 222, 0.38)",
    "backdrop": "rgba(42, 50, 44, 0.4)"
};

export const lightTheme: MD3Theme & NTheme = {
	...NLightTheme,
	...MD3LightTheme,
	colors: {
		...NLightTheme.colors,
		...lightColors
	}
};

export const darkTheme: MD3Theme & NTheme = {
	...NDarkTheme,
	...MD3DarkTheme,
	colors: {
		...NDarkTheme.colors,
		...darkColors
	}
};
