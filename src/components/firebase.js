import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    /*
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    */

        apiKey:process.env.REACT_APP_API_KEY,
        authDomain: "rufriends-f3d56.firebaseapp.com",
        projectId: "rufriends-f3d56",
        storageBucket: "rufriends-f3d56.appspot.com",
        messagingSenderId: "2280972075",
        appId: "1:2280972075:web:1305c8cdcee7ee74ffef6e",
        measurementId: "G-1L0GXVNQ75"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
