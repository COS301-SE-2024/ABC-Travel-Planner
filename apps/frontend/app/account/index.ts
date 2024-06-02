"use server";
import readUser from "@/libs/actions";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

export async function getUserProfile()
{
  const result = await readUser();
  const {
    data: { user },
  } = JSON.parse(result);

  return {
    name: user?.user_metadata?.name || "",
    surname: user?.user_metadata?.surname || "",
    email: user?.email || "",
  };
}

