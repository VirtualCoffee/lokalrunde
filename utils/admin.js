const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://virtualcoffee-52994.firebaseio.com'
})

const db = admin.firestore()
const auth = admin.auth()

exports.admin = admin
exports.db = db
exports.auth = auth
