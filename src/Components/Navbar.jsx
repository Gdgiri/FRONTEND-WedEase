import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  // Extract the first letter of the username
  const userInitial = user ? user.username.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <div className="navbar-nav mx-auto text-center">
            <Link to="/" className={`nav-link ${path === "/" ? "active" : ""}`}>
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-link ${path === "/about" ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              to="/events"
              className={`nav-link ${path === "/events" ? "active" : ""}`}
            >
              Events
            </Link>
          </div>

          <div className="d-flex justify-content-center">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-warning rounded-circle dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    backgroundColor: "#6c757d",
                    color: "white",
                  }}
                >
                  {userInitial}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end text-center"
                  aria-labelledby="userDropdown"
                >
                  <li className="d-flex justify-content-center mb-2">
                    <Link
                      className="btn btn-success profile text-white w-100"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="d-flex justify-content-center">
                    <button
                      className="btn btn-danger logout text-white w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-success w-100 w-md-auto">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
