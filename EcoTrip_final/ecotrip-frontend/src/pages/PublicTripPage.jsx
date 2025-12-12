// src/pages/PublicTripPage.jsx
import React, { useState } from "react";

export default function PublicTripPage() {
  const [trip, setTrip] = useState({
    startLocation: "",
    endLocation: "",
    passengers: "",
    date: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Public Trip Data:", trip);
    alert("Public Trip Created!");
  };

  return (
    <div>
      <h2>Create Public Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="startLocation"
          placeholder="Start Location"
          onChange={handleChange}
        />
        <input
          type="text"
          name="endLocation"
          placeholder="End Location"
          onChange={handleChange}
        />
        <input
          type="number"
          name="passengers"
          placeholder="Number of Passengers"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
        />
        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
}
