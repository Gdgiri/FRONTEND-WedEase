import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DisplayUser = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const { state } = location;

  // Extracting data from state
  const totalCateringAmount =
    parseFloat(state?.totalCateringAmount) ||
    parseFloat(localStorage.getItem("totalCateringAmount")) ||
    0;

  const totalPhotoAmount =
    parseFloat(state?.totalPhotoAmount) ||
    parseFloat(localStorage.getItem("totalPhotoAmount")) ||
    0;

  const totalTransportAmount =
    parseFloat(state?.transportAmount) ||
    parseFloat(localStorage.getItem("transportAmount")) ||
    0;

  const totalBeauticianAmount =
    parseFloat(state?.totalPrice) ||
    parseFloat(localStorage.getItem("totalPrice")) ||
    0;

  const totalStyleAmount =
    parseFloat(state?.totalStyleAmount) ||
    parseFloat(localStorage.getItem("totalStyleAmount")) ||
    0;

  const totalEntertainAmount =
    parseFloat(state?.totalEntertainAmount) ||
    parseFloat(localStorage.getItem("totalEntertainAmount")) ||
    0;

  // Calculate total amount
  const calculateTotalAmount = (event) => {
    const venueAmount = parseFloat(event.venueAmount) || 0;
    return (
      venueAmount +
      totalCateringAmount +
      totalBeauticianAmount +
      totalEntertainAmount +
      totalPhotoAmount +
      totalStyleAmount +
      totalTransportAmount
    );
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/event/getevent"
      );
      setData(response.data.result); // Assuming response has a result field
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/delete/${id}`);
      setData(data.filter((event) => event._id !== id));
      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const filteredData = data.filter((event) => {
    const venueNameMatch = event.venueName
      .toLowerCase()
      .includes(search.toLowerCase());
    const venuePlaceMatch = event.venuePlace
      .toLowerCase()
      .includes(search.toLowerCase());
    const venueAmountMatch =
      event.venueAmount && event.venueAmount.toString().includes(search);
    return venueNameMatch || venuePlaceMatch || venueAmountMatch;
  });

  const handleCatering = () => {
    navigate("/catering");
  };

  const handlePhoto = () => {
    navigate("/photo");
  };

  const handleBeauty = () => {
    navigate("/getbeauty");
  };

  const handleDecor = () => {
    navigate("/getstyle");
  };

  const handleEnter = () => {
    navigate("/entertain");
  };

  const handleTransport = () => {
    navigate("/gettransport");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Search and Add Event button */}
      <div className="d-flex justify-content-between mb-3 m-5">
        <div className="input-group ms-auto" style={{ width: "250px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* Displaying filtered events */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((event, index) => (
            <div className="col-md-6" key={index}>
              <div className="card mb-6 shadow-sm">
                <div className="row m-2 bg-light">
                  <div className="col-md-5">
                    <img
                      src={event.venueImg}
                      className="card-img img-fluid"
                      alt={event.venueName}
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body d-flex flex-column justify-content-center">
                      <h5 className="card-title">
                        Venue Name: {event.venueName}
                      </h5>
                      <br />
                      <h5 className="card-text">
                        Venue Place: {event.venuePlace}
                      </h5>
                      <br />
                      <h5 className="card-text">Price: ₹{event.venueAmount}</h5>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-title">Event Services:</h5>
                  <table className="table table-borderless m-3">
                    <tbody>
                      <tr>
                        <td>Catering: ₹{totalCateringAmount}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={handleCatering}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Photographer: ₹{totalPhotoAmount}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={handlePhoto}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Decoration: ₹{totalStyleAmount}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={handleDecor}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Entertainer: ₹{totalEntertainAmount}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={handleEnter}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Beautician: ₹{totalBeauticianAmount}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={handleBeauty}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Transport: ₹{totalTransportAmount}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={handleTransport}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center d-flex gap-5">
                    <h5 className="card-text">
                      Total Amount: ₹{calculateTotalAmount(event).toFixed(2)}
                    </h5>
                    <button className="btn btn-primary ">
                      <Link className="text-white">Book</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <p>No events found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayUser;
