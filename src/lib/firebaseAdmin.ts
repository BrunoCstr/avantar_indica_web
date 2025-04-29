import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENTEMAIL,
      privateKey: process.env.FIREBASE_PRIVATEKEY?.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export const adminAuth = admin.auth();