import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import axiosInstance from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      //create user
      const user = {
        full_name: name,
        email: email,
        password: password,
      };

      // Send the POST request to sign up the user
      const response = await axiosInstance.post("/users", user);
      console.log("Sign up successful:", response.data);

      // Handle successful signup, e.g., navigate to login or display success message
      setSuccess("Account created successfully! Please log in.");
      setError(null);
    } catch (error) {
      console.error("Error signing up:", error);
      setError("There was a problem creating your account. Please try again.");
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
          Sign Up
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

        <form onSubmit={handleSignUp} className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" className="-mb-3 text-navy-500">
              Your Name
            </Typography>
            <Input
              type="test"
              size="lg"
              placeholder="First Last"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
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
            <Typography variant="h6" className="-mb-3 text-navy-500">
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
            Sign Up
          </Button>
          <Typography className="mt-4 text-center text-navy-500 font-normal">
            Already have an account?
            <span
              onClick={() => navigate("/LogIn")}
              className="font-medium text-navy-500 cursor-pointer"
            >
              {" "}
              Log In
            </span>
          </Typography>
          <div className="flex justify-between mt-6"></div>
        </form>
      </Card>
    </div>
  );
};
export default SignUp;
