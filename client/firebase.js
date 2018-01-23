import firebase from 'firebase'
import secret from '../../secret.json'

// Initialize Firebase
const config = {
  // Initialize Firebase
  
    apiKey: secret.apiKey,
    authDomain: secret.authDomain,
    databaseURL: secret.databaseURL,
    projectId: secret.projectId,
    storageBucket: secret.storageBucket,
    messagingSenderId: secret.messagingSenderId

  
}; 

firebase.initializeApp(config);

export const auth = firebase.auth()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export default firebase