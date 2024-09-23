import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Authentication

import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AuthenticatedRoute from "./Components/AuthenticateRoute";
import FrontPage from "./Components/FrontPage";

// Profiles
import Profile from "./Pages/Profile";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Authentications */}

          <Route path="/" element={<FrontPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={<AuthenticatedRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/user"
            element={<AuthenticatedRoute element={<UserDashboard />} />}
          />
          <Route path="/login" element={<Login />} />

          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />

          {/* profiles */}

          <Route path="/profile" element={<Profile />} />
         
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
