import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img
              src="https://github.com/user-attachments/assets/0cda7b2d-fc0f-46c4-9e10-c6de3c2a4812"
              alt="GD-Events"
              width={30}
              height={24}
              className="d-inline-block align-text-top"
            />
          </Link>

          <Link className="navbar-brand" to="#">
            GD-Events
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <form className="d-flex mx-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <br />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="navbar-nav mx-auto text-center">
              <Link
                to="/"
                className={`nav-link ${path === "/" ? "active" : ""}`}
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-link ${path === "/about" ? "active" : ""}`}
                aria-current="page"
              >
                About
              </Link>
              <Link
                to="/events"
                className={`nav-link ${path === "/events" ? "active" : ""}`}
                aria-current="page"
              >
                Events
              </Link>
              <Link className="nav-link disabled" aria-disabled="true">
                Dashboard
              </Link>
            </div>
            <div className="d-flex justify-content-center ">
              <Link to="/login" className="btn btn-success w-100 w-md-auto">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
