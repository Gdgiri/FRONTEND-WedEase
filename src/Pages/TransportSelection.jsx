import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase"; // Import your Firebase app

const TransportSelection = () => {
  const [transports, setTransports] = useState([]); // Initialize as an empty array
  const [selectedServices, setSelectedServices] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate(); // Initialize navigate
  const storage = getStorage(app); // Get Firebase storage instance

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/gettransport"
        );
        if (Array.isArray(response.data.result)) {
          setTransports(response.data.result);
        } else {
          setErrorMessage("Unexpected response format. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch transports. Please try again.");
        console.error(error);
      }
    };
    fetchTransports();
  }, []);

  const handleServiceChange = (transportId, serviceLabel, servicePrice) => {
    const currentServices = { ...selectedServices };
    const key = `${transportId}-${serviceLabel}`;

    if (currentServices[key]) {
      delete currentServices[key];
      setTotalAmount((prev) => prev - servicePrice);
    } else {
      currentServices[key] = { label: serviceLabel, price: servicePrice };
      setTotalAmount((prev) => prev + servicePrice);
    }

    setSelectedServices(currentServices);
  };

  const handleSubmit = () => {
    const selectedItems = Object.values(selectedServices);
    navigate("/dashboard", { state: { totalAmount, selectedItems } });
  };

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
        console.error("Image upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // You can now use the downloadURL for the transport image
        });
      }
    );
  };

  return (
    <div className="container mt-4">
      <h2>Transport Selection</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {transports.length === 0 ? (
        <p>No transports available.</p>
      ) : (
        <div className="row">
          {transports.map((transport) => (
            <div className="col-md-4 mb-4" key={transport._id}>
              <div className="card">
                <img
                  src={transport.imgUrl}
                  alt={transport.name}
                  className="card-img-top"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{transport.name}</h5>
                  <ul className="list-group list-group-flush">
                    {transport.options.map((option, index) => (
                      <li key={index} className="list-group-item">
                        <label>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleServiceChange(
                                transport._id,
                                option.label,
                                option.price
                              )
                            }
                          />
                          {option.label}: ₹{option.price}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <h4>Total Amount: ₹{totalAmount}</h4>
      <input type="file" onChange={handleImageUpload} />
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={totalAmount === 0}
      >
        Proceed to Dashboard
      </button>
    </div>
  );
};

export default TransportSelection;
