import { Platform } from 'react-native';
import Constants from 'expo-constants';
import fb from 'firebase/compat/app';

let fbInstance: typeof fb;
let fbAuth: typeof fb.auth;
if (Platform.OS !== "web" && Constants.appOwnership !== "expo") {
	fbInstance = require("@react-native-firebase/app").default;
	fbAuth = require("@react-native-firebase/auth").default;
} else {
	fbInstance = require("firebase/compat/app").default;
}

export const Firebase = fbInstance;
console.log(Constants.expoConfig.web.config.firebase);
export const firebase = fbInstance.initializeApp(Constants.expoConfig.web.config.firebase);
export const auth = fbAuth ? fbAuth : fbInstance.auth;
