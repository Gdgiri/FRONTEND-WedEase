import React, { useState } from "react";
import axios from "axios";
import { app } from "../firebase"; // Import your Firebase app
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage"; // Import storage functions

const CreateEventStylist = () => {
  const [name, setName] = useState("");
  const [services, setServices] = useState([{ label: "", price: "" }]);
  const [imgFile, setImgFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleAddService = () => {
    setServices([...services, { label: "", price: "" }]);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgFile) {
      setErrorMessage("Please upload an image.");
      return;
    }

    const storage = getStorage(app); // Access storage from app
    const storageRef = ref(storage, `event-stylists/${imgFile.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, imgFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const response = await axios.post(
        "http://localhost:5000/api/event/createstyle",
        {
          name,
          imgUrl: downloadURL,
          services,
        }
      );
      setSuccessMessage(response.data.message);
      // Clear fields
      setName("");
      setServices([{ label: "", price: "" }]);
      setImgFile(null);
    } catch (error) {
      setErrorMessage("Failed to create event stylist. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Event Stylist</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {services.map((service, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">Service Label</label>
            <input
              type="text"
              className="form-control"
              value={service.label}
              onChange={(e) =>
                handleServiceChange(index, "label", e.target.value)
              }
              required
            />
            <label className="form-label">Service Price</label>
            <input
              type="number"
              className="form-control"
              value={service.price}
              onChange={(e) =>
                handleServiceChange(index, "price", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddService}
        >
          Add Service
        </button>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event Stylist
        </button>
      </form>
    </div>
  );
};

export default CreateEventStylist;
