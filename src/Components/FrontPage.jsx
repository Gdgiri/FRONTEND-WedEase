import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FrontPage = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <img
        src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
        alt="GD Events Logo"
        className="logo mb-4 w-200"
      />
      <h1 className="display-4 text-dark">
        <strong>Welcome to GD Events!</strong>
      </h1>
      <h2 className="lead text-secondary">
        Your gateway to unforgettable experiences.
      </h2>
      <p className="mb-4 text-muted">
        From intimate gatherings to grand celebrations, we help you create
        moments that matter. Explore our offerings and start your journey with
        us.
      </p>
      <Link to="/register" className="btn btn-primary btn-lg">
        Register Now
      </Link>
      <div>
        <span>Already a user?</span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default FrontPage;
