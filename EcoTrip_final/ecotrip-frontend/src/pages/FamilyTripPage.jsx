import React, { useState } from "react";
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

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const calculateTrip = (e) => {
    e.preventDefault();

    const distance = parseFloat(trip.distance) || 0;
    const fuelPrice = parseFloat(trip.fuelPrice) || 0;
    const fuelConsumption = parseFloat(trip.fuelConsumption) || 0;
    const tyreCost = parseFloat(trip.tyreCost) || 0;
    const serviceCost = parseFloat(trip.serviceCost) || 0;
    const driverSalary = parseFloat(trip.driverSalary) || 0;
    const foodCost = parseFloat(trip.foodCost) || 0;
    const stayCost = parseFloat(trip.stayCost) || 0;
    const co2Factor = parseFloat(trip.co2Factor);

    const fuelUsed = (distance / 100) * fuelConsumption;
    const fuelTotal = fuelUsed * fuelPrice;

    const tyreUsage = (distance / 20000) * tyreCost;
    const serviceUsage = (distance / 10000) * serviceCost;

    const totalCost = fuelTotal + tyreUsage + serviceUsage + driverSalary + foodCost + stayCost;

    const co2Emission = distance * co2Factor;

    setResult({
      fuelTotal,
      tyreUsage,
      serviceUsage,
      totalCost,
      co2Emission
    });
  };

  // 🔹 Generate multi-page PDF
  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let y = 10;

    doc.setFontSize(18);
    doc.text("Family Trip Summary", 105, y, { align: "center" });
    y += 15;

    doc.setFontSize(12);
    const lines = [
      `Distance: ${trip.distance} KM`,
      `Fuel Price: Rs ${trip.fuelPrice} per liter`,
      `Fuel Consumption: ${trip.fuelConsumption} L/100km`,
      `Tyre Cost: Rs ${trip.tyreCost}`,
      `Service Cost: Rs ${trip.serviceCost}`,
      `Driver Salary: Rs ${trip.driverSalary}`,
      `Food Cost: Rs ${trip.foodCost}`,
      `Accommodation Cost: Rs ${trip.stayCost}`,
      `Estimated CO₂ Factor: ${trip.co2Factor} kg/km`,
      "",
      `Fuel Cost: Rs ${result.fuelTotal.toFixed(2)}`,
      `Tyre Usage Cost: Rs ${result.tyreUsage.toFixed(2)}`,
      `Service Usage Cost: Rs ${result.serviceUsage.toFixed(2)}`,
      `Total Trip Cost: Rs ${result.totalCost.toFixed(2)}`,
      `Estimated CO₂ Emission: ${result.co2Emission.toFixed(2)} kg`
    ];

    lines.forEach((line) => {
      if (y > pageHeight - 20) { // create new page if overflow
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 10;
    });

    doc.save("FamilyTripSummary.pdf");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Family Trip Cost Calculator</h1>

      <form onSubmit={calculateTrip}>
        <input name="distance" placeholder="Distance (KM)" onChange={handleChange} /><br /><br />
        <input name="fuelPrice" placeholder="Fuel Price (per liter)" onChange={handleChange} /><br /><br />
        <input name="fuelConsumption" placeholder="Fuel Consumption (L/100km)" onChange={handleChange} /><br /><br />
        <input name="tyreCost" placeholder="Estimated Tyre Cost (Rs)" onChange={handleChange} /><br /><br />
        <input name="serviceCost" placeholder="Estimated Service Cost (Rs)" onChange={handleChange} /><br /><br />
        <input name="driverSalary" placeholder="Driver Salary (Rs)" onChange={handleChange} /><br /><br />
        <input name="foodCost" placeholder="Food Cost (Rs)" onChange={handleChange} /><br /><br />
        <input name="stayCost" placeholder="Accommodation Cost (Rs)" onChange={handleChange} /><br /><br />

        <button type="submit">Calculate Trip Cost</button>
      </form>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Trip Summary</h2>
          <p>Fuel Cost: Rs {result.fuelTotal.toFixed(2)}</p>
          <p>Tyre Usage Cost: Rs {result.tyreUsage.toFixed(2)}</p>
          <p>Service Usage Cost: Rs {result.serviceUsage.toFixed(2)}</p>
          <p>Total Trip Cost: Rs {result.totalCost.toFixed(2)}</p>
          <p>Estimated CO₂ Emission: {result.co2Emission.toFixed(2)} kg</p>
          <button onClick={generatePDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}
