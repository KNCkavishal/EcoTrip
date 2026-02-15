import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminVisitIdeas = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    province: "",
    district: "",
    category: "",
    reason: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8081/api/admin/visit-ideas",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Place added successfully");

      // 🔥 Get saved place ID from backend response
      const newPlaceId = res.data.id || res.data._id;

      // 🔥 Redirect to hotel page with placeId
      navigate(`/admin/add-hotel/${newPlaceId}`);

    } catch (err) {
      console.error(err);
      alert("Error adding place");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin – Add Visit Idea</h2>

      <input name="name" placeholder="Place name" value={form.name} onChange={handleChange} />
      <input name="province" placeholder="Province" value={form.province} onChange={handleChange} />
      <input name="district" placeholder="District" value={form.district} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

      <br /><br />

      <button onClick={submit}>
        Add Place
      </button>
    </div>
  );
};

export default AdminVisitIdeas;
