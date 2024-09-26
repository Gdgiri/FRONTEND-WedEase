import React, { useState } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase"; // Import your Firebase app

const CreateTransport = () => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [options, setOptions] = useState([{ label: "", price: 0 }]); // Start with one empty option
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const storage = getStorage(app); // Get Firebase storage instance

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `transports/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL); // Set the image URL after successful upload
        });
      }
    );
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { label: "", price: 0 }]); // Add a new empty option
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/createtransport",
        {
          name,
          imgUrl,
          options,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Transport created successfully!");
        setName(""); // Clear the form after success
        setImgUrl("");
        setOptions([{ label: "", price: 0 }]);
        setUploadProgress(0);
      }
    } catch (error) {
      setErrorMessage("Transport creation failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Transport</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Transport Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgUrl">Transport Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="form-control"
            required
          />
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
          {imgUrl && (
            <img src={imgUrl} alt="Uploaded" style={{ maxHeight: "150px" }} />
          )}
        </div>

        <div className="form-group">
          <label>Transport Options</label>
          {options.map((option, index) => (
            <div key={index} className="form-group d-flex">
              <input
                type="text"
                placeholder="Option Label"
                className="form-control me-2"
                value={option.label}
                onChange={(e) =>
                  handleOptionChange(index, "label", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="form-control me-2"
                value={option.price}
                onChange={(e) =>
                  handleOptionChange(index, "price", e.target.value)
                }
                required
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeOption(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addOption}
          >
            Add Option
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Transport
        </button>
      </form>
    </div>
  );
};

export default CreateTransport;
