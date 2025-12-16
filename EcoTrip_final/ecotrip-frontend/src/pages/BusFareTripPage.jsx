// src/pages/BusFareTripPage.jsx
import React, { useState } from "react";
import axios from "axios";

export default function BusFareTripPage() {
  const [trip, setTrip] = useState({
    route: "",
    busFare: "",
    date: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/api/bus-trips", trip);
      alert("Bus Fare Trip Created!");
      setTrip({ route: "", busFare: "", date: "" });
    } catch (error) {
      console.error(error);
      alert("Error creating trip");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Bus Fare Trip</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="route"
          placeholder="Bus Route"
          value={trip.route}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="number"
          name="busFare"
          placeholder="Bus Fare"
          value={trip.busFare}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="date"
          name="date"
          value={trip.date}
          onChange={handleChange}
          required
        /><br/><br/>

        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}
