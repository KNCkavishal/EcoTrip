import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VehicleRegistrationPage() {

  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    number: "",
    province: "",
    yearMake: "",
    yearRegister: "",
    vehicleType: "",
    fuelEfficiency: "",
    co2PerKm: ""
  });

  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("jwt");
  const API_URL = "http://localhost:8081/api/vehicles";

  useEffect(() => {
    if (token) {
      fetchVehicles();
    }
  }, []);

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value
    });
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API_URL}/myvehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(res.data);
    } catch (err) {
      console.error("Fetch vehicles error", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        `${API_URL}/register`,
        {
          ...vehicle,
          yearMake: Number(vehicle.yearMake),
          yearRegister: Number(vehicle.yearRegister),
          fuelEfficiency: vehicle.fuelEfficiency ? Number(vehicle.fuelEfficiency) : null,
          co2PerKm: vehicle.co2PerKm ? Number(vehicle.co2PerKm) : null
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage("✅ Vehicle registered successfully!");

      setVehicle({
        number: "",
        province: "",
        yearMake: "",
        yearRegister: "",
        vehicleType: "",
        fuelEfficiency: "",
        co2PerKm: ""
      });

      fetchVehicles();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error registering vehicle");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Vehicle Registration</h2>

      <form onSubmit={handleRegister}>

        <input
          name="number"
          placeholder="Vehicle Number"
          value={vehicle.number}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="province"
          placeholder="Province"
          value={vehicle.province}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="yearMake"
          placeholder="Year of Manufacture"
          value={vehicle.yearMake}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="yearRegister"
          placeholder="Year of Registration"
          value={vehicle.yearRegister}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="vehicleType"
          placeholder="Vehicle Type (Car / Bus)"
          value={vehicle.vehicleType}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          step="0.1"
          name="fuelEfficiency"
          placeholder="Fuel Efficiency (km/l)"
          value={vehicle.fuelEfficiency}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          step="0.01"
          name="co2PerKm"
          placeholder="CO₂ per km"
          value={vehicle.co2PerKm}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Register Vehicle</button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h3>Your Vehicles</h3>
      <ul style={{ textAlign: "left" }}>
        {vehicles.map((v) => (
          <li key={v.id}>
            <strong>{v.number}</strong> ({v.vehicleType}) – {v.province}  
            <br />
            Year: {v.yearMake} | Registered: {v.yearRegister}
          </li>
        ))}
      </ul>

      <br />

      <button onClick={() => navigate("/family-trip")}>🚗 Create Family Trip</button>
      <br /><br />
      <button onClick={() => navigate("/public-trip")}>👥 Public Trip</button>
      <br /><br />
      <button onClick={() => navigate("/busfare-trip")}>🚌 Bus Fare</button>

    </div>
  );
}
