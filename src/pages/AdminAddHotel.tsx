import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAddHotel = () => {

  const { placeId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    pricePerNight: "",
    phone: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value
    });
  };

  const submitHotel = async () => {

    // 🛑 Safety check
    if (!placeId) {
      alert("Invalid Place ID");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8081/api/hotels",
        {
          ...hotel,
          placeId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Hotel added successfully");

      // 🔁 Go back to place details page
      navigate(`/place/${placeId}`);

    } catch (err: any) {
      console.error("Hotel Error:", err.response?.data || err.message);
      alert("Error adding hotel");
    }
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>Add Hotel for Place</h2>

      <p><strong>Place ID:</strong> {placeId}</p>

      <input
        name="name"
        placeholder="Hotel name"
        value={hotel.name}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        value={hotel.location}
        onChange={handleChange}
      />

      <input
        name="pricePerNight"
        placeholder="Price per night"
        value={hotel.pricePerNight}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone number"
        value={hotel.phone}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        value={hotel.image}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submitHotel}>
        Add Hotel
      </button>

    </div>
  );
};

export default AdminAddHotel;
