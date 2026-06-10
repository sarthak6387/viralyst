import {

  doc,

  getDoc,

  setDoc,

  updateDoc,

  increment,

} from "firebase/firestore";

import { db }
from "@/firebase/client";

/* INITIALIZE */

export async function
initializeUserAnalytics(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  const snapshot =
    await getDoc(ref);

  if (!snapshot.exists()) {

    await setDoc(ref, {

      trendsAnalyzed: 0,

      scriptsGenerated: 0,

      ideasGenerated: 0,

      titlesGenerated: 0,

      savedIdeas: 0,

      creatorScore: 0,
    });
  }
}

/* GET */

export async function
getUserAnalytics(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  const snapshot =
    await getDoc(ref);

  if (
    snapshot.exists()
  ) {

    return snapshot.data();
  }

  return null;
}

/* TREND SEARCHES */

export async function
incrementTrendSearches(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  await updateDoc(ref, {

    trendsAnalyzed:
      increment(1),

    creatorScore:
      increment(2),
  });
}

/* TITLES */

export async function
incrementTitlesGenerated(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  await updateDoc(ref, {

    titlesGenerated:
      increment(1),

    creatorScore:
      increment(1),
  });
}

/* SCRIPTS */

export async function
incrementScriptsGenerated(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  await updateDoc(ref, {

    scriptsGenerated:
      increment(1),

    creatorScore:
      increment(3),
  });
}

/* IDEAS */

export async function
incrementIdeasGenerated(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  await updateDoc(ref, {

    ideasGenerated:
      increment(1),

    creatorScore:
      increment(2),
  });
}

/* SAVED IDEAS */

export async function
incrementSavedIdeas(
  userId: string
) {

  const ref =
    doc(
      db,
      "analytics",
      userId
    );

  await updateDoc(ref, {

    savedIdeas:
      increment(1),

    creatorScore:
      increment(1),
  });
}