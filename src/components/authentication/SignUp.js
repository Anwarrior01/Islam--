import React, { useState } from "react";
import "./signUp.css";
import logoDark from "../../pics/Logo-dark.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((signInCredential) => {
            updateProfile(auth.currentUser, { displayName: username })
              .then(() => {
                console.log("User profile updated.");
              })
              .catch((error) => {
                console.error("Error updating user profile:", error);
                alert(error);
              });
          })
          .catch((error) => {
            console.error("Error signing in:", error);
            alert(error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert(error);
      });
  };

  return (
    <div className="signup">
      <img src={logoDark} width={"110rem"} className="my-8 mx-auto" />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="Email..."
        value={email}
      />
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        placeholder="Username..."
        value={username}
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password..."
        value={password}
      />
      <button onClick={handleSignup} className="signup-btn">
        Sign Up
      </button>
    </div>
  );
}
