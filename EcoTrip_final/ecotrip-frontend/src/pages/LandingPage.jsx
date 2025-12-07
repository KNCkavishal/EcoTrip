import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to EcoTrip!</h1>
      <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        Login
      </button>
      <button onClick={() => navigate("/signup")} style={{ margin: "10px" }}>
        Sign Up
      </button>
    </div>
  );
}
