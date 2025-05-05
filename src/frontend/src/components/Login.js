import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for routing
import { useUserInfo } from "../context/useUserInfo"; //to set user information after login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); //Use useLocation to get redirect state
  const { setUser } = useUserInfo();

  // Get the redirect path from state or set a default to /home
  const redirectPath = location.state?.redirect || "/home";

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      }); // Use POST for login
      console.log("Login successful:", response.data);

      // Handle successful login
      const { token, userName, userEmail, userID } = response.data;
      localStorage.setItem("authToken", token); //store token in local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ userName, userEmail, userID })
      );
      setUser({ userName, userEmail, userID }); //sets user context when they log in

      navigate(redirectPath); // redirect to the originally intended page or home
      setSuccess("Successfully logged in!");
      setError(null);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password.");
      setSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        color="white"
        shadow={false}
        className="w-80 max-w-screen-lg sm:w-96 p-8"
      >
        <Typography className="text-center text-navy-500" variant="h4">
          Log In
        </Typography>
        {/* Conditionally render success and error messages */}
        {success && (
          <Alert color="green" className="mt-4 mb-4">
            {success}
          </Alert>
        )}
        {error && (
          <Alert color="red" className="mt-4 mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleLogin} className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" className="-mb-3 text-navy-500">
              Your Email
            </Typography>
            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-navy-500"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6 bg-navy-500" fullWidth>
            Log In
          </Button>
          <Typography className="mt-4 text-center font-normal text-navy-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-medium text-navy-500 cursor-pointer"
            >
              {" "}
              Sign Up
            </span>
          </Typography>
          <div className="flex justify-between mt-6"></div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
