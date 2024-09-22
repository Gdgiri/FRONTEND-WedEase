import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
