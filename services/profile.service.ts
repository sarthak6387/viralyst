import {

  doc,

  setDoc,

  getDoc,

} from "firebase/firestore";

import { db }
from "@/firebase/client";

export async function
saveProfile(

  userId: string,

  profile: any

) {

  await setDoc(

    doc(
      db,
      "creatorProfiles",
      userId
    ),

    profile
  );
}

export async function
getProfile(
  userId: string
) {

  const snapshot =
    await getDoc(

      doc(
        db,
        "creatorProfiles",
        userId
      )
    );

  return snapshot.data();
}