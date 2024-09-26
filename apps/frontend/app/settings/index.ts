"use server";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import app from "@/libs/firebase/firebase";
export async function deleteAccount(user_id: any) {
  const db = getFirestore(app);
  try {
    const userRef = doc(db, "Users", user_id);
    await deleteDoc(userRef);

    const q1 = collection(db, "Posts");
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (doc: any) => {
      if (doc.data().user_id === user_id) {
        await deleteDoc(doc.ref);
      }
    });

    const q = collection(db, "Itineraries");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc: any) => {
      if (doc.data().user_id === user_id) {
        await deleteDoc(doc.ref);

        const itinerary_id = doc.id;
        const q2 = collection(db, "Saved-Itineraries");
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach(async (savedDoc: any) => {
          if (savedDoc.data().itinerary_id === itinerary_id) {
            await deleteDoc(savedDoc.ref);
          }
        });
      }
    });
  } catch (error) {
    return JSON.stringify({ message: error });
  }
}

export async function getFavouriteCountries(user_id: any) {
  //from the favourite-country collection doc is the user_id
  const db = getFirestore(app);
  const q = collection(db, "Favourite-Countries");
  const querySnapshot = await getDocs(q);
  let countries: string[] = [];
  querySnapshot.forEach((doc: any) => {
    if (doc.id === user_id) {
      countries = doc.data().favouriteCountries;
    }
  });
  console.log(countries);
  return countries;
}
