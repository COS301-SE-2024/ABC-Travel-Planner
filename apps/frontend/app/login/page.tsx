"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  validateEmail,
  validatePassword,
} from ".";

const SplashPage = () => {
  const router = useRouter();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [registerData, setRegisterData] = useState<{
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({ name: "", surname: "", email: "", password: "", confirmPassword: "" });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const result = await signInWithEmailAndPassword(loginData);
    const {
      data: { user },
    } = JSON.parse(result);
    if (user) {
      router.push("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (emailError || passwordError) {
      alert("Please enter valid email and password.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    const result = await signUpWithEmailAndPassword(registerData);

    const { error } = JSON.parse(result);

    if (error) {
      alert("Email already in use");
      return;
    } else {
      alert("Registration successful!");
      router.push("/home");
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
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

  return (
    <div
      style={{
        ...styles.container,
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div style={{ ...styles.overlay, textAlign: "center" }}>
        <h1 style={styles.heading}>Welcome to ABC Travel Planner</h1>

        <div className="container">
          <div className="row justify-content-center">
            <div onSubmit={handleLogin} className="col-md-6">
              <form style={styles.form}>
                <h1 style={{ ...styles.headers, textAlign: "center" }}>
                  Login{" "}
                </h1>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    data-testid="signInEmail"
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    aria-describedby="emailHelp"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    data-testid="signInPassword"
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button
                  data-testid="signInSubmit"
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div style={styles.cardsContainer}>
          <div className="card" style={styles.card}>
            <Image
              src="/Images/Mountains.jpg"
              className="card-img-top"
              alt="Travel 1"
              width={300}
              height={200}
            />
            <div className="card-body">
              <h5 className="card-title">Explore the Mountains</h5>
            </div>
          </div>
          <div className="card" style={styles.card}>
            <Image
              src="/Images/BrazilBeach.jpg"
              className="card-img-top"
              alt="Travel 2"
              width={300}
              height={200}
            />
            <div className="card-body">
              <h5 className="card-title">Discover the Beaches</h5>
            </div>
          </div>
          <div className="card" style={styles.card}>
            <Image
              src="/Images/Forest.jpg"
              className="card-img-top"
              alt="Travel 3"
              width={300}
              height={200}
            />
            <div className="card-body">
              <h5 className="card-title">Adventure in the Forests</h5>
            </div>
          </div>
        </div>

        <div onSubmit={handleRegister} className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form style={styles.form}>
                <h1 style={{ ...styles.headers, textAlign: "center" }}>
                  Register
                </h1>
                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerName"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerSurname" className="form-label">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerSurname"
                    name="surname"
                    value={registerData.surname}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="registerEmail"
                    aria-describedby="emailHelp"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                  {emailError && (
                    <small style={{ color: "red" }}>
                      Please enter a valid email address
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerPassword"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  {passwordError && (
                    <small style={{ color: "red" }}>
                      Password must be alphanumeric and contain at least 8
                      characters
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="registerConfirmPassword"
                    className="form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerConfirmPassword"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                  {!passwordsMatch && (
                    <small style={{ color: "red" }}>
                      Passwords do not match
                    </small>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative" as "relative",
    minHeight: "100vh",
    backgroundImage: 'url("/Images/Background.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
  },
  heading: {
    color: "white",
    fontSize: "48px",
    marginBottom: "20px",
    marginTop: "0",
  },
  form: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px 0",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0",
  },
  card: {
    width: "18rem",
  },
  headers: {
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default SplashPage;
