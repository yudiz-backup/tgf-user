// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD54tv_mnQOD1tgl38ezlS099TQwZAzN4k",
  authDomain: "tfg-web-8955c.firebaseapp.com",
  projectId: "tfg-web-8955c",
  storageBucket: "tfg-web-8955c.appspot.com",
  messagingSenderId: "86489151355",
  appId: "1:86489151355:web:31b0620303bb9cc7b8efde",
  measurementId: "G-W697ZVPBS8",
};

let analytics: any;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
}

export { analytics };
