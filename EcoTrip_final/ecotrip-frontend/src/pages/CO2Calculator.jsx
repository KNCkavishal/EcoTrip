import React, { useState } from "react";
import api from "../api/axios";

export default function CO2Calculator() {
  const [vehicleType, setVehicleType] = useState("BUS");
  const [distanceKm, setDistanceKm] = useState("");

  const submit = async () => {
    await api.post("/api/co2/calculate", {
      vehicleType,
      distanceKm,
    });
    alert("CO₂ data saved");
  };

  return (
    <div>
      <h2>CO₂ Calculator</h2>

      <select onChange={(e) => setVehicleType(e.target.value)}>
        <option>BUS</option>
        <option>CAR</option>
        <option>BIKE</option>
      </select>

      <input
        type="number"
        placeholder="Distance (km)"
        onChange={(e) => setDistanceKm(e.target.value)}
      />

      <button onClick={submit}>Calculate</button>
    </div>
  );
}
