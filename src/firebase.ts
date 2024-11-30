import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7hV7imXqjQP_Xn1jGmJOIASMYnqqyJ5E",
  authDomain: "clone-twitter-89e72.firebaseapp.com",
  projectId: "clone-twitter-89e72",
  storageBucket: "clone-twitter-89e72.firebasestorage.app",
  messagingSenderId: "474831924016",
  appId: "1:474831924016:web:5a040de325bee3c32436f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //상단의 Configration 코드로 app을 생성하고

// Authentication을 원한다는 코드를 작성
export const auth = getAuth(app); //그 app에 대한 Authentication을 사용하고 싶음

//데이터베이스에 대한 권한
export const database = getFirestore(app);

//스토리지에 대한 권한
export const storage = getStorage(app);