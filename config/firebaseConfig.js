const admin = require("firebase-admin")
const serviceAccount = require("../serviceAccount.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://fir-project-2-3775a.appspot.com"
});