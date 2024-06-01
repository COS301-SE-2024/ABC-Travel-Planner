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

  const {
    data: { user },
  } = result;
  if (user) {
    await supabase.from("Users").insert([
      {
        email: user.email,
        user_id: user.id,
        name: user.user_metadata.name,
        surname: user.user_metadata.surname,
      },
    ]);
  }
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

export async function validatePassword(inputPassword: string) {
  const minLength = 8;
  const hasNumber = /\d/.test(inputPassword); // Check if password contains a number
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputPassword); // Check if password contains a special character

  // Perform validation checks
  const isValidLength = inputPassword.length >= minLength;
  const isValidNumber = hasNumber;
  const isValidSpecialChar = hasSpecialChar;

  // Set validity based on all criteria
  const isValid = isValidLength && isValidNumber && isValidSpecialChar;

  return isValid;
}

export async function validateEmail(inputEmail: string){
  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(inputEmail);
};

