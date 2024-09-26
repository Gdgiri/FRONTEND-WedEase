import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  place: Yup.string().required("Place is required"),
  eventName: Yup.string().required("Event name is required"),
});

const EventForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      place: "",
      eventName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Navigate to the dashboard page and pass form data
      navigate("/dashboard", { state: values });
    },
  });

  return (
    <div className="container mt-4 p-4 shadow bg-light rounded">
      <h2 className="text-center mb-4">Event Registration</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="form-group mb-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className={`form-control ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
          )}
        </div>

        {/* Place Field */}
        <div className="form-group mb-3">
          <label htmlFor="place">Place</label>
          <input
            id="place"
            name="place"
            type="text"
            className={`form-control ${
              formik.touched.place && formik.errors.place ? "is-invalid" : ""
            }`}
            value={formik.values.place}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.place && formik.errors.place && (
            <div className="invalid-feedback">{formik.errors.place}</div>
          )}
        </div>

        {/* Event Name Field */}
        <div className="form-group mb-3">
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            className={`form-control ${
              formik.touched.eventName && formik.errors.eventName
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.eventName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.eventName && formik.errors.eventName && (
            <div className="invalid-feedback">{formik.errors.eventName}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Continue
        </button>
      </form>
    </div>
  );
};

export default EventForm;
