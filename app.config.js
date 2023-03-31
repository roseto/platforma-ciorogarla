const runtimeVersion = {
	policy: "appVersion"
}

export default {
	"name": "Ciorogârla Unită",
	"slug": "ciorogarlaunita",
	"scheme": "ciorogarlaunita",
	"version": "1.0.0",
	"orientation": "portrait",
	"icon": "./assets/icon.png",
	"userInterfaceStyle": "automatic",
	"privacy": "public",
	"platforms": [
		"ios",
		"android",
		"web"
	],
	"githubUrl": "https://github.com/ciorogarlaunita/app",
	"splash": {
		"image": "./assets/splash.png",
		"resizeMode": "contain",
		"backgroundColor": "#ffffff"
	},
	"assetBundlePatterns": [
		"**/*"
	],
	"ios": {
		"buildNumber": "1.0.0",
		"supportsTablet": true,
		"bundleIdentifier": "org.eu.ciorogarlaunita"
	},
	"android": {
		"versionCode": 1,
		"package": "org.eu.ciorogarlaunita",
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
			"apiVersion": "2021-03-25"
		}
	},
	"owner": "ciorogarlaunita",
	"updates": {
		"enabled": true,
		"url": "https://u.expo.dev/9cdc3ff1-e459-421b-b84f-5cf7f2d124ba"
	},
	// We do this since there is a bug with the Expo Go client
	"runtimeVersion": process.env.MY_ENVIRONMENT === "production" ? runtimeVersion : undefined,
}
