import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Extract the user's initial
  const userInitial =
    userData && userData.user && userData.user.username
      ? userData.user.username.charAt(0).toUpperCase()
      : "";

  return (
    <div className="container mt-5">
      <h1 className="text-center">Profile</h1>
      <div className="d-flex justify-content-center">
        {isAuthenticated ? (
          <div className="card text-center" style={{ width: "18rem" }}>
            <div className="card-header">
              <button
                className="btn btn-warning rounded-circle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  backgroundColor: "#6c757d",
                  color: "white",
                }}
              >
                {userInitial}
              </button>
            </div>
            <div className="card-body">
              <h5 className="card-title">{userData.user.username}</h5>
              <p className="card-text">{userData.user.email}</p>
            </div>
            <div className="card-footer text-muted">
              <button className="btn btn-success w-100">
                <Link to="/edit-profile" className="text-white">
                  Edit Profile
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <h1>No profile</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
