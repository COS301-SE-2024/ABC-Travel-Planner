"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithEmailAndPassword, signUpWithEmailAndPassword } from ".";
import readUser from "@/libs/actions";

const SplashPage = () => {
  const router = useRouter();
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

  const handleLogin = async () => {
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

  useEffect(() => {
    const getUser = async () => {
      const result = await readUser();
      const {
        data: { user },
      } = JSON.parse(result);
      if (user) {
        router.push("/home");
      }
    };
    getUser();
  }, []);

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const result = await signUpWithEmailAndPassword(registerData);
    // console.log(result);

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
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
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
            <div className="col-md-6">
              <div style={styles.form}>
                <h1 style={{ ...styles.headers, textAlign: "center" }}>
                  Login{" "}
                </h1>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    aria-describedby="emailHelp"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
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

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div style={styles.form}>
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
                  />
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
                  />
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
                  />
                </div>
                <button
                  onClick={handleRegister}
                  type="submit"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </div>
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