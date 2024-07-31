"use server";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {getStorage, ref,getDownloadURL} from "firebase/storage";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import app from "@/libs/firebase/firebase";
import { time } from "console";

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

export async function signUpWithEmailAndPassword(data: {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const storageRef = ref(storage, `Profiles/default.jpg`);
  const url = await getDownloadURL(storageRef);
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    if (result.user) {
      await updateProfile(result.user, {
        displayName: `${data.name} ${data.surname}`,
      });
      const docRef = doc(db, "Users", result.user.uid);
      await setDoc(docRef, {
        user_id: result.user.uid,
        username: `${data.name} ${data.surname}`,
        email: data.email,
        memberSince: new Date().toISOString().substring(0, 10),
        imageUrl: url,
        name: `${data.name} ${data.surname}`,
      });

      const userRef = doc(db, "Follow-Details", result.user.uid);
      await setDoc(userRef, {user_id: result.user.uid,name: `${data.name} ${data.surname}`, timestamp: new Date()});

    }

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
    return JSON.stringify(error);
  }
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

export async function validateEmail(inputEmail: string) {
  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(inputEmail);
}
