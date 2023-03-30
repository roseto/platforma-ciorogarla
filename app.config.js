module.exports = {
	"name": "Ciorogârla Unită",
	"slug": "ciorogarlaunita",
	"scheme": "ciorogarlaunita",
	"version": "1.0.0",
	"orientation": "portrait",
	"icon": "./assets/icon.png",
	"userInterfaceStyle": "automatic",
	"splash": {
		"image": "./assets/splash.png",
		"resizeMode": "contain",
		"backgroundColor": "#ffffff"
	},
	"assetBundlePatterns": [
		"**/*"
	],
	"ios": {
		"supportsTablet": true
	},
	"android": {
		"adaptiveIcon": {
			"foregroundImage": "./assets/adaptive-icon.png",
			"backgroundColor": "#ffffff"
		}
	},
	"web": {
		"favicon": "./assets/favicon.png"
	},
	"extra": {
		"eas": {
			"projectId": "9cdc3ff1-e459-421b-b84f-5cf7f2d124ba"
		},
		"sanity": {
			"projectId": "xxgdop45",
			"dataset": "production",
			"apiVersion": "2021-10-25",
		}
	},
	"owner": "ciorogarlaunita"
}
