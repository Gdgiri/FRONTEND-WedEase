import React, { useState } from "react";
import { app } from "../firebase"; // Import Firebase app
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

// Initialize Firebase Storage
const storage = getStorage(app);

const EntertainerForm = () => {
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [options, setOptions] = useState([{ label: "", price: 0 }]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index][e.target.name] = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { label: "", price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imgFile) {
      setErrorMessage("Please upload an image.");
      return;
    }

    const storageRef = ref(storage, `entertainers/${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile); // Use uploadBytesResumable

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setErrorMessage("Upload failed. Please try again.");
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Use uploadTask.snapshot.ref
        const entertainerData = {
          name,
          imgUrl: downloadURL,
          options,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/api/event/createentertain",
            entertainerData
          );
          setSuccessMessage(response.data.message);
          setErrorMessage("");
        } catch (error) {
          setErrorMessage("Failed to create entertainer. Please try again.");
          console.error(error);
        }
      }
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Create Entertainer</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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

        <h5>Options</h5>
        {options.map((option, index) => (
          <div key={index} className="mb-3">
            <input
              type="text"
              className="form-control"
              name="label"
              placeholder="Option Label"
              value={option.label}
              onChange={(e) => handleOptionChange(index, e)}
              required
            />
            <input
              type="number"
              className="form-control mt-2"
              name="price"
              placeholder="Price"
              value={option.price}
              onChange={(e) => handleOptionChange(index, e)}
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addOption}
        >
          Add Option
        </button>

        <button type="submit" className="btn btn-primary">
          Create Entertainer
        </button>
      </form>
    </div>
  );
};

export default EntertainerForm;
