// src/pages/BusFareTripPage.jsx
import React, { useState } from "react";

export default function BusFareTripPage() {
  const [trip, setTrip] = useState({
    route: "",
    busFare: "",
    date: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bus Fare Trip Data:", trip);
    alert("Bus Fare Trip Created!");
  };

  return (
    <div>
      <h2>Create Bus Fare Trip</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="route"
          placeholder="Bus Route"
          onChange={handleChange}
        />
        <input
          type="number"
          name="busFare"
          placeholder="Bus Fare"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
        />
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}
