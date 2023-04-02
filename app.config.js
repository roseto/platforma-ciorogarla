export default {
	"name": "Ciorogârla Unită",
	"slug": "ciorogarlaunita",
	"scheme": "ciorogarlaunita",
	"version": "1.0.0",
	"orientation": "portrait",
	"icon": "./assets/icon.png",
	"userInterfaceStyle": "automatic",
	"privacy": "public",
	"currentFullName": "@ciorogarlaunita/ciorogarlaunita",
	"originalFullName": "@ciorogarlaunita/ciorogarlaunita",
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
		},
		"googleServicesFile": "./assets/google-services.json"
	},
	"web": {
		"favicon": "./assets/favicon.png",
		"config": {
			"firebase": {
				"apiKey": "AIzaSyBQ2DqvmWbpJCb9rN_srrLQsMy6jdCWJ_k",
				"authDomain": "ciorogarlaunita.firebaseapp.com",
				"databaseURL": "https://ciorogarlaunita-default-rtdb.europe-west1.firebasedatabase.app",
				"projectId": "ciorogarlaunita",
				"storageBucket": "ciorogarlaunita.appspot.com",
				"messagingSenderId": "71203725400",
				"appId": "1:71203725400:web:583a8d9c43e29ef4d3aa2d",
				"measurementId": "G-4FWZL89RBV"
			}
		}
	},
	"extra": {
		"eas": {
			"projectId": "9cdc3ff1-e459-421b-b84f-5cf7f2d124ba"
		},
		"sanity": {
			"projectId": "xxgdop45",
			"dataset": "production",
			"apiVersion": "2021-03-25"
		},
		"google": {
			"androidClientId": "71203725400-mvf1vdbpfqe88p9roen4kc2uuebtj62r.apps.googleusercontent.com",
			"iosClientId": "71203725400-ur47udha0bb4f500ts6hh700ja2742s1.apps.googleusercontent.com",
			"webClientId": "71203725400-5bu0av3isd039d63i6rrrhvkin26k618.apps.googleusercontent.com",
			"expoClientId": "71203725400-7ivmadqnhutiuoev20l1f7l2im4cmts2.apps.googleusercontent.com"
		}
	},
	"owner": "ciorogarlaunita",
	"updates": {
		"enabled": true,
		"url": "https://u.expo.dev/9cdc3ff1-e459-421b-b84f-5cf7f2d124ba"
	},
	"plugins": [
		"@react-native-firebase/app",
		"@react-native-firebase/auth"
	],
	"runtimeVersion": {
		"policy": "appVersion"
	},
}
