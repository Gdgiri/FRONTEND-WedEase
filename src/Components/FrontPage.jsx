import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FrontPage = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-55  pt-2 bg-light text-center p-4">
      <img
        src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
        alt="GD Events Logo"
        className="logo mb-3 w-200"
      />
      <h1 className="display-5 text-dark">
        <strong>Welcome to GD Events!</strong>
      </h1>
      <h2 className="lead text-secondary">
        Your gateway to unforgettable experiences.
      </h2>
      <p className="mb-3 text-muted">
        From intimate gatherings to grand celebrations, we help you create
        moments that matter. Explore our offerings and start your journey with
        us.
      </p>
      <Link to="/register" className="btn btn-primary btn-lg mb-2">
        Register Now
      </Link>
      <div className="text-secondary">
        <span>Already a user? </span>
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
