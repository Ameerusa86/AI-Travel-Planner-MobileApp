import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZZCIp78bHL5vhSd6aghDpJghcYQqBqPw",
  authDomain: "ai-travel-planner-a4d5a.firebaseapp.com",
  projectId: "ai-travel-planner-a4d5a",
  storageBucket: "ai-travel-planner-a4d5a.appspot.com",
  messagingSenderId: "970789040973",
  appId: "1:970789040973:web:d5efd9b14eaa640fbefd04",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
