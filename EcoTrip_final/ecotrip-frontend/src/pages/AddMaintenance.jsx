import React, { useState } from "react";
import api from "../api/axios";

export default function AddMaintenance() {
  const [data, setData] = useState({
    vehicleId: "",
    vehicleType: "CAR",
    serviceCost: 0,
    tyreCost: 0,
    otherCost: 0,
  });

  const submit = async () => {
    await api.post("/api/maintenance/add", data);
    alert("Maintenance record saved");
  };

  return (
    <div>
      <h2>Add Maintenance</h2>

      <input placeholder="Vehicle ID"
        onChange={e => setData({ ...data, vehicleId: e.target.value })} />

      <select
        onChange={e => setData({ ...data, vehicleType: e.target.value })}>
        <option>CAR</option>
        <option>BUS</option>
        <option>BIKE</option>
      </select>

      <input type="number" placeholder="Service Cost"
        onChange={e => setData({ ...data, serviceCost: e.target.value })} />

      <input type="number" placeholder="Tyre Cost"
        onChange={e => setData({ ...data, tyreCost: e.target.value })} />

      <input type="number" placeholder="Other Cost"
        onChange={e => setData({ ...data, otherCost: e.target.value })} />

      <button onClick={submit}>Save</button>
    </div>
  );
}
