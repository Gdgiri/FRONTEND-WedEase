import React from "react";

const UserDashboard = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="card text-center w-50  m-5 bg-secondary ">
          <h5 className="card-header bg-success text-white">
            Number of Events booked
          </h5>
          <h1 className="bg-secondary m-5 text-white">hai</h1>
        </div>

        <div className="card text-center w-50  m-5 bg-secondary ">
          <h5 className="card-header bg-success text-white">
            Number of Events Completed
          </h5>
          <h1 className="bg-secondary m-5 text-white">hai</h1>
        </div>
      </div>

      <button>Add Events</button>
    </div>
  );
};

export default UserDashboard;
