"use server";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import app from "@/libs/firebase/firebase";

export async function login(data: { email: string; password: string }) {
  const auth = getAuth(app);
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    //check if the user has verified their email
    if (!result.user.emailVerified) {
     


      //return an error message if the user has not verified their email and maybe send them another email verification
      await sendEmailVerification(result.user);
      return JSON.stringify({
        error: "Please verify your email before logging in",
      });
    }
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}
