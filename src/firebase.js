import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCM-4W7sztgWoVhXHNxo5sgGgGl7mAukRE",
    authDomain: "clone-yt-7a137.firebaseapp.com",
    projectId: "clone-yt-7a137",
    storageBucket: "clone-yt-7a137.appspot.com",
    messagingSenderId: "22861864134",
    appId: "1:22861864134:web:cc8e2efb5b6ebb0cfe4bc7",
    measurementId: "G-HR2MX132DH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }