import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProfile } from "../Redux/Reducers/profileSlice"; // Correct action
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (img) {
      uploadFile(img);
    }
  }, [img]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      gender: "",
      photo: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
      gender: Yup.string().required("Gender is required"),
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const res = await axios.post(
          "http://localhost:5000/api/profile/create",
          {
            name: values.name,
            email: values.email,
            age: values.age,
            gender: values.gender,
            imgUrl: values.photo,
          }
        );
        dispatch(createProfile(res.data.result));
        toast.success("Profile created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } catch (error) {
        console.error(
          "Error creating profile:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to create profile. Please try again.");
        toast.error("Failed to create profile. Please try again.");
      }
    },
  });

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        setError("Upload failed. Please try again.");
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          formik.setFieldValue("photo", downloadURL);
          setImgPerc(0);
          setImg(undefined);
        });
      }
    );
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-55 pt-1 m-5 ">
      <div className="row bg-white rounded shadow-lg overflow-hidden w-80">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <img
            src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
            alt="GD Events Logo"
            className="img-fluid mb-4"
          />
        </div>
        <div className="col-md-4">
          <ToastContainer />
          <h2 className="text-center">Create New Profile</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Form Fields */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                className="form-control"
                placeholder="Enter your age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger">{formik.errors.age}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="" label="Select gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="Other" label="Other" />
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger">{formik.errors.gender}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Upload Photo
              </label>
              {imgPerc > 0 && (
                <div className="progress mb-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${imgPerc}%` }}
                    aria-valuenow={imgPerc}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {imgPerc}%
                  </div>
                </div>
              )}
              <input
                type="file"
                id="photo"
                className="form-control"
                accept="image/*"
                onChange={(event) => {
                  if (event.currentTarget.files[0]) {
                    setImg(event.currentTarget.files[0]);
                  }
                }}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.photo && formik.errors.photo && (
                <div className="text-danger">{formik.errors.photo}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Profile
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
