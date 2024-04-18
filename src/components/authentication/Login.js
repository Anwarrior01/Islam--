import React, { useState } from "react";
import "./login.css";
import logoDark from "../../pics/Logo-dark.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth,email,password)
  }
  return (
    <div className="login">
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
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password..."
        value={password}
      />
      <button onClick={handleLogin} className="login-btn">
        Log in
      </button>
    </div>
  );
}
