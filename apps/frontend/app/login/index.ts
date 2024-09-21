"use server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import app from "@/libs/firebase/firebase";

export async function login(data: { email: string; password: string }) {
  const auth = getAuth(app);
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
