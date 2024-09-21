"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { signUpWithEmailAndPassword, validateEmail, validatePassword } from ".";

export default function RegisterPage() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState<{
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ name: "", surname: "", email: "", password: "", confirmPassword: "" });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const theme = useTheme();

  const handleRegisterChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let isValid = false;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      isValid = await validateEmail(value);
      setEmailError(!isValid);
    } else if (name === "password") {
      isValid = await validatePassword(value);
      setPasswordError(!isValid);
      if (registerData.confirmPassword !== "") {
        if (value !== registerData.confirmPassword) {
          setPasswordsMatch(false);
        } else {
          setPasswordsMatch(true);
        }
      }
    } else if (name === "confirmPassword") {
      if (value === registerData.password) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (
      !registerData.name ||
      !registerData.surname ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (emailError || passwordError) {
      alert("Please enter valid email and password.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    const result = await signUpWithEmailAndPassword(registerData);

    const { user } = JSON.parse(result);

    if (!user) {
      alert("Email already in use");
      return;
    } else {
      alert("Registration successful!");
      localStorage.setItem("user_id", user.uid);
      Cookie.set("user_id", user.uid, { expires: 7 });

      router.push("/home");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        backgroundColor: "#f5f7fa",
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2),
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(6),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: theme.spacing(2) }}
        >
          Join the Adventure!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: theme.spacing(3) }}>
          Create an account and start planning your next trip.
        </Typography>
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            required
            fullWidth
            id="registerName"
            label="First Name"
            name="name"
            value={registerData.name}
            onChange={handleRegisterChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="registerSurname"
            label="Last Name"
            name="surname"
            value={registerData.surname}
            onChange={handleRegisterChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="registerEmail"
            label="Email Address"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email address" : ""}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="registerPassword"
            label="Password"
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            error={passwordError}
            helperText={
              passwordError
                ? "Password must be alphanumeric and contain at least 8 characters"
                : ""
            }
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="registerConfirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? "Passwords do not match" : ""}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              padding: theme.spacing(1.5),
              backgroundColor: "#2e86de",
              ":hover": {
                backgroundColor: "#2165c2",
              },
            }}
          >
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Link component={NextLink} href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
