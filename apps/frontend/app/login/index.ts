"use server";
import createSupabaseServerClient from "@/libs/supabase/server";

export async function signUpWithEmailAndPassword(data: {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        surname: data.surname,
      },
    },
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}


