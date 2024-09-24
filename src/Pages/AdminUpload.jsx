import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEvent } from "../Redux/Reducers/eventSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUpload = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (img) {
      uploadFile(img, "venueImg");
    }
  }, [img]);

  const formik = useFormik({
    initialValues: {
      venueImg: "",
      venueName: "",
      venuePlace: "",
      venueAmount: "",
      cateringName: "",
      cateringAmount: "",
      photographerName: "",
      photographerAmount: "",
      eventStylistName: "",
      eventStylistAmount: "",
      entertainerName: "",
      entertainerAmount: "",
      beauticianName: "",
      beauticianAmount: "",
      transportName: "",
      transportAmount: "",
    },
    validationSchema: Yup.object({
      venueImg: Yup.string().required("venueImg is required"),
      venueName: Yup.string().required("venueName is required"),
      venuePlace: Yup.string().required("venuePlace is required"),
      venueAmount: Yup.string().required("venueAmount is required"),
      cateringName: Yup.string().required("cateringName is required"),
      cateringAmount: Yup.string().required("cateringAmount is required"),
      photographerName: Yup.string().required("photographerName is required"),
      photographerAmount: Yup.string().required(
        "photographerAmount is required"
      ),
      eventStylistName: Yup.string().required("eventStylistName is required"),
      eventStylistAmount: Yup.string().required(
        "eventStylistAmount is required"
      ),
      entertainerName: Yup.string().required("entertainerName is required"),
      entertainerAmount: Yup.string().required("entertainerAmount is required"),
      beauticianName: Yup.string().required("beauticianName is required"),
      beauticianAmount: Yup.string().required("beauticianAmount is required"),
      transportName: Yup.string().required("transportName is required"),
      transportAmount: Yup.string().required("transportAmount is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        console.log("Submitting:", values);
        const res = await axios.post(
          "http://localhost:5000/api/event/create",
          values
        );
        console.log("Server Response:", res.data);
        dispatch(createEvent(res.data.result));
        toast.success("Event created successfully");
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.log(
          "Error creating event:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to create event. Please try again.");
        toast.error("Failed to create event. Please try again.");
      }
    },
  });

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileType + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (fileType === "venueImg") {
          setImgPerc(Math.round(progress));
        }
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          formik.setFieldValue("venueImg", downloadURL);
          setImgPerc(0);
        });
      }
    );
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card shadow">
            <div className="card-header text-center">
              <h4>Upload Events</h4>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="venueImg">Venue Image:</label>
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
                    name="venueImg"
                    id="venueImg"
                    className="form-control-file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  {formik.touched.venueImg && formik.errors.venueImg && (
                    <div className="text-danger">{formik.errors.venueImg}</div>
                  )}
                </div>

                {/* Create a function to generate input fields */}
                {[
                  { label: "Venue Name", name: "venueName", type: "text" },
                  { label: "Venue Place", name: "venuePlace", type: "text" },
                  {
                    label: "Venue Amount",
                    name: "venueAmount",
                    type: "number",
                  },
                  {
                    label: "Catering Name",
                    name: "cateringName",
                    type: "text",
                  },
                  {
                    label: "Catering Amount",
                    name: "cateringAmount",
                    type: "number",
                  },
                  {
                    label: "Photographer Name",
                    name: "photographerName",
                    type: "text",
                  },
                  {
                    label: "Photographer Amount",
                    name: "photographerAmount",
                    type: "number",
                  },
                  {
                    label: "Event Stylist Name",
                    name: "eventStylistName",
                    type: "text",
                  },
                  {
                    label: "Event Stylist Amount",
                    name: "eventStylistAmount",
                    type: "number",
                  },
                  {
                    label: "Entertainer Name",
                    name: "entertainerName",
                    type: "text",
                  },
                  {
                    label: "Entertainer Amount",
                    name: "entertainerAmount",
                    type: "number",
                  },
                  {
                    label: "Beautician Name",
                    name: "beauticianName",
                    type: "text",
                  },
                  {
                    label: "Beautician Amount",
                    name: "beauticianAmount",
                    type: "number",
                  },
                  {
                    label: "Transport Name",
                    name: "transportName",
                    type: "text",
                  },
                  {
                    label: "Transport Amount",
                    name: "transportAmount",
                    type: "number",
                  },
                ].map(({ label, name, type }) => (
                  <div className="form-group mb-4" key={name}>
                    <label htmlFor={name}>{label}:</label>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      className="form-control"
                      placeholder={`Enter the ${label.toLowerCase()}`}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <div className="text-danger">{formik.errors[name]}</div>
                    )}
                  </div>
                ))}

                <button type="submit" className="btn btn-primary btn-block">
                  Create Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
    </div>
  );
};

export default AdminUpload;
