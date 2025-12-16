import { useState } from "react";
import axios from "axios";

export default function PublicTripPage() {
  const token = localStorage.getItem("jwt");

  const [trip, setTrip] = useState({
    distanceKm: "",
    fuelPrice: "",
    fuelConsumption: "",
    tyreCost: "",
    serviceCost: "",
    passengers: ""
  });

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const calculateAndSave = async (e) => {
    e.preventDefault();
    setMessage("");

    const distance = Number(trip.distanceKm);
    const fuelUsed = (distance / 100) * Number(trip.fuelConsumption);
    const fuelCost = fuelUsed * Number(trip.fuelPrice);

    const tyreUsage = (distance / 20000) * Number(trip.tyreCost);
    const serviceUsage = (distance / 10000) * Number(trip.serviceCost);

    const totalCost = fuelCost + tyreUsage + serviceUsage;
    const perHead = totalCost / Number(trip.passengers);
    const co2Kg = distance * 0.18;

    try {
      const res = await axios.post(
        "http://localhost:8081/api/trips/public",
        {
          tripType: "SHARED",
          distanceKm: distance,
          fuelPricePerLitre: Number(trip.fuelPrice),
          fuelConsumptionPer100Km: Number(trip.fuelConsumption),
          estimatedTyreCost: Number(trip.tyreCost),
          estimatedServiceCost: Number(trip.serviceCost),
          passengers: Number(trip.passengers)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult({
        fuelCost,
        tyreUsage,
        serviceUsage,
        totalCost,
        perHead,
        co2Kg
      });

      setMessage("Public trip saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving public trip");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Public Trip Cost Calculator</h2>

      <form onSubmit={calculateAndSave}>
        <input name="distanceKm" placeholder="Distance (km)" onChange={handleChange} required /><br /><br />
        <input name="fuelPrice" placeholder="Fuel Price (Rs/l)" onChange={handleChange} required /><br /><br />
        <input name="fuelConsumption" placeholder="Fuel Consumption (L/100km)" onChange={handleChange} required /><br /><br />
        <input name="tyreCost" placeholder="Estimated Tyre Cost (Rs)" onChange={handleChange} required /><br /><br />
        <input name="serviceCost" placeholder="Estimated Service Cost (Rs)" onChange={handleChange} required /><br /><br />
        <input name="passengers" placeholder="Passenger Count" onChange={handleChange} required /><br /><br />

        <button type="submit">Calculate & Save</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Trip Summary</h3>
          <p>Total Fuel Cost: Rs {result.fuelCost.toFixed(2)}</p>
          <p>Tyre Usage Cost: Rs {result.tyreUsage.toFixed(2)}</p>
          <p>Service Usage Cost: Rs {result.serviceUsage.toFixed(2)}</p>
          <p>Total Trip Cost: Rs {result.totalCost.toFixed(2)}</p>
          <p>Cost per Person: Rs {result.perHead.toFixed(2)}</p>
          <p>Estimated CO₂ Emission: {result.co2Kg.toFixed(2)} kg</p>
        </div>
      )}
    </div>
  );
}
