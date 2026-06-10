import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./client";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function loginWithEmail(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function signupWithEmail(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logout() {
  return signOut(auth);
}