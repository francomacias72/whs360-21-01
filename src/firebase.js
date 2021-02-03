import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcs-VGDZXBO2xfxazBC2p5IivkD51AX-Y",
    authDomain: "warehouse-360.firebaseapp.com",
    projectId: "warehouse-360",
    storageBucket: "warehouse-360.appspot.com",
    messagingSenderId: "1043750546894",
    appId: "1:1043750546894:web:60ce901d67fa6ec9934f9f",
    measurementId: "G-TGJSV3YVRD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }