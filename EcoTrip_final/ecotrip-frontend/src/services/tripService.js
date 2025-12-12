import axios from "axios";

const API_URL = "http://localhost:8081/api/trips";

export const createFamilyTrip = async (tripData) => {
  try {
    const res = await axios.post(`${API_URL}/family`, tripData);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
