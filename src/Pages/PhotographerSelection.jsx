import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { Navigate, useNavigate } from "react-router-dom";

const PhotographerSelection = () => {
  const [photographerData, setPhotographerData] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalPhotoAmount, setTotalPhotoAmount] = useState(0); // Renamed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from the API
  useEffect(() => {
    const fetchPhotographerData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/event/getphoto"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch photographer data");
        }
        const data = await response.json();

        //console.log("Fetched data:", data);

        if (data.result && Array.isArray(data.result)) {
          setPhotographerData(data.result);
        } else {
          console.error("Unexpected data format:", data);
          throw new Error("Photographer data is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching photographer data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographerData();
  }, []);

  // Handle checkbox selection and updating total
  const handlePackageSelect = (pkg, checked) => {
    const price = parseFloat(pkg.options[0]?.price);
    //console.log("Selected package:", pkg);

    if (checked) {
      setSelectedPackages((prev) => [...prev, pkg]);
      setTotalPhotoAmount(
        (prevTotal) => prevTotal + (isNaN(price) ? 0 : price)
      ); // Updated
    } else {
      setSelectedPackages((prev) =>
        prev.filter((selectedPkg) => selectedPkg.label !== pkg.label)
      );
      setTotalPhotoAmount(
        (prevTotal) => prevTotal - (isNaN(price) ? 0 : price)
      ); // Updated
    }
  };

  // Send selected items and total amount to the dashboard
  const handleSubmit = () => {
    const selectedData = {
      selectedPackages,
      totalPhotoAmount,
    };
    localStorage.setItem("totalPhotoAmount", totalPhotoAmount);
    navigate("/displayuser", { state: selectedData }); // Pass selected packages and total photo amount
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="alert alert-info">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <div>
          <h2 className="mb-4">Select Your Photographer</h2>
          <div className="row">
            {photographerData.map((photographer) => (
              <div className="col-md-4 mb-4" key={photographer._id}>
                <div className="card">
                  <img
                    src={photographer.imgUrl}
                    alt={photographer.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{photographer.name}</h5>
                    <ul className="list-group list-group-flush">
                      {photographer.packages.map((pkg, index) => {
                        const price = parseFloat(pkg.options[0]?.price);
                        const label = pkg.options[0]?.label;
                        // console.log("Package Label:", label);

                        if (isNaN(price)) {
                          console.warn(
                            `Invalid price for package ${pkg.label}:`,
                            pkg.options
                          );
                        }

                        return (
                          <li className="list-group-item" key={index}>
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                value={label}
                                onChange={(e) =>
                                  handlePackageSelect(pkg, e.target.checked)
                                }
                              />
                              {label} - ₹{" "}
                              {isNaN(price) ? "N/A" : price.toFixed(2)}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4>Total Photography Amount: ₹{totalPhotoAmount.toFixed(2)}</h4>{" "}
            {/* Updated */}
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={selectedPackages.length === 0}
            >
              Submit Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerSelection;
