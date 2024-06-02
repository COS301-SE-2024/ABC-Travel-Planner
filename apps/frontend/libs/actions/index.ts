"use server";

import createSupabaseServerClient from "../supabase/server";

export default async function readUser() {
  const supabase = await createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  return JSON.stringify(user);
}
