import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

interface PrivateVehicleResult {
  vehicleNumber: string;
  estimatedDistance: number;
  fuelType: string;
  fuelPricePerLitre: number;
  expectedFuelEconomy: number;
  tyreCostPerKm: number;
  serviceCostPerKm: number;
  totalTripCost: number;
  co2Emission: number;
  tripDate: string;
}

const PrivateVehicleCalcPage = () => {

  const [form, setForm] = useState({
    vehicleNumber: "",
    estimatedDistance: "",
    tyrePrice: "",
    servicePrice: "",
    fuelPricePerLitre: "",
    expectedFuelEconomy: "",
    fuelType: "petrol",
    tripDate: ""
  });

  const [result, setResult] = useState<PrivateVehicleResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const payload = {
      ...form,
      estimatedDistance: Number(form.estimatedDistance),
      tyrePrice: Number(form.tyrePrice),
      servicePrice: Number(form.servicePrice),
      fuelPricePerLitre: Number(form.fuelPricePerLitre),
      expectedFuelEconomy: Number(form.expectedFuelEconomy),
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/vehicle/private/calc",
        payload
      );
      setResult(response.data);
      alert("Calculation saved successfully!");
    } catch (error: any) {
      alert(error.response?.data || "Error saving calculation");
    }
  };

  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("EcoTrip Private Vehicle Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Vehicle Number: ${result.vehicleNumber}`, 20, 40);
    doc.text(`Distance: ${result.estimatedDistance} km`, 20, 50);
    doc.text(`Fuel Type: ${result.fuelType}`, 20, 60);
    doc.text(`Trip Date: ${new Date(result.tripDate).toLocaleDateString()}`, 20, 70);
    doc.text(`Total Trip Cost: Rs. ${result.totalTripCost.toFixed(2)}`, 20, 90);
    doc.text(`CO₂ Emission: ${result.co2Emission.toFixed(2)} kg`, 20, 105);

    doc.save("EcoTrip_Private_Vehicle_Report.pdf");
  };

  return (
    <div style={pageStyle}>
      {/* 🌫 DARK OVERLAY */}
      <div style={overlayStyle}></div>

      {/* 🧊 GLASS CARD */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>Private Vehicle Trip Calculator</h2>

        <input style={inputStyle} name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} />
        <input type="date" style={inputStyle} name="tripDate" onChange={handleChange} />
        <input style={inputStyle} name="estimatedDistance" placeholder="Distance (km)" onChange={handleChange} />
        <input style={inputStyle} name="tyrePrice" placeholder="Tyre Price (Total 4)" onChange={handleChange} />
        <input style={inputStyle} name="servicePrice" placeholder="Service Price" onChange={handleChange} />
        <input style={inputStyle} name="fuelPricePerLitre" placeholder="Fuel Price per Litre" onChange={handleChange} />
        <input style={inputStyle} name="expectedFuelEconomy" placeholder="Fuel Economy (km/l)" onChange={handleChange} />

        <select style={inputStyle} name="fuelType" onChange={handleChange}>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>

        <button
          style={btnStyle}
          onClick={submit}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Calculate & Save
        </button>

        {result && (
          <div style={resultBox}>
            <h3>Trip Summary</h3>
            <p><strong>Total Cost:</strong> Rs. {result.totalTripCost.toFixed(2)}</p>
            <p><strong>CO₂ Emission:</strong> {result.co2Emission.toFixed(2)} kg</p>
            <p><strong>Trip Date:</strong> {new Date(result.tripDate).toLocaleDateString()}</p>

            <button style={pdfBtn} onClick={generatePDF}>
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 🌄 PAGE WITH BACKGROUND */
const pageStyle = {
  minHeight: "100vh",
  backgroundImage: "url('/private-bg.png')",
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
  width: 480,
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
  background: "linear-gradient(135deg,#2E7D32,#F9A825)",
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
  background: "#1B5E20",
  color: "#fff",
  border: "none",
  borderRadius: 20,
  cursor: "pointer",
};

export default PrivateVehicleCalcPage;
