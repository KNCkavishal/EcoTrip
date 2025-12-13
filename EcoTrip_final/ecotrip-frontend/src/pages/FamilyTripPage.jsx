import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export default function FamilyTripPage() {
  const [trip, setTrip] = useState({
    distance: "",
    fuelPrice: "",
    fuelConsumption: "",
    tyreCost: "",
    serviceCost: "",
    driverSalary: "",
    foodCost: "",
    stayCost: "",
    co2Factor: 0.18
  });

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:8081/api/trips/family";
  const token = localStorage.getItem("jwt");

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  // 🔹 Calculate + Save Trip
  const calculateTrip = async (e) => {
    e.preventDefault();

    // Parse inputs
    const distanceKm = parseFloat(trip.distance) || 0;
    const fuelPrice = parseFloat(trip.fuelPrice) || 0;
    const fuelConsumption = parseFloat(trip.fuelConsumption) || 0;
    const tyreCost = parseFloat(trip.tyreCost) || 0;
    const serviceCost = parseFloat(trip.serviceCost) || 0;
    const driverSalary = parseFloat(trip.driverSalary) || 0;
    const foodCost = parseFloat(trip.foodCost) || 0;
    const stayCost = parseFloat(trip.stayCost) || 0;
    const co2Factor = parseFloat(trip.co2Factor) || 0;

    // 🔹 Calculations
    const fuelUsed = (distanceKm / 100) * fuelConsumption;
    const fuelTotal = fuelUsed * fuelPrice;
    const tyreUsage = (distanceKm / 20000) * tyreCost;
    const serviceUsage = (distanceKm / 10000) * serviceCost;

    const totalCost =
      fuelTotal +
      tyreUsage +
      serviceUsage +
      driverSalary +
      foodCost +
      stayCost;

    const co2Emission = distanceKm * co2Factor;

    const payload = {
      distanceKm,
      fuelCostPerKm: fuelPrice / fuelConsumption,
      serviceCost: serviceUsage,
      tyreCost: tyreUsage,
      co2PerKm: co2Factor
    };

    try {
      // 🔹 Save to database
      const res = await axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Save parsed input values + results in state
      setResult({
        distanceKm,
        fuelPrice,
        fuelConsumption,
        tyreCost,
        serviceCost,
        driverSalary,
        foodCost,
        stayCost,
        co2Factor,
        fuelTotal,
        tyreUsage,
        serviceUsage,
        totalCost,
        co2Emission,
        dbTrip: res.data
      });

      setMessage("Trip saved successfully ✔");
    } catch (err) {
      console.error(err);
      setMessage("Error saving trip ❌");
    }
  };

  // 🔹 Generate PDF
  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(18);
    doc.text("Family Trip Summary", 105, y, { align: "center" });
    y += 15;

    doc.setFontSize(12);
    const lines = [
      `Distance: ${result.distanceKm} KM`,
      `Fuel Price: Rs ${result.fuelPrice.toFixed(2)}`,
      `Fuel Consumption: ${result.fuelConsumption} L/100KM`,
      `Tyre Cost: Rs ${result.tyreCost.toFixed(2)}`,
      `Service Cost: Rs ${result.serviceCost.toFixed(2)}`,
      `Driver Salary: Rs ${result.driverSalary.toFixed(2)}`,
      `Food Cost: Rs ${result.foodCost.toFixed(2)}`,
      `Stay Cost: Rs ${result.stayCost.toFixed(2)}`,
      `CO₂ Factor: ${result.co2Factor.toFixed(2)} kg/km`,
      ``,
      `--- Calculated Results ---`,
      `Fuel Cost: Rs ${result.fuelTotal.toFixed(2)}`,
      `Tyre Cost Usage: Rs ${result.tyreUsage.toFixed(2)}`,
      `Service Cost Usage: Rs ${result.serviceUsage.toFixed(2)}`,
      `Total Trip Cost: Rs ${result.totalCost.toFixed(2)}`,
      `CO₂ Emission: ${result.co2Emission.toFixed(2)} kg`
    ];

    lines.forEach((line) => {
      doc.text(line, 10, y);
      y += 10;
    });

    doc.save("FamilyTripSummary.pdf");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Family Trip Cost Calculator</h2>

      <form onSubmit={calculateTrip}>
        <input name="distance" placeholder="Distance (KM)" onChange={handleChange} /><br /><br />
        <input name="fuelPrice" placeholder="Fuel Price (per liter)" onChange={handleChange} /><br /><br />
        <input name="fuelConsumption" placeholder="Fuel Consumption (L/100km)" onChange={handleChange} /><br /><br />
        <input name="tyreCost" placeholder="Tyre Cost (Rs)" onChange={handleChange} /><br /><br />
        <input name="serviceCost" placeholder="Service Cost (Rs)" onChange={handleChange} /><br /><br />
        <input name="driverSalary" placeholder="Driver Salary (Rs)" onChange={handleChange} /><br /><br />
        <input name="foodCost" placeholder="Food Cost (Rs)" onChange={handleChange} /><br /><br />
        <input name="stayCost" placeholder="Accommodation Cost (Rs)" onChange={handleChange} /><br /><br />
        <button type="submit">Calculate & Save Trip</button>
      </form>

      {message && <p>{message}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Trip Summary</h3>
          <p>Total Cost: Rs {result.totalCost.toFixed(2)}</p>
          <p>CO₂ Emission: {result.co2Emission.toFixed(2)} kg</p>
          <button onClick={generatePDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}
