"use server";
import createSupabaseServerClient from "@/libs/supabase/server";

import { getAuth, signOut } from "firebase/auth";
import app from "@/libs/firebase/firebase";
import {getFirestore,doc,updateDoc} from "firebase/firestore";

export async function logout() {
  const auth = getAuth(app);
  await signOut(auth);
}

export async function updateImageURL({ user_id, imageURL }: { user_id: string; imageURL: string }) {
  const db = getFirestore(app);
  const docRef = doc(db, "Users", user_id);
  await updateDoc(docRef, {
    imageUrl: imageURL,
  });
}

export async function updateUserProfile(
  { username, email, country,user_id }: { username: string; email: string; country: string,user_id:string }
  
) {
    
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
  console.log(sharedItineraries);
  return sharedItineraries;
}
