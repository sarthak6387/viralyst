import {

  addDoc,

  collection,

  query,

  where,

  getDocs,

  deleteDoc,

  doc,

} from "firebase/firestore";

import {

  incrementSavedIdeas,

} from "./analytics.service";

import { db }
from "@/firebase/client";

export async function
saveIdea(

  userId: string,

  type: string,

  topic: string,

  content: string

) {

  await addDoc(

    collection(
      db,
      "savedIdeas"
    ),

    {

      userId,

      type,

      topic,

      content,

      createdAt:
        Date.now(),
    }
  );

  await incrementSavedIdeas(
    userId
  );
}

export async function
getSavedIdeas(
  userId: string
) {

  const q =
    query(

      collection(
        db,
        "savedIdeas"
      ),

      where(
        "userId",
        "==",
        userId
      )
    );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({

      id: doc.id,

      ...doc.data(),
    })
  );
}

export async function
deleteIdea(
  id: string
) {

  await deleteDoc(

    doc(
      db,
      "savedIdeas",
      id
    )
  );
}