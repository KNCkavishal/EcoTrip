import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VehicleRegistrationPage from "./pages/VehicleRegistrationPage";
import FamilyTripPage from "./pages/FamilyTripPage";
import PublicTripPage from "./pages/PublicTripPage";
import BusFareTripPage from "./pages/BusFareTripPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/vehicle-register" element={<VehicleRegistrationPage />} />
        <Route path="/family-trip" element={<FamilyTripPage />} />
        <Route path="/public-trip" element={<PublicTripPage />} />
        <Route path="/busfare-trip" element={<BusFareTripPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
