import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const DisplayAdmin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const handleNav = () => {
    navigate("/uploadevent");
  };

  // Corrected handleEdit function
  const handleEdit = (_id) => {
    navigate(`/edit/${_id}`); // Use _id from the event
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Search and Add Event button */}
      <div className="d-flex justify-content-between mb-3 m-5">
        <Link to="/uploadevent" className="btn btn-primary" onClick={handleNav}>
          Add Event
        </Link>
        <div className="input-group" style={{ width: "250px" }}>
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
                        <td>Catering: {event.cateringName}</td>
                        <td>
                          <button className="btn btn-success">view</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Catering: {event.cateringName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-center m-2">
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(event._id)} // Call handleEdit directly
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(event._id)} // Call delete function
                  >
                    Delete
                  </button>
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

export default DisplayAdmin;
