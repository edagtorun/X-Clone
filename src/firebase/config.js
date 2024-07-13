// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHKBvxL0sbs4aF2DxrMdaoezszKdxjt7A",
  authDomain: "twitter-clone-30110.firebaseapp.com",
  projectId: "twitter-clone-30110",
  storageBucket: "twitter-clone-30110.appspot.com",
  messagingSenderId: "503412782164",
  appId: "1:503412782164:web:59204fe1e3a4c7ed3169c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth hizmetinin referansini al

export const auth = getAuth(app);

//google saglayicisinin kurulumu
export const provider = new GoogleAuthProvider();

//veritabaninin referansini alma
export const db = getFirestore(app);

//medya depolama alaninin referansini alma
export const storage = getStorage(app);
