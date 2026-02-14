import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { Container, Row, Col, Card } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const MONTH_NAMES = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const GREEN_COLORS = [
  "#1B5E20","#2E7D32","#388E3C","#43A047",
  "#4CAF50","#66BB6A","#81C784","#A5D6A7",
  "#C8E6C9","#E8F5E9"
];

const HomePage: React.FC = () => {

  const [fuelData, setFuelData] = useState<Record<string, number>>({});
  const [brandData, setBrandData] = useState<Record<string, number>>({});
  const [modelYearData, setModelYearData] = useState<Record<string, number>>({});
  const [engineCCData, setEngineCCData] = useState<Record<string, number>>({});
  const [monthData, setMonthData] = useState<Record<string, number>>({});
  const [yearData, setYearData] = useState<Record<string, number>>({});
  const [error, setError] = useState("");

  // ================= CARD HOVER =================
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          fuelRes,
          brandRes,
          modelYearRes,
          engineCCRes,
          monthRes,
          yearRes
        ] = await Promise.all([
          axios.get("http://localhost:8081/api/histogram/co2/fuel-type"),
          axios.get("http://localhost:8081/api/histogram/co2/brand"),
          axios.get("http://localhost:8081/api/histogram/co2/model-year"),
          axios.get("http://localhost:8081/api/histogram/co2/engine-cc"),
          axios.get("http://localhost:8081/api/histogram/co2/month"),
          axios.get("http://localhost:8081/api/histogram/co2/year")
        ]);

        setFuelData(fuelRes.data || {});
        setBrandData(brandRes.data || {});
        setModelYearData(modelYearRes.data || {});
        setEngineCCData(engineCCRes.data || {});
        setMonthData(monthRes.data || {});
        setYearData(yearRes.data || {});
      } catch {
        setError("Failed to load CO₂ data");
      }
    };

    loadData();
  }, []);

  // ================= TOTAL =================
  const totalCO2 = Object.values(yearData || {})
    .reduce((acc, value) => acc + Number(value || 0), 0);

  const sortedYears = Object.keys(yearData || {})
    .sort((a, b) => Number(a) - Number(b));

  const currentYear = sortedYears.at(-1);
  const previousYear = sortedYears.length > 1 ? sortedYears.at(-2) : undefined;

  const currentYearValue = currentYear ? Number(yearData[currentYear] || 0) : 0;
  const previousYearValue = previousYear ? Number(yearData[previousYear] || 0) : 0;

  let reductionPercent = 0;
  let isReduction = false;

  if (previousYearValue > 0) {
    reductionPercent =
      ((previousYearValue - currentYearValue) / previousYearValue) * 100;
    isReduction = reductionPercent > 0;
  }

  const createPieData = (dataObj: Record<string, number>) => ({
    labels: Object.keys(dataObj || {}),
    datasets: [{
      data: Object.values(dataObj || {}),
      backgroundColor: GREEN_COLORS,
      borderWidth: 1,
    }]
  });

  const sortedMonths = Object.keys(monthData || {})
    .sort((a, b) => Number(a) - Number(b));

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div style={{ padding: 30, background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        🌿 EcoTrip CO₂ Emissions Dashboard
      </h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <Container fluid>

        {/* SUMMARY CARDS */}
        <Row style={{ marginBottom: 40 }}>
          {[{
            title: "Total CO₂",
            value: <CountUp end={totalCO2} duration={2} decimals={2} />,
            suffix: " kg",
            bg: "linear-gradient(135deg,#1b5e20,#4caf50)"
          },{
            title: `${currentYear || "Current Year"} CO₂`,
            value: currentYearValue.toFixed(2),
            suffix: " kg",
            bg: "#2E7D32"
          },{
            title: "Yearly Change",
            value: previousYear
              ? `${reductionPercent.toFixed(2)}% ${isReduction ? "Reduced" : "Increased"}`
              : "N/A",
            suffix: "",
            bg: isReduction ? "#2E7D32" : "#C62828"
          }].map((card, i) => (
            <Col md={4} key={i}>
              <Card
                style={{
                  padding: 20,
                  borderRadius: 15,
                  background: card.bg,
                  color: "white",
                  textAlign: "center",
                  transition: "all 0.4s ease",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <h6>{card.title}</h6>
                <h3>{card.value}{card.suffix}</h3>
              </Card>
            </Col>
          ))}
        </Row>

        {/* PIE CHARTS WITH TITLES */}
        <Row className="justify-content-center">
          {[
            { data: fuelData, title: "Fuel Type-wise CO₂" },
            { data: brandData, title: "Brand-wise CO₂" },
            { data: modelYearData, title: "Model Year-wise CO₂" },
            { data: engineCCData, title: "Engine CC-wise CO₂" }
          ].map((item, index) => (
            <Col md={5} key={index} style={{ marginBottom: 40 }}>
              <Card
                style={{
                  padding: 20,
                  borderRadius: 20,
                  transition: "all 0.4s ease",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <h5 style={{ textAlign: "center", marginBottom: 20 }}>
                  {item.title}
                </h5>

                <div style={{ width: "100%", height: "300px" }}>
                  <Pie
                    data={createPieData(item.data)}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* LINE CHARTS */}
        <Row style={{ marginTop: 50 }}>
          <Col md={6} style={{ height: 350 }}>
            <h5 style={{ textAlign: "center" }}>Month-wise CO₂ Trend</h5>
            <Line
              data={{
                labels: sortedMonths.map(m => MONTH_NAMES[Number(m) - 1]),
                datasets: [{
                  label: "CO₂ (kg)",
                  data: sortedMonths.map(m => monthData[m] || 0),
                  borderColor: "#2E7D32",
                  backgroundColor: "rgba(76,175,80,0.3)",
                  fill: true,
                  tension: 0.4,
                }]
              }}
              options={lineOptions}
            />
          </Col>

          <Col md={6} style={{ height: 350 }}>
            <h5 style={{ textAlign: "center" }}>Year-wise CO₂ Trend</h5>
            <Line
              data={{
                labels: sortedYears,
                datasets: [{
                  label: "CO₂ (kg)",
                  data: sortedYears.map(y => yearData[y] || 0),
                  borderColor: "#1B5E20",
                  backgroundColor: "rgba(46,125,50,0.3)",
                  fill: true,
                  tension: 0.4,
                }]
              }}
              options={lineOptions}
            />
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default HomePage;
