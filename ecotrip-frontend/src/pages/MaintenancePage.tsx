import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const MaintenancePage = () => {
  const [form, setForm] = useState({
    vehicleNumber: "",
    kmSinceLastService: "",
    serviceCost: "",
    partsCost: "",
    tyreCost: "",
    laborCost: "",
  });

  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [costPerKm, setCostPerKm] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const km = Number(form.kmSinceLastService);
    const service = Number(form.serviceCost);
    const parts = Number(form.partsCost);
    const tyre = Number(form.tyreCost);
    const labor = Number(form.laborCost);

    const total = service + parts + tyre + labor;
    const perKm = km > 0 ? total / km : 0;

    setTotalCost(total);
    setCostPerKm(perKm);

    return { total, perKm };
  };

  const submit = async () => {
    const result = calculate();

    try {
      await axios.post(
        "http://localhost:8081/api/vehicle/maintenance/calc",
        {
          ...form,
          kmSinceLastService: Number(form.kmSinceLastService),
          serviceCost: Number(form.serviceCost),
          partsCost: Number(form.partsCost),
          tyreCost: Number(form.tyreCost),
          laborCost: Number(form.laborCost),
          totalCost: result.total,
          costPerKm: result.perKm,
        }
      );

      alert("Maintenance Saved Successfully!");
    } catch {
      alert("Error saving maintenance");
    }
  };

  const generatePDF = () => {
    if (totalCost === null || costPerKm === null) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("EcoTrip Maintenance Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Vehicle: ${form.vehicleNumber}`, 20, 40);
    doc.text(`Km Since Last Service: ${form.kmSinceLastService}`, 20, 50);

    doc.text(`Service Cost: Rs. ${form.serviceCost}`, 20, 65);
    doc.text(`Parts Cost: Rs. ${form.partsCost}`, 20, 75);
    doc.text(`Tyre Cost: Rs. ${form.tyreCost}`, 20, 85);
    doc.text(`Labor Cost: Rs. ${form.laborCost}`, 20, 95);

    doc.setFontSize(14);
    doc.text(`Total Cost: Rs. ${totalCost.toFixed(2)}`, 20, 115);
    doc.text(`Cost per Km: Rs. ${costPerKm.toFixed(2)}`, 20, 130);

    doc.save("EcoTrip_Maintenance_Report.pdf");
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>

      <div style={cardStyle}>
        <h2 style={titleStyle}>
          🛠️ Vehicle Maintenance Calculator
        </h2>

        <input style={inputStyle} name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} />
        <input style={inputStyle} name="kmSinceLastService" type="number" placeholder="Km Since Last Service" onChange={handleChange} />
        <input style={inputStyle} name="serviceCost" type="number" placeholder="Service Cost" onChange={handleChange} />
        <input style={inputStyle} name="partsCost" type="number" placeholder="Parts Cost" onChange={handleChange} />
        <input style={inputStyle} name="tyreCost" type="number" placeholder="Tyre Cost" onChange={handleChange} />
        <input style={inputStyle} name="laborCost" type="number" placeholder="Labor Cost" onChange={handleChange} />

        <button
          onClick={submit}
          style={btnStyle}
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

        {totalCost !== null && costPerKm !== null && (
          <div style={resultBox}>
            <h4>Total Maintenance Cost</h4>
            <p>Rs. {totalCost.toFixed(2)}</p>

            <h4>Cost per Km</h4>
            <p>Rs. {costPerKm.toFixed(2)}</p>

            <button style={pdfBtn} onClick={generatePDF}>
              📄 Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 🌄 PAGE STYLE */
const pageStyle = {
  minHeight: "100vh",
  backgroundImage: "url('/maintenance-bg.png')",
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
  width: 520,
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
  padding: "10px 12px",
  marginBottom: 12,
  borderRadius: 8,
  border: "none",
  background: "white",
  color: "black",
};

const btnStyle = {
  width: "100%",
  padding: 12,
  background: "linear-gradient(135deg,#EF6C00,#F9A825)",
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
  background: "#00e641",
  color: "#fff",
  border: "none",
  borderRadius: 20,
  cursor: "pointer",
};

export default MaintenancePage;