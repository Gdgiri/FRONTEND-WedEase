import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/userdata"
      );
      setUsers(response.data.result); // Assuming response has a result field
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
        <div className="d-flex justify-content-center">
      <div className="card text-center w-50  m-5 bg-secondary ">
        <h5 className="card-header bg-success text-white">Number of Users</h5>
       <h1 className="bg-secondary m-5 text-white" >{users.length}</h1>
      </div>
      <div className="card text-center w-50  m-5 bg-secondary ">
        <h5 className="card-header bg-success text-white">Number of Events booked</h5>
       <h1 className="bg-secondary m-5 text-white" >{users.length}</h1>
      </div>
      
      <div className="card text-center w-50  m-5 bg-secondary ">
        <h5 className="card-header bg-success text-white">Number of Events Completed</h5>
       <h1 className="bg-secondary m-5 text-white" >{users.length}</h1>
      </div>
      </div>
      
      

      <button>Add Events</button>
    </div>
  );
};

export default AdminDashboard;
