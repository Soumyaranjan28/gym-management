import axios from "axios";

const API = "https://gym-backend-h2rw.onrender.com";

export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};
