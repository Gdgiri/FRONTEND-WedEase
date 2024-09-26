import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const FoodSelection = () => {
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVeg, setShowVeg] = useState(true); // State to toggle between veg and non-veg
  const [selectedItems, setSelectedItems] = useState({}); // Track selected items
  const [totalAmount, setTotalAmount] = useState(0); // Track total amount
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/event/getfood"); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFoodData(data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  const handleVegClick = () => {
    setShowVeg(true);
  };

  const handleNonVegClick = () => {
    setShowVeg(false);
  };

  const handleCheckboxChange = (optionId, price, label) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[optionId]) {
        // If already selected, remove it
        delete updatedItems[optionId];
        setTotalAmount((prevTotal) => prevTotal - price); // Subtract price directly
      } else {
        // If not selected, add it
        updatedItems[optionId] = { label, price };
        setTotalAmount((prevTotal) => prevTotal + price); // Add price directly
      }
      return updatedItems;
    });
  };

  const handleSubmit = () => {
    navigate("/", { state: { selectedItems, totalAmount } }); // Pass selected items and total amount to Dashboard
  };

  // Filter food data based on search query
  const filteredFoodData = (showVeg ? foodData?.veg : foodData?.nonVeg)?.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!foodData) {
    return (
      <div className="alert alert-warning">No food options available.</div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="mx-auto">
        <button className="btn btn-primary">Add Food</button>
      </div>

      <h2 className="text-center">Food Selection</h2>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success mx-2" onClick={handleVegClick}>
          Vegetarian Options
        </button>
        <button className="btn btn-danger mx-2" onClick={handleNonVegClick}>
          Non-Vegetarian Options
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h3 className="text-center">
        {showVeg ? "Vegetarian" : "Non-Vegetarian"} Options
      </h3>
      {filteredFoodData && filteredFoodData.length > 0 ? (
        filteredFoodData.map((item) => (
          <div key={item._id} className="card mb-3">
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <img
                src={item.imgUrl}
                alt={item.name}
                className="img-fluid mb-3"
                style={{ maxWidth: "200px", height: "auto" }}
              />
              <h5>Options:</h5>
              <ul className="list-group">
                {item.options.map((option) => (
                  <li className="list-group-item" key={option.label}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCheckboxChange(
                            option.label, // Using label for option ID
                            option.price,
                            option.label
                          )
                        }
                        checked={!!selectedItems[option.label]} // Using label for checking
                      />
                      {option.label} - Price: ₹{option.price}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-warning">
          No {showVeg ? "vegetarian" : "non-vegetarian"} options available.
        </div>
      )}

      <h3 className="text-center">Total Amount: ₹{totalAmount}</h3>
      <button
        className="btn btn-success mt-3"
        onClick={handleSubmit}
        disabled={totalAmount === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default FoodSelection;
