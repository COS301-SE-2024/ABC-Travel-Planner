"use server";
import readUser from "@/libs/actions";
import createSupabaseServerClient from "@/libs/supabase/server";
import {signOut} from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "@/libs/firebase/firebase";

export async function logout() {
  const auth = getAuth(app);
  await signOut(auth);
}

export async function getUserProfile() {
  const result = await readUser();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = JSON.parse(result);
  const { data: userData } = await supabase
    .from("Users")
    .select()
    .eq("email", user?.email);
  const { data } = supabase.storage
    .from("Profile Pictures")
    .getPublicUrl(`${userData?.at(0).name}_${userData?.at(0).surname}.jpg`);

  return {
    name: userData?.at(0)?.name || "",
    surname: userData?.at(0)?.surname || "",
    email: userData?.at(0)?.email || "",
    createdAt: userData?.at(0)?.created_at || "",
    country: userData?.at(0)?.country || "",
    imageUrl: data?.publicUrl || "",
  };
}

export async function updateUserProfile(
  name: string,
  surname: string,
  email: string
) {
  const supabase = await createSupabaseServerClient();
  const result = await readUser();

  const {
    data: { user },
  } = JSON.parse(result);
  if (user?.email != email) {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
    });
  }

  await supabase
    .from("Users")
    .update({ name: name, surname: surname, email: email })
    .eq("user_id", user?.id);
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
