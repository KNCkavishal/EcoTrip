import { useNavigate } from "react-router-dom";

const VehicleCategoryPage = () => {
  const navigate = useNavigate();

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
    e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.4)";
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(0px) scale(1)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.25)";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/category-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 20,
      }}
    >
      {/* 🌫 DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
        }}
      />

      {/* 🧊 GLASS CARD */}
      <div
        style={{
          position: "relative",
          padding: 45,
          borderRadius: 25,
          width: "100%",
          maxWidth: 460,
          backdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2
          style={{
            marginBottom: 35,
            fontWeight: 700,
            fontSize: 26,
          }}
        >
          🚘 Select Vehicle Type
        </h2>

        {/* PRIVATE */}
        <button
          onClick={() => navigate("/private-vehicle")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          style={{
            ...buttonStyle,
            background: "linear-gradient(135deg, #2E7D32, #F9A825)",
          }}
        >
          🚗 Private Vehicle
        </button>

        {/* PUBLIC */}
        <button
          onClick={() => navigate("/public-vehicle")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          style={{
            ...buttonStyle,
            background: "linear-gradient(135deg, #4CAF50, #FFD54F)",
          }}
        >
          🚌 Public Vehicle
        </button>

        {/* MAINTENANCE */}
        <button
          onClick={() => navigate("/maintenance")}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          style={{
            ...buttonStyle,
            background: "linear-gradient(135deg, #1B5E20, #FFC107)",
          }}
        >
          🛠️ Maintenance
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px 0",
  marginBottom: 18,
  border: "none",
  borderRadius: 40,
  fontSize: 16,
  fontWeight: 600,
  color: "#ffffff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
};

export default VehicleCategoryPage;
