"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { login } from ".";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "@/libs/firebase/firebase";
import getUser from "@/libs/actions/getUser";

const SplashPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/abctravelplanner.appspot.com/o/background%2Flogin.jpg?alt=media&token=33511fc2-c660-43b9-ae64-5187ab5fa23c)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome Back, Traveler!
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              data-testid="signInEmail"
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
      data-testid="signInPassword"
      fullWidth
      label="Password"
      type={passwordVisible ? "text" : "password"}
      name="password"
      value={loginData.password}
      onChange={handleLoginChange}
      variant="outlined"
      margin="normal"
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
            <Button
              data-testid="signInSubmit"
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
              data-testid="signInGoogle"
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
