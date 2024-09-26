// BeauticianForm.js
import React, { useState } from "react";
import axios from "axios";
import { app } from "../firebase"; // Import Firebase app instance
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const BeauticianForm = () => {
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [services, setServices] = useState([{ label: "", price: 0 }]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleServiceChange = (index, e) => {
    const newServices = [...services];
    newServices[index][e.target.name] = e.target.value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { label: "", price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imgFile) {
      setErrorMessage("Please upload an image.");
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, `beauticians/${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setErrorMessage("Image upload failed. Please try again.");
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const beauticianData = {
          name,
          imgUrl: downloadURL,
          services,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/event/createbeauty",
            beauticianData
          );
          setSuccessMessage(response.data.message);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage("Failed to create beautician. Please try again.");
          console.error(error);
        }
      }
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Create Beautician</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Beautician Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image Upload</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {uploadProgress > 0 && (
            <div className="progress mt-2">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          )}
        </div>

        <h5>Services</h5>
        {services.map((service, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              className="form-control"
              name="label"
              placeholder="Service Label"
              value={service.label}
              onChange={(e) => handleServiceChange(index, e)}
              required
            />
            <input
              type="number"
              className="form-control mt-2"
              name="price"
              placeholder="Service Price"
              value={service.price}
              onChange={(e) => handleServiceChange(index, e)}
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addService}
        >
          Add Service
        </button>

        <button type="submit" className="btn btn-primary">
          Create Beautician
        </button>
      </form>
    </div>
  );
};

export default BeauticianForm;
