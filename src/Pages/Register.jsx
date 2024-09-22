import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/Actions/authActions";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(resultAction)) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(
          resultAction.payload || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row bg-white rounded shadow-lg overflow-hidden w-75">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <img
            src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
            alt="GD Events"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 p-4">
          <h2 className="mb-4 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter Your Username"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@company.com"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter Your Password"
              />
            </div>
            <div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-2">
                  Register
                </button>
              </div>
              <div>
                <Link to="/forgot">forgot password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
