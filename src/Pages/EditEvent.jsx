import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage methods

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [eventData, setEventData] = useState({
    venueImg: "",
    venueName: "",
    venuePlace: "",
    venueAmount: "",
    cateringName: "",
    cateringAmount: "",
    photographerName: "",
    photographerAmount: "",
    eventStylistName: "",
    eventStylistAmount: "",
    entertainerName: "",
    entertainerAmount: "",
    beauticianName: "",
    beauticianAmount: "",
    transportName: "",
    transportAmount: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null); // State to hold the uploaded file
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/getid/${id}` // Fetching the event data
        );
        setEventData(response.data.result); // Set the event data in state
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const storage = getStorage(); // Initialize Firebase storage
      const storageRef = ref(storage, `venueImages/${file.name}`); // Create a reference to the file

      try {
        await uploadBytes(storageRef, file); // Upload the file
        const url = await getDownloadURL(storageRef); // Get the download URL
        setEventData({ ...eventData, venueImg: url }); // Update the venueImg in state
        alert("Image uploaded successfully!"); // Alert on successful upload
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image"); // Alert on failure
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await axios.put(
        `http://localhost:5000/api/event/editevent/${id}`,
        eventData
      ); // Update event data
      alert("Event updated successfully"); // Alert on successful update
      navigate("/display"); // Redirect to the admin display page
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event"); // Alert on failure
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!eventData) {
    return <div>No event data found.</div>; // No event found
  }

  return (
    <div className="container">
      <h1>Edit Event</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Upload Venue Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload} // Call handleImageUpload on file change
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.venueName}
            onChange={(e) =>
              setEventData({ ...eventData, venueName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue Place</label>
          <input
            type="text"
            className="form-control"
            value={eventData.venuePlace}
            onChange={(e) =>
              setEventData({ ...eventData, venuePlace: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.venueAmount}
            onChange={(e) =>
              setEventData({ ...eventData, venueAmount: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catering Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.cateringName}
            onChange={(e) =>
              setEventData({ ...eventData, cateringName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catering Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.cateringAmount}
            onChange={(e) =>
              setEventData({ ...eventData, cateringAmount: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photographer Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.photographerName}
            onChange={(e) =>
              setEventData({ ...eventData, photographerName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photographer Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.photographerAmount}
            onChange={(e) =>
              setEventData({ ...eventData, photographerAmount: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Stylist Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.eventStylistName}
            onChange={(e) =>
              setEventData({ ...eventData, eventStylistName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Stylist Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.eventStylistAmount}
            onChange={(e) =>
              setEventData({ ...eventData, eventStylistAmount: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Entertainer Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.entertainerName}
            onChange={(e) =>
              setEventData({ ...eventData, entertainerName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Entertainer Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.entertainerAmount}
            onChange={(e) =>
              setEventData({ ...eventData, entertainerAmount: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Beautician Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.beauticianName}
            onChange={(e) =>
              setEventData({ ...eventData, beauticianName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Beautician Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.beauticianAmount}
            onChange={(e) =>
              setEventData({ ...eventData, beauticianAmount: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Transport Name</label>
          <input
            type="text"
            className="form-control"
            value={eventData.transportName}
            onChange={(e) =>
              setEventData({ ...eventData, transportName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Transport Amount</label>
          <input
            type="number"
            className="form-control"
            value={eventData.transportAmount}
            onChange={(e) =>
              setEventData({ ...eventData, transportAmount: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
