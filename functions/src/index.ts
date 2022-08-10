import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const setClaimsAdmin = functions.https.onCall((data) => {
  return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        admin.auth().setCustomUserClaims(user.uid, {
          type: "true",
        });
      })
      .then(() => {
        console.log(`${data.email} adicionado como admin`);
        return {
          message: `${data.email} adicionado como admin.`,
        };
      })
      .catch((error) => {
        return error;
      });
});
