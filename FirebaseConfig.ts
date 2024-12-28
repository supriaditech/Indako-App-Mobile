// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIbQOCUw4EvFj1EoGXfbU2SKVYbJZvat0",
  authDomain: "supriaditech-6a249.firebaseapp.com",
  projectId: "supriaditech-6a249",
  storageBucket: "supriaditech-6a249.firebasestorage.app",
  messagingSenderId: "959008801346",
  appId: "1:959008801346:web:b260e9c8fca830840fa3db",
  measurementId: "G-YZWW05M974",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
