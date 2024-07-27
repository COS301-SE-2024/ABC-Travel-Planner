"use server";
import createSupabaseServerClient from "@/libs/supabase/server";

import { getAuth, signOut } from "firebase/auth";
import app from "@/libs/firebase/firebase";
import {getFirestore,doc,updateDoc} from "firebase/firestore";

export async function logout() {
  const auth = getAuth(app);
  await signOut(auth);
}



export async function updateUserProfile(
  { name, surname, email, country,user_id }: { name: string; surname: string; email: string; country: string,user_id:string }
  
) {
    
    const db = getFirestore(app);
    
    
    const docRef = doc(db, "Users", user_id);
    await updateDoc(docRef, {
      name: name,
      surname: surname,
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
