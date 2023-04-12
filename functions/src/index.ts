import * as functions from "firebase-functions";
import { sanityClient } from "../lib/sanityClient";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

export const createUserDocument = functions.auth.user().onCreate((user) => {
	sanityClient.create({
		_type: "user",
		displayName: user.displayName,
		email: user.email,
		photoURL: user.photoURL,
		uid: user.uid,
	});
});

export const deleteUserDocument = functions.auth.user().onDelete((user) => {
	sanityClient.delete({
		query: `*[_type == "user" && uid == "${user.uid}"]`,
	})
});
