import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const setClaimsAdmin = functions.https.onCall((data) => {
  return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        admin.auth().setCustomUserClaims(user.uid, {
          admin: "true",
          superAdmin: "false",
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
export const setClaimsSuperAdmin = functions.https.onCall((data) => {
  return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user2) => {
        admin.auth().setCustomUserClaims(user2.uid, {
          admin: "true",
          superAdmin: "true",
        });
      })
      .then(() => {
        console.log(`${data.email} adicionado como Super admin`);
        return {
          message: `${data.email} adicionado como superadmin.`,
        };
      })
      .catch((error) => {
        return error;
      });
});

export const deleteUser=functions.https.onCall((data) => {
  return admin
      .auth().deleteUser(data.uid).then(()=>{
        console.log("usuario apagado");
      });
});
export const setAdmin=functions.https.onCall((data) => {
  return admin.auth()
      .getUserByEmail(data.email)
      .then((user1) => {
        admin.auth().setCustomUserClaims(user1.uid, {
          admin: "true",
          superAdmin: "false",
        });
      });
});

export const getToken=functions.https.onCall((data) => {
  return admin.auth()
      .getUserByEmail(data.email)
      .then((user1) => {
        const user2= user1.toJSON();
        return user2;
      });
});

export const updatefoto=functions.https.onCall((data) => {
  return admin.auth().updateUser(data.uid, {photoURL: data.photo});
});

