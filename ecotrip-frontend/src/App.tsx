import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

// Pages
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VehiclePage from "./pages/VehiclePage";
import VehicleCategoryPage from "./pages/VehicleCategoryPage";
import PrivateVehicleCalcPage from "./pages/PrivateVehicleCalcPage";
import PublicVehicleCalcPage from "./pages/PublicVehicleCalcPage";
import MaintenancePage from "./pages/MaintenancePage";
import VisitIdeasPage from "./pages/VisitIdeasPage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import AdminVisitIdeas from "./pages/AdminVisitIdeas";
import VehicleTracking from "./pages/VehicleTracking";

// Layout
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import AdminHotelPage from "./pages/AdminHotelPage";
import AdminAddHotel from "./pages/AdminAddHotel";


// ---------- LAYOUT ----------
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {!hideLayout && <NavbarComponent />}
      <main style={{ flex: 1 }}>{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}

// ---------- APP ----------
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/vehicle-category" element={<VehicleCategoryPage />} />
          <Route path="/private-vehicle" element={<PrivateVehicleCalcPage />} />
          <Route path="/public-vehicle" element={<PublicVehicleCalcPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />

          {/* Visit ideas */}
          <Route path="/visit-ideas" element={<VisitIdeasPage />} />
          <Route path="/place/:id" element={<PlaceDetailsPage />} />

          {/* 🚨 ADMIN */}
          <Route path="/admin" element={<AdminVisitIdeas />} />
          <Route path="/admin/visit-ideas" element={<AdminVisitIdeas />} />
          <Route path="/admin/hotels/:placeId" element={<AdminHotelPage />} />
          <Route path="/admin/add-hotel/:placeId" element={<AdminAddHotel />} />


          {/* Tracking */}
          <Route path="/vehicle-tracking" element={<VehicleTracking />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
