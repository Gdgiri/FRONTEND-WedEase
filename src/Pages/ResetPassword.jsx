import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row bg-white rounded shadow-lg overflow-hidden w-75">
          <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
            <img
              src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
              alt="GD Events"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 p-5 mt-5">
            <h2 className="mb-4 text-center">Reset Password</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Password"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Your Password"
                />
              </div>

              <div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary mt-2">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
