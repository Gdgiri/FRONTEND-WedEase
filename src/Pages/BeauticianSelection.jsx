// BeauticianSelection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const BeauticianSelection = () => {
  const [beauticians, setBeauticians] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchBeauticians = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getbeauty"
        );
        setBeauticians(response.data.result);
      } catch (error) {
        setErrorMessage("Failed to fetch beauticians. Please try again.");
        console.error(error);
      }
    };

    fetchBeauticians();
  }, []);

  const handleCheckboxChange = (
    beauticianId,
    serviceLabel,
    price,
    isChecked
  ) => {
    const newSelectedServices = { ...selectedServices };

    if (!newSelectedServices[beauticianId]) {
      newSelectedServices[beauticianId] = {};
    }

    if (isChecked) {
      newSelectedServices[beauticianId][serviceLabel] = price;
    } else {
      delete newSelectedServices[beauticianId][serviceLabel];
    }

    setSelectedServices(newSelectedServices);
    calculateTotalPrice(newSelectedServices);
  };

  const calculateTotalPrice = (services) => {
    let total = 0;
    for (const beauticianId in services) {
      for (const price of Object.values(services[beauticianId])) {
        total += price;
      }
    }
    setTotalPrice(total);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Structure the selected data as needed
    const selected = {
      selectedServices,
      totalPrice,
    };

    localStorage.setItem("totalPrice", totalPrice);
    navigate("/displayuser", { state: selected }); // Pass selected packages and total photo amount
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Select Beautician Services</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          {beauticians.length > 0 ? (
            beauticians.map((beautician) => (
              <div className="col-md-4 mb-4" key={beautician._id}>
                <div className="card">
                  <img
                    src={beautician.imgUrl}
                    className="card-img-top"
                    alt={beautician.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{beautician.name}</h5>
                    <h6>Services:</h6>
                    {beautician.services.map((service, index) => (
                      <div key={index} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`${beautician._id}-${index}`}
                          onChange={(e) =>
                            handleCheckboxChange(
                              beautician._id,
                              service.label,
                              service.price,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${beautician._id}-${index}`}
                        >
                          {service.label} - ₹{service.price}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No beauticians available.</div>
          )}
        </div>
        <h3 className="text-center mt-4">Total Price: ₹{totalPrice}</h3>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeauticianSelection;
