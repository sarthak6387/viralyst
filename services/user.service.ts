import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/firebase/client";

export async function createUserIfNotExists(
  user: any
) {
  const userRef = doc(db, "users", user.uid);

  const snapshot =
    await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "",
      image: user.photoURL || "",
      plan: "FREE",
      credits: 10,
      creatorScore: 0,
      createdAt: new Date(),
    });
  }
}