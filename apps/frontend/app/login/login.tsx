"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
} from "@mui/material";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { login } from ".";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "@/libs/firebase/firebase";
import getUser from "@/libs/actions/getUser";

const SplashPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      alert("Please enter email and password");
      return;
    }
    const result = await login(loginData);
    const tmp = JSON.parse(result || "{}");
    const user = tmp?.user;

    if (user) {
      Cookie.set("user_id", user.uid, { expires: 7 });
      router.push("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const signInWithGoogle = async () => {
    const db = getFirestore(app);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const docRef = doc(db, "Users", result.user.uid);
        const r = await getUser(result.user.uid);
        if (!r) {
          const storage = getStorage(app);
          const storageRef = ref(storage, `Profiles/default.jpg`);
          const url = await getDownloadURL(storageRef);
          await setDoc(docRef, {
            user_id: result.user.uid,
            username: result?.user?.displayName,
            email: result.user.email,
            memberSince: new Date().toISOString().substring(0, 10),
            imageUrl: url,
            name: result?.user?.displayName,
          });
        }
      }
      return JSON.stringify(result);
    } catch (error) {
      return null;
    }
  };

  const handleGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signInWithGoogle();
    if (result) {
      const { user } = JSON.parse(result);
      if (user) {
        Cookie.set("user_id", user.uid, { expires: 7 });
        router.push("/home");
      } else {
        alert("An error occurred while signing in with Google");
      }
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(https://source.unsplash.com/1920x1080/?travel)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Welcome Back, Traveler!
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              variant="outlined"
              margin="normal"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Or
            </Typography>
            <Button
              fullWidth
              onClick={handleGoogleSignIn}
              variant="outlined"
              startIcon={<FaGoogle />}
              sx={{ mt: 2, color: "blue", borderColor: "blue" }}
            >
              Sign in with Google
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" color="secondary">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SplashPage;
