import * as functions from "firebase-functions";
import {createSanityClient, SANITY_TOKEN} from "./lib/sanityClient";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//

// exports.createUserDocument = functions.runWith({secrets: [SANITY_TOKEN]})
//   .auth.user().onCreate((user) => {
//     const sanityClient = createSanityClient();

//     sanityClient.create({
//       _type: "user",
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       uid: user.uid,
//     });
//   });

// exports.deleteUserDocument = functions.runWith({secrets: [SANITY_TOKEN]})
//   .auth.user().onDelete((user) => {
//     const sanityClient = createSanityClient();

//     sanityClient.delete({
//       query: `*[_type == "user" && uid == "${user.uid}"]`,
//     });
//   });
