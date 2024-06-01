"use server";
import createSupabaseServerClient from "@/libs/supabase/server";

export default async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}
