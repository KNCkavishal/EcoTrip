import { useState, useEffect } from "react";
import axios from "axios";

export default function VehicleRegistrationPage() {
  const [numberPlate, setNumberPlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [co2PerKm, setCo2PerKm] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("jwt");
  const API_URL = "http://localhost:8081/api/vehicles";

  useEffect(() => {
    if (token) fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API_URL}/myvehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/register`, {
        numberPlate,
        vehicleType,
        fuelEfficiency: fuelEfficiency ? parseFloat(fuelEfficiency) : undefined,
        co2PerKm: co2PerKm ? parseFloat(co2PerKm) : undefined
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("Vehicle registered successfully!");
      setNumberPlate("");
      setVehicleType("");
      setFuelEfficiency("");
      setCo2PerKm("");
      fetchVehicles(); // refresh list
    } catch (err) {
      setMessage(err.response?.data || "Error registering vehicle");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Vehicle Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Number Plate" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} required /><br /><br />
        <input type="text" placeholder="Vehicle Type" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required /><br /><br />
        <input type="number" step="0.1" placeholder="Fuel Efficiency (optional)" value={fuelEfficiency} onChange={(e) => setFuelEfficiency(e.target.value)} /><br /><br />
        <input type="number" step="0.01" placeholder="CO2 per km (optional)" value={co2PerKm} onChange={(e) => setCo2PerKm(e.target.value)} /><br /><br />
        <button type="submit">Register Vehicle</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <h3>Your Vehicles</h3>
      <ul>
        {vehicles.map((v) => (
          <li key={v.id}>
            {v.numberPlate} - {v.vehicleType} {v.fuelEfficiency && `- ${v.fuelEfficiency} km/l`} {v.co2PerKm && `- ${v.co2PerKm} kg/km`}
          </li>
        ))}
      </ul>
    </div>
  );
}
