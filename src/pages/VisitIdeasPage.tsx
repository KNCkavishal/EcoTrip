import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VisitIdeasPage.css";

interface Place {
  id: string;
  name: string;
  province: string;
  district: string;
  category: string;
  image?: string;
  reason: string;
  nearbyPlaces?: string[];
}

const VisitIdeasPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ SEARCH STATE
  const navigate = useNavigate();

  // 🔹 FETCH PLACES
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/visit-ideas")
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error("Failed to load places", err));
  }, []);

  // 🔹 DYNAMIC CATEGORIES
  const categories = [
    "All",
    ...Array.from(new Set(places.map((p) => p.category))),
  ];

  // 🔹 FILTER LOGIC (Category + Search)
  const filteredPlaces = places
    .filter((p) =>
      selectedCategory === "All"
        ? true
        : p.category === selectedCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="ideas-container">
      <h1 className="ideas-title">✨ Where Should I Visit?</h1>
      <p className="ideas-subtitle">
        Get inspired for your next eco-friendly trip
      </p>

      {/* 🔍 SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🎯 CATEGORY FILTER */}
      <div className="filter-bar">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 🏞️ PLACE GRID */}
      <div className="ideas-grid">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="idea-card"
            onClick={() => navigate(`/place/${place.id}`)}
          >
            {place.image && (
              <img src={place.image} alt={place.name} />
            )}

            <div className="idea-info">
              <h3>{place.name}</h3>

              <p className="location">
                {place.district} • {place.province}
              </p>

              <p className="reason">{place.reason}</p>

              {place.nearbyPlaces && place.nearbyPlaces.length > 0 && (
                <div className="nearby-preview">
                  <strong>📍 Nearest Places:</strong>
                  <ul>
                    {place.nearbyPlaces.slice(0, 3).map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🧩 IF NO RESULTS */}
      {filteredPlaces.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 30 }}>
          No places found.
        </p>
      )}
    </div>
  );
};

export default VisitIdeasPage;
