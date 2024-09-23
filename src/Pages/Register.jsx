import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/Actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formMessage, setFormMessage] = useState(""); // State for success/error messages

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setFormMessage(""); // Reset any previous messages
    try {
      const resultAction = await dispatch(registerUser(values));
      // console.log("hai", resultAction);

      // if (registerUser.fulfilled.match(resultAction)) {
      //   resetForm();
      //   setFormMessage("Registration successful! You can now log in."); // Set success message

      //   navigate("/login");
      // } else {
      //   // Set failure message if registration fails
      //   setFormMessage(
      //     resultAction.payload.message || "Registration failed. Please try again."
      //   );
      // }

      if (resultAction.meta.requestStatus === "fulfilled") {
        resetForm();
        setFormMessage(resultAction.payload.message); // Use success message from payload
        navigate("/login");
      } else {
        // Handle failure message if registration fails
        setFormMessage(
          resultAction.payload.message ||
            "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setFormMessage("An unexpected error occurred");
      console.log(error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-55 pt-1 m-5">
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
          {formMessage && (
            <div
              className={`alert ${
                formMessage.includes("successful")
                  ? "alert-success"
                  : "alert-danger"
              } mb-3`}
            >
              {formMessage}
            </div>
          )}

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter Your Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <span>Already a user?</span> <Link to="/login">Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
