import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CaseSubmissionForm from "./components/CaseSubmission";
import CaseDashboard from "./components/CaseDashboard";
import CaseDetails from "./components/CaseDetails";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-navy-400">
        <Routes>
          {/*Public Routes*/}
          {/* Default route */}
          <Route path="/" element={<LandingPage />} />
          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />
          {/* SignUp Page Route */}
          <Route path="/signup" element={<SignUp />} />
          {/* CaseSubmission Form Route*/}
          <Route path="/casesubmission" element={<CaseSubmissionForm />} />
          {/* Protected Routes */}
          {/* Home Page Route */}
          <Route path="/home" element={<ProtectedRoute element={Home} />} />
          {/* Case Dashboard Page Route */}
          <Route
            path="/casedashboard"
            element={<ProtectedRoute element={CaseDashboard} />}
          />
          {/* Case Details Page Route */}
          <Route path="/cases/:caseId" element={<CaseDetails />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
