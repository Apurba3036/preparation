// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging} from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAX6uQ6NhlCeYtOcp7-EHJLmAeuyphp1A",
  authDomain: "attentionnetwork-860bc.firebaseapp.com",
  projectId: "attentionnetwork-860bc",
  storageBucket: "attentionnetwork-860bc.appspot.com",
  messagingSenderId: "890637177850",
  appId: "1:890637177850:web:7d09a4c4917b7fe4cdca43",
  measurementId: "G-DNLS0FC9N9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);


export default app;