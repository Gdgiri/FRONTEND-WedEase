import React, { useState } from "react";
import axios from "axios";
import { app } from "../firebase"; // Import app
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // Import necessary Firebase Storage functions
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const CreatePhotographer = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [packages, setPackages] = useState([
    { type: "", options: [{ label: "", price: 0 }] },
  ]);

  // Initialize storage using app
  const storage = getStorage(app);

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const handleOptionChange = (packageIndex, optionIndex, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex].options[optionIndex][field] = value;
    setPackages(updatedPackages);
  };

  const handleAddPackage = () => {
    setPackages([
      ...packages,
      { type: "", options: [{ label: "", price: 0 }] },
    ]);
  };

  const handleAddOption = (packageIndex) => {
    const updatedPackages = [...packages];
    updatedPackages[packageIndex].options.push({ label: "", price: 0 });
    setPackages(updatedPackages);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
  };

  const uploadImage = () => {
    if (imgFile) {
      const storageRef = ref(storage, `images/${imgFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url);
            alert("Image uploaded successfully!");
          });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/createphoto",
        {
          name,
          imgUrl, // Use the uploaded image URL
          packages,
        }
      );
      console.log(response.data);
      alert("Photographer created successfully");
      navigate("/photo"); // Navigate to the desired page after successful creation
    } catch (error) {
      console.error("Error creating photographer:", error);
      alert("Failed to create photographer");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Photographer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={uploadImage}
          >
            Upload Image
          </button>
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {progress}%
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Packages:</label>
          {packages.map((pkg, packageIndex) => (
            <div key={packageIndex} className="mb-3">
              <input
                type="text"
                placeholder="Package Type"
                className="form-control mb-2"
                value={pkg.type}
                onChange={(e) =>
                  handlePackageChange(packageIndex, "type", e.target.value)
                }
              />
              <h5>Options:</h5>
              {pkg.options.map((option, optionIndex) => (
                <div key={optionIndex} className="d-flex mb-2">
                  <input
                    type="text"
                    placeholder="Label"
                    className="form-control me-2"
                    value={option.label}
                    onChange={(e) =>
                      handleOptionChange(
                        packageIndex,
                        optionIndex,
                        "label",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="form-control"
                    value={option.price}
                    onChange={(e) =>
                      handleOptionChange(
                        packageIndex,
                        optionIndex,
                        "price",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() => handleAddOption(packageIndex)}
              >
                Add Option
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={handleAddPackage}
          >
            Add Package
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={!imgUrl}
        >
          Create Photographer
        </button>
      </form>
    </div>
  );
};

export default CreatePhotographer;
