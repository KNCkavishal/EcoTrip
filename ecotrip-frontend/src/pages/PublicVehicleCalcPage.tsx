import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const PublicVehicleCalcPage: React.FC = () => {
  const [form, setForm] = useState({
    vehicleNumber: "",
    estimatedDistancePerTrip: "",
    tripsPerDay: "",
    fuelType: "PETROL",
    tripDate: "",
    fuelPricePerLitre: "",
    expectedFuelEconomy: "",
    tyrePrice: "",
    servicePrice: "",
    driverSalary: "",
    helperSalary: "",
    ownerProfitPercentage: "",
  });

  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [passengerCost, setPassengerCost] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const distancePerTrip = Number(form.estimatedDistancePerTrip);
    const trips = Number(form.tripsPerDay);
    const fuelPrice = Number(form.fuelPricePerLitre);
    const economy = Number(form.expectedFuelEconomy);
    const tyre = Number(form.tyrePrice);
    const service = Number(form.servicePrice);
    const driver = Number(form.driverSalary);
    const helper = Number(form.helperSalary);
    const profitPercent = Number(form.ownerProfitPercentage);

    const dailyDistance = distancePerTrip * trips;
    const fuelUsed = dailyDistance / economy;
    const fuelCost = fuelUsed * fuelPrice;

    const baseCost = fuelCost + tyre + service + driver + helper;
    const profit = baseCost * (profitPercent / 100);
    const total = baseCost + profit;

    const avgPassengers = 40;
    const costPerPassenger = total / (trips * avgPassengers);

    setTotalCost(total);
    setPassengerCost(costPerPassenger);

    return { total, costPerPassenger };
  };

  const submit = async () => {
    const result = calculate();

    try {
      await axios.post("http://localhost:8081/api/vehicle/public/calc", {
        ...form,
        totalTripCost: result.total,
      });
      alert("Public Vehicle Calculation Saved!");
    } catch {
      alert("Error saving calculation");
    }
  };

  const generatePDF = () => {
    if (!totalCost || !passengerCost) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("EcoTrip Public Vehicle Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Vehicle: ${form.vehicleNumber}`, 20, 40);
    doc.text(`Trip Date: ${form.tripDate}`, 20, 50);
    doc.text(`Fuel Type: ${form.fuelType}`, 20, 60);
    doc.text(`Distance per Trip: ${form.estimatedDistancePerTrip} km`, 20, 70);
    doc.text(`Trips per Day: ${form.tripsPerDay}`, 20, 80);

    doc.setFontSize(14);
    doc.text(`Total Daily Cost: Rs. ${totalCost.toFixed(2)}`, 20, 100);
    doc.text(`Cost per Passenger: Rs. ${passengerCost.toFixed(2)}`, 20, 115);

    doc.save("EcoTrip_Public_Vehicle_Report.pdf");
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>

      <div style={cardStyle}>
        <h2 style={titleStyle}>
          Public Vehicle Cost Calculator
        </h2>

        <input style={inputStyle} name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} />
        <input type="date" style={inputStyle} name="tripDate" onChange={handleChange} />

        <select style={inputStyle} name="fuelType" onChange={handleChange}>
          <option value="PETROL">PETROL</option>
          <option value="DIESEL">DIESEL</option>
        </select>

        <input style={inputStyle} name="estimatedDistancePerTrip" placeholder="Distance per Trip (km)" onChange={handleChange} />
        <input style={inputStyle} name="tripsPerDay" placeholder="Trips per Day" onChange={handleChange} />
        <input style={inputStyle} name="fuelPricePerLitre" placeholder="Fuel Price per Litre" onChange={handleChange} />
        <input style={inputStyle} name="expectedFuelEconomy" placeholder="Fuel Economy (km/l)" onChange={handleChange} />
        <input style={inputStyle} name="tyrePrice" placeholder="Tyre Price" onChange={handleChange} />
        <input style={inputStyle} name="servicePrice" placeholder="Service Price" onChange={handleChange} />
        <input style={inputStyle} name="driverSalary" placeholder="Driver Salary" onChange={handleChange} />
        <input style={inputStyle} name="helperSalary" placeholder="Helper Salary" onChange={handleChange} />
        <input style={inputStyle} name="ownerProfitPercentage" placeholder="Owner Profit %" onChange={handleChange} />

        <button
          style={btnStyle}
          onClick={submit}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Calculate & Save
        </button>

        {totalCost && passengerCost && (
          <div style={resultBox}>
            <h3>Total Daily Cost</h3>
            <p>Rs. {totalCost.toFixed(2)}</p>

            <h4>Cost per Passenger</h4>
            <p>Rs. {passengerCost.toFixed(2)}</p>

            <button style={pdfBtn} onClick={generatePDF}>
              📄 Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 🌄 BACKGROUND */
const pageStyle = {
  minHeight: "100vh",
  backgroundImage: "url('/public-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative" as const,
};

const overlayStyle = {
  position: "absolute" as const,
  inset: 0,
  background: "rgba(0,0,0,0.45)",
};

const cardStyle = {
  position: "relative" as const,
  backdropFilter: "blur(18px)",
  background: "rgba(255,255,255,0.15)",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: 35,
  width: 550,
  borderRadius: 22,
  boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
  color: "white",
};

const titleStyle = {
  textAlign: "center" as const,
  marginBottom: 25,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 8,
  border: "none",
  background: "white",
  color: "black",
};

const btnStyle = {
  width: "100%",
  padding: 12,
  background: "#0da150",
  color: "#ffffff",
  border: "none",
  borderRadius: 30,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const resultBox = {
  marginTop: 20,
  padding: 15,
  background: "rgba(255,255,255,0.2)",
  borderRadius: 12,
  textAlign: "center" as const,
};

const pdfBtn = {
  marginTop: 10,
  padding: "8px 16px",
  background: "#0da150",
  color: "#fff",
  border: "none",
  borderRadius: 20,
  cursor: "pointer",
};

export default PublicVehicleCalcPage;
