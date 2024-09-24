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
              <div className="card mb-4 shadow-sm">
                <div className="row no-gutters">
                  <div className="col-md-6">
                    <img
                      src={event.venueImg}
                      className="card-img"
                      alt={event.venueName}
                      style={{ height: "200px", objectFit: "cover" }}
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
                    <tbody >
                      <tr>
                        <td>Catering: {event.cateringName}</td>
                        <td>{event.cateringAmount}</td>
                        <td>
                          <button className="btn btn-success">
                            view Detail
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Photography: {event.photographerName}</td>
                        <td>{event.photographerAmount}</td>
                        <td>
                          <button className="btn btn-success">
                            view Detail
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>eventStylist: {event.eventStylistName}</td>
                        <td>{event.eventStylistAmount}</td>
                        <td>
                          <button className="btn btn-success">
                            view Detail
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Entertainer: {event.entertainerName}</td>
                        <td>{event.entertainerAmount}</td>
                        <td>
                          <button className="btn btn-success">
                            view Detail
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Beautician:{event.beauticianName}</td>
                        <td>{event.beauticianAmount}</td>
                        <td>
                          <button className="btn btn-success">
                            view Detail
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Transport:{event.transportName}</td>
                        <td>{event.transportAmount}</td>
                        <td>
                          <button className="btn btn-success">
                            view Detail
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-center m-2">
                  <Link to={`/edit`} className="btn btn-warning btn-sm mx-1">
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm mx-1">Delete</button>
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
