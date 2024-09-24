import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/authActions";

const Navbar = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Extract the user's initial
  const userInitial =
    userData && userData.user && userData.user.username
      ? userData.user.username.charAt(0).toUpperCase()
      : "";

  // Color arrays
  const whiteTextColors = [
    "#6c757d", "#007bff", "#28a745", "#dc3545", "#ffc107", 
    "#6610f2", "#17a2b8", "#e83e8c", "#fd7e14", "#343a40"
  ];
  const blackTextColors = [
    "#f8f9fa", "#ffeeba", "#e9ecef", "#ced4da", "#adb5bd",
    "#f1f3f5", "#dee2e6", "#c6c8ca", "#d1d3e2", "#e2e3e5"
  ];

  // State to store the chosen color and text color
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: whiteTextColors[0],
    color: "white",
  });

  // Function to select a random color from either array
  const getRandomColor = () => {
    const isWhiteText = Math.random() < 0.5; // 50% chance for white or black text
    if (isWhiteText) {
      const color = whiteTextColors[Math.floor(Math.random() * whiteTextColors.length)];
      return { backgroundColor: color, color: "white" };
    } else {
      const color = blackTextColors[Math.floor(Math.random() * blackTextColors.length)];
      return { backgroundColor: color, color: "black" };
    }
  };

  // Set random color and text when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const style = getRandomColor();
      setButtonStyle(style);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="#">
          <img
            src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
            alt="GD-Events"
            width={30}
            height={24}
            className="d-inline-block align-text-top"
          />
        </Link>

        {/* Website Name */}
        <Link className="navbar-brand" to="#">
          GD-Events
        </Link>

        {/* Toggler button for small screens */}
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

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto text-center">
            <Link
              to="/"
              className={`nav-link ${path === "/" ? "active" : ""}`}
            >
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

          {/* User Dropdown or Login Button */}
          <div className="d-flex justify-content-center">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn rounded-circle dropdown-toggle"
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
                    ...buttonStyle, // Apply the random color and text style here
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
