import firebase from 'firebase'
<<<<<<< HEAD
<<<<<<< HEAD
import Rebase from 're-base'
import secret from '../secret.json'
=======
import secret from '../../secret.json'
>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP
=======
import Rebase from 're-base'
import secret from '../secret.json'
>>>>>>> login in FB works NEED TO STYLE FB BUTTON

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

<<<<<<< HEAD
<<<<<<< HEAD


const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()
export { app, base, facebookProvider}
=======
firebase.initializeApp(config);

export const auth = firebase.auth()
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export default firebase
>>>>>>> basic set up with fireB CONTINUE WITH FIREB SETUP
=======


const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()
export { app, base, facebookProvider}
>>>>>>> login in FB works NEED TO STYLE FB BUTTON
