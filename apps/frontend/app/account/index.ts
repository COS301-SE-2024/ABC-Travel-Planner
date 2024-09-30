"use server";
import createSupabaseServerClient from "@/libs/supabase/server";

import { getAuth, signOut } from "firebase/auth";
import app from "@/libs/firebase/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export async function logout() {
  const auth = getAuth(app);
  await signOut(auth);
}

export async function deletePost(postId: string) {
  const db = getFirestore(app);
  const userRef = doc(db, "Posts", postId);
  await deleteDoc(userRef);

  const q5 = collection(db, "Comments");
  const querySnapshot5 = await getDocs(q5);
  querySnapshot5.forEach(async (doc: any) => {
    if (doc.data().post_id === postId) {
      await deleteDoc(doc.ref);
    }
  });

  const q6 = collection(db, "Likes");
  const querySnapshot6 = await getDocs(q6);
  querySnapshot6.forEach(async (doc: any) => {
    if (doc.data().post_id === postId) {
      await deleteDoc(doc.ref);
    }
  });
}

export async function updateImageURL({
  user_id,
  imageURL,
}: {
  user_id: string;
  imageURL: string;
}) {
  const db = getFirestore(app);
  const docRef = doc(db, "Users", user_id);
  await updateDoc(docRef, {
    imageUrl: imageURL,
  });
}

export async function updateUserProfile({
  username,
  email,
  country,
  user_id,
}: {
  username: string;
  email: string;
  country: string;
  user_id: string;
}) {
  const db = getFirestore(app);

  const docRef = doc(db, "Users", user_id);
  await updateDoc(docRef, {
    username: username,
    email: email,
    country: country,
  });
}

export async function getSharedItineraries() {
  const supabase = await createSupabaseServerClient();
  const { data: sharedItineraries } = await supabase
    .from("Itinerary")
    .select()
    .eq("shared", true);
  return sharedItineraries;
}
