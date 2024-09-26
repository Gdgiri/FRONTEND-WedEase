import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EntertainerSelection = () => {
  const [entertainers, setEntertainers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalEntertainAmount, setTotalEntertainAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchEntertainers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/event/getenter"
      );
      setEntertainers(response.data.result); // Assuming your backend sends the correct data
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to fetch entertainers. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntertainers();
  }, []);

  const handleOptionChange = (entertainerId, option, isChecked) => {
    const newSelectedOptions = { ...selectedOptions };

    if (isChecked) {
      newSelectedOptions[entertainerId] =
        newSelectedOptions[entertainerId] || [];
      newSelectedOptions[entertainerId].push(option);
    } else {
      newSelectedOptions[entertainerId] = newSelectedOptions[
        entertainerId
      ].filter((opt) => opt.label !== option.label);
    }

    setSelectedOptions(newSelectedOptions);
    calculateTotal(newSelectedOptions);
  };

  const calculateTotal = (options) => {
    let total = 0;
    Object.values(options).forEach((optionList) => {
      if (optionList) {
        optionList.forEach((opt) => {
          total += opt.price;
        });
      }
    });
    setTotalEntertainAmount(total);
  };

  // New function to handle navigation to dashboard
  const handleBook = () => {
    const selectedItems = Object.keys(selectedOptions).map((key) => ({
      entertainerId: key,
      options: selectedOptions[key],
    }));

    // Create a combined object
    const bookingData = {
      selectedItems,
      totalEntertainAmount,
    };

    localStorage.setItem("totalEntertainAmount", totalEntertainAmount);
    navigate("/displayuser", { state: bookingData });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Select Entertainers</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="row">
        {entertainers.length > 0 ? (
          entertainers.map((entertainer) => (
            <div key={entertainer._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={entertainer.imgUrl}
                  className="card-img-top"
                  alt={entertainer.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{entertainer.name}</h5>
                  <h6>Options:</h6>
                  <div>
                    {entertainer.options.map((option, index) => (
                      <div key={index} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`option-${entertainer._id}-${index}`}
                          onChange={(e) =>
                            handleOptionChange(
                              entertainer._id,
                              option,
                              e.target.checked
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option-${entertainer._id}-${index}`}
                        >
                          {option.label} - ${option.price}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No entertainers available.</p>
        )}
      </div>
      <div className="mt-4">
        <h4>Total Amount: ${totalEntertainAmount}</h4>
      </div>
      <button className="btn btn-primary" onClick={handleBook}>
        Proceed to Dashboard
      </button>
    </div>
  );
};

export default EntertainerSelection;
