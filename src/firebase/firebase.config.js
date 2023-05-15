import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAPZx9zzB5ZI6ayj5tCLMjkv4wGC9Qi3lk",
    authDomain: "email-password-auth-b.firebaseapp.com",
    projectId: "email-password-auth-b",
    storageBucket: "email-password-auth-b.appspot.com",
    messagingSenderId: "788388814587",
    appId: "1:788388814587:web:59c71c06511b217133da5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    app,
    auth
}