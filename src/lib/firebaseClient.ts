import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";


const firebaseConfig = {
	apiKey: "AIzaSyBQ2DqvmWbpJCb9rN_srrLQsMy6jdCWJ_k",
	authDomain: "ciorogarlaunita.firebaseapp.com",
	projectId: "ciorogarlaunita",
	storageBucket: "ciorogarlaunita.appspot.com",
	messagingSenderId: "71203725400",
	appId: "1:71203725400:web:583a8d9c43e29ef4d3aa2d",
	measurementId: "G-4FWZL89RBV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const performance = getPerformance(app);
