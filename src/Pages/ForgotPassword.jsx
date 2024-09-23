import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-55 pt-1 m-5">
      <div className="row bg-white rounded shadow-lg overflow-hidden w-75 ">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4 ">
          <img
            src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
            alt="GD Events"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 p-5 mt-5  ">
          <h2 className="mb-4 text-center">Forgot Password</h2>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form m-2 pt-5">
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

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success mt-2"
                    disabled={isSubmitting}
                  >
                    Send Mail
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
