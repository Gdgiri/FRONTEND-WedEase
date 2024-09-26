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

const CreateFoodItem = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("veg");
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState([{ label: "", price: 0 }]);

  // Initialize storage using app
  const storage = getStorage(app);

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { label: "", price: 0 }]);
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
        "http://localhost:5000/api/event/createfood",
        {
          category,
          name,
          imgUrl, // Use the uploaded image URL
          options,
        }
      );
      console.log(response.data);
      alert("Food item added successfully");
      handleNavigate();
    } catch (error) {
      console.error("Error creating food item:", error);
      alert("Failed to add food item");
    }
    const handleNavigate = () => {
      navigate("/");
    };
  };

  return (
    <div className="container mt-4">
      <h2>Create Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>

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
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                placeholder="Label"
                className="form-control me-2"
                value={option.label}
                onChange={(e) =>
                  handleOptionChange(index, "label", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="form-control"
                value={option.price}
                onChange={(e) =>
                  handleOptionChange(index, "price", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleAddOption}
          >
            Add Option
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={!imgUrl}
        >
          Create Food Item
        </button>
      </form>
    </div>
  );
};

export default CreateFoodItem;
