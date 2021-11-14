import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyB_xQY_7Siwa0HVUgzjVI_7wHGPZw9psas",
    authDomain: "tesla-clone-45306.firebaseapp.com",
    projectId: "tesla-clone-45306",
    storageBucket: "tesla-clone-45306.appspot.com",
    messagingSenderId: "173378799220",
    appId: "1:173378799220:web:b3d170bbedf71e93f13321"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebaseApp.auth()

export { auth }
