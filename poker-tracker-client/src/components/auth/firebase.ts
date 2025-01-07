import { useAuth } from "@/hooks/useAuth";
import { GetUserResponse, UserCreateRequest } from "@/models/requests/types";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const user = await axios.get<User>(`${import.meta.env.VITE_API_URL}/users/${res.user.uid}`)
  return user.data
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<GetUserResponse | null> => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const request: UserCreateRequest = {
    email: res.user.email!,
    guid: res.user.uid,
    username: name,
    roleId: 1,
  };

  const user = await axios.post<GetUserResponse>(
    `${import.meta.env.VITE_API_URL}/users`,
    request
  );
  return user.data;
};

export const logoutFirebase = () => {
  signOut(auth);
};