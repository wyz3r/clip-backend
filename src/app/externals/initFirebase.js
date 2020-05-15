import * as admin from 'firebase-admin'
import firebaseConf from './clip-dashboard.json'
export const initialFireAdmin = () => {
  const serviceAccount = {
    projectId: firebaseConf.project_id,
    clientEmail: firebaseConf.client_email,
    privateKey: firebaseConf.private_key
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://clip-dashboard.firebaseio.com'
  })
}

initialFireAdmin()
