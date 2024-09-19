import "./App.css";

import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      {!isLogin && !isSignUp && (
        <div className="bg-white rounded shadow-md p-6">
          <h2 className="text-3xl font-bold text-center mb-6">CASE Flow</h2>

          <div className="flex justify-center">
            <button
              className="btn btn-blue w-32 mr-4"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className="btn btn-blue w-32"
              onClick={() => {
                setIsLogin(false);
                setIsSignUp(true);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
      {isLogin && <Login />}
      {isSignUp && <SignUp />}
    </div>
  );
};

export default App;
