import axios from "axios";

const instance = axios.create({
  baseURL: "https://cozy-education-production.up.railway.app",
});

// 🔥 THIS IS THE MISSING PIECE
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;