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
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUpload = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({});
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
        const res = await axios.post("http://localhost:5000/api/event/create", {
          venueImg: values.venueImg,
          venueName: values.venueName,
          venuePlace: values.venuePlace,
          venueAmount: values.venueAmount,
          cateringName: values.cateringName,
          cateringAmount: values.cateringAmount,
          photographerName: values.photographerName,
          photographerAmount: values.photographerAmount,
          eventStylistName: values.eventStylistName,
          eventStylistAmount: values.eventStylistAmount,
          entertainerName: values.entertainerName,
          entertainerAmount: values.entertainerAmount,
          beauticianName: values.beauticianName,
          beauticianAmount: values.beauticianAmount,
          transportName: values.transportName,
          transportAmount: values.transportAmount,
        });
        console.log("Server Response:", res.data);
        dispatch(createEvent(res.data.result));
        toast.success("event created successfully");
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.log(
          "Error creating event:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to create event. please try again.");
        toast.error("Failed to create event. please try again.");
      }
    },
  });

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "imgUrl";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (fileType === "imgUrl") {
          setImgPerc(Math.round(progress));
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          formik.setFieldValue("venueImg", downloadURL);
          setImgPerc(0);

          setInputs((prev) => {
            return {
              ...prev,
              [fileType]: downloadURL,
            };
          });
        });
      }
    );
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       console.log("Sending data:", inputs); // Log data
  //       const res = await axios.post("http://localhost:5000/api", inputs);
  //       if (res.status === 200 || res.status === 201) {
  //         navigate("/data");
  //         console.log("url added", res.data);
  //       } else {
  //         setError("Failed to add url. Please try again.");
  //       }
  //       // window.location.reload();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h4>Upload Events</h4>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="venueImg">Venue-Image:</label>
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
                      <div className="text-danger">
                        {formik.errors.venueImg}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="venueName">Venue-Name:</label>
                    <input
                      type="text"
                      name="venueName"
                      id="venueName"
                      className="form-controler"
                      placeholder="Enter the venue-name"
                      value={formik.values.venueName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.venueName && formik.errors.venueName && (
                      <div className="text-danger">
                        {formik.errors.venueName}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="venuePlace">Venue-Place:</label>
                    <input
                      type="text"
                      name="venuePlace"
                      id="venuePlace"
                      className="form-controler"
                      placeholder="Enter the venue-place"
                      value={formik.values.venuePlace}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.venuePlace && formik.errors.venuePlace && (
                      <div className="text-danger">
                        {formik.errors.venuePlace}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="venueAmount">Venue-Amount:</label>
                    <input
                      type="number"
                      name="venueAmount"
                      id="venueAmount"
                      className="form-controler"
                      placeholder="Enter the venue-amount"
                      value={formik.values.venueAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.venueAmount &&
                      formik.errors.venueAmount && (
                        <div className="text-danger">
                          {formik.errors.venueAmount}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cateringName">Catering-Name:</label>
                    <input
                      type="text"
                      name="cateringName"
                      id="cateringName"
                      className="form-controler"
                      placeholder="Enter the catering-name"
                      value={formik.values.cateringName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.cateringName &&
                      formik.errors.cateringName && (
                        <div className="text-danger">
                          {formik.errors.cateringName}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cateringAmount">Catering-Amount:</label>
                    <input
                      type="number"
                      name="cateringAmount"
                      id="cateringAmount"
                      className="form-controler"
                      placeholder="Enter the catering-amount"
                      value={formik.values.cateringAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.cateringAmount &&
                      formik.errors.cateringAmount && (
                        <div className="text-danger">
                          {formik.errors.cateringAmount}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="photographerName">Photographer-Name:</label>
                    <input
                      type="text"
                      name="photographerName"
                      id="photographerName"
                      className="form-controler"
                      placeholder="Enter the photographer-name"
                      value={formik.values.photographerName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.photographerName &&
                      formik.errors.photographerName && (
                        <div className="text-danger">
                          {formik.errors.photographerName}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="photographerAmount">
                      Photographer-Amount:
                    </label>
                    <input
                      type="number"
                      name="photographerAmount"
                      id="photographerAmount"
                      className="form-controler"
                      placeholder="Enter the photographer-amount"
                      value={formik.values.photographerAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.photographerAmount &&
                      formik.errors.photographerAmount && (
                        <div className="text-danger">
                          {formik.errors.photographerAmount}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="eventStylistName">Eventstylist-Name:</label>
                    <input
                      type="text"
                      name="eventStylistName"
                      id="eventStylistName"
                      className="form-controler"
                      placeholder="Enter the EventStylist-name"
                      value={formik.values.EventStylistName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.eventStylistName &&
                      formik.errors.eventStylistName && (
                        <div className="text-danger">
                          {formik.errors.eventStylistName}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="eventStylistAmount">
                      EventStylist-Amount:
                    </label>
                    <input
                      type="number"
                      name="eventStylistAmount"
                      id="eventStylistAmount"
                      className="form-controler"
                      placeholder="Enter the photographer-name"
                      value={formik.values.eventStylistAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.eventStylistAmount &&
                      formik.errors.eventStylistAmount && (
                        <div className="text-danger">
                          {formik.errors.eventStylistAmount}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="entertainerName">Entertainer-Name:</label>
                    <input
                      type="text"
                      name="entertainerName"
                      id="entertainerName"
                      className="form-controler"
                      placeholder="Enter the entertainer-name"
                      value={formik.values.entertainerName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.entertainerName &&
                      formik.errors.entertainerName && (
                        <div className="text-danger">
                          {formik.errors.entertainerName}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="entertainerAmount">
                      Entertainer-Amount:
                    </label>
                    <input
                      type="number"
                      name="entertainerAmount"
                      id="entertainerAmount"
                      className="form-controler"
                      placeholder="Enter the entertainer-amount"
                      value={formik.values.entertainerAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.entertainerAmount &&
                      formik.errors.entertainerAmount && (
                        <div className="text-danger">
                          {formik.errors.entertainerAmount}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="beauticianName">Beautician-Name:</label>
                    <input
                      type="text"
                      name="beauticianName"
                      id="beauticianName"
                      className="form-controler"
                      placeholder="Enter the beautician-name"
                      value={formik.values.beauticianName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.beauticianName &&
                      formik.errors.beauticianName && (
                        <div className="text-danger">
                          {formik.errors.beauticianName}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="beauticianAmount">Beautician-Amount:</label>
                    <input
                      type="number"
                      name="beauticianAmount"
                      id="beauticianAmount"
                      className="form-controler"
                      placeholder="Enter the beautician-amount"
                      value={formik.values.beauticianAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.beauticianAmount &&
                      formik.errors.beauticianAmount && (
                        <div className="text-danger">
                          {formik.errors.beauticianAmount}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="transportName">Transport-Name:</label>
                    <input
                      type="text"
                      name="transportName"
                      id="transportName"
                      className="form-controler"
                      placeholder="Enter the transport-name"
                      value={formik.values.transportName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.transportName &&
                      formik.errors.transportName && (
                        <div className="text-danger">
                          {formik.errors.transportName}
                        </div>
                      )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="transportAmount">Transport-Amount:</label>
                    <input
                      type="number"
                      name="transportAmount"
                      id="transportAmount"
                      className="form-controler"
                      placeholder="Enter the transport-amount"
                      value={formik.values.transportAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.transportAmount &&
                      formik.errors.transportAmount && (
                        <div className="text-danger">
                          {formik.errors.transportAmount}
                        </div>
                      )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminUpload;
