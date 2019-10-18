import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBUn-FjMoAZUKD6ik8rRuimJ94oNn8eDvk",
    authDomain: "todoapp-02.firebaseapp.com",
    databaseURL: "https://todoapp-02.firebaseio.com",
    projectId: "todoapp-02",
    storageBucket: "todoapp-02.appspot.com",
    messagingSenderId: "973838218790",
    appId: "1:973838218790:web:79a636680f5bcee27518e7",
    measurementId: "G-YR0QV3XF7G"
  };
  
  var provider = new firebase.auth.FacebookAuthProvider();
  // Initialize Firebase
  const providerApp = provider.setCustomParameters({'display': 'popup'})
  const FirebaseApp = firebase.initializeApp(firebaseConfig);
  export {
    FirebaseApp,
    providerApp
  } 
