import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//이미지 업로드를 위한 FB Storage 연결
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOnOlR0kAh4f5yd4ZnwruAYY8M7J_oMbQ",
  authDomain: "auth-ex-57afd.firebaseapp.com",
  projectId: "auth-ex-57afd",
  storageBucket: "auth-ex-57afd.appspot.com",
  messagingSenderId: "397407798794",
  appId: "1:397407798794:web:07fe53342f685d25e3c1f3",
  measurementId: "G-G9LCBK1XE1",
};

const app = initializeApp(firebaseConfig);

//getAuth함수를 임포트해와서 밖에서 쓸 수 있도록
//auth라는 변수명에 getAuth()를 담아 내보낸다. (파이어베이스 설정을 한 파일에서 다 하려고함)
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
