import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const signup = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data; // JWT token
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
