// import axios from "axios";

// const API = "https://gym-backend-h2rw.onrender.com/api/admin";

// export const getMembers = () => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");

//   return axios.get(`${API}/members`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// };
// import axios from "axios";

// const API = "https://gym-backend-h2rw.onrender.com/api/admin";

// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

// /* Get all members */
// export const getMembers = () => {
//   return axios.get(`${API}/members`, authHeader());
// };

// /* ✅ Dashboard stats (THIS WAS MISSING) */
// export const getDashboardStats = () => {
//   return axios.get(`${API}/stats`, authHeader());
// };
import axios from "axios";

// const API = "https://gym-backend-h2rw.onrender.com/api/admin";
const API = "https://gym-backend-h2rw.onrender.com/api/admin";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

// ✅ Dashboard stats (ADD THIS)
export const getDashboardStats = () =>
  axios.get(`${API}/stats`, authHeader());

// ✅ Pending users
export const getPendingUsers = () =>
  axios.get(`${API}/pending`, authHeader());

// ✅ Approve user
export const approveUser = (id) =>
  axios.put(`${API}/approve/${id}`, {}, authHeader());

// ❌ Reject user
export const rejectUser = (id) =>
  axios.delete(`${API}/reject/${id}`, authHeader());