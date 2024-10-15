// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbqDph0UstmArZHMRgo1h1AAp6j70wEvE",
  authDomain: "trekker-chat.firebaseapp.com",
  projectId: "trekker-chat",
  storageBucket: "trekker-chat.appspot.com",
  messagingSenderId: "297300669072",
  appId: "1:297300669072:web:d7fa1a7b9ccc4af9649e15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const roomref = collection(db, "rooms");
