import React, { useState } from 'react'
import "./authentication.css";
import authHero from "../../pics/auth.png";
import Login from './Login';
import SignUp from './SignUp';
export default function Authentication() {
  const [active,setActive] = useState('login')
  const handleChange = () =>{
    setActive(active === 'login' ? 'signup' : 'login')
  }
  return (
    <div className="authentication">
      <div className="auth__left">
        <img src={authHero} alt="" />
      </div>
      <div className="auth__right">
        {active === "login" ? <Login /> : <SignUp />}
        <div className="auth__more">
          <span>
            {active === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                onClick={handleChange}
                  style={{
                    border: "1px solid white",
                    padding: ".3rem .8rem",
                    marginLeft: ".5rem",
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                onClick={handleChange}
                  style={{
                    border: "1px solid white",
                    padding: ".3rem .8rem",
                    marginLeft: ".5rem",
                  }}
                >
                  Log in
                </button>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
