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

// ✅ Get all attendance (new feature)
export const getAllAttendance = async () => {
  try {
    return await axios.get("https://gym-backend-h2rw.onrender.com/api/attendance/all", authHeader());
  } catch (error) {
    console.warn("Render server not responding, trying local server fallback", error);
    return await axios.get("http://localhost:5000/api/attendance/all", authHeader());
  }
};

// ✅ Get all payments
export const getAllPayments = async () => {
  try {
    return await axios.get("https://gym-backend-h2rw.onrender.com/api/payments/all", authHeader());
  } catch (error) {
    console.warn("Render server not responding, trying local server fallback", error);
    return await axios.get("http://localhost:5000/api/payments/all", authHeader());
  }
};

// 💳 Process a new payment from member
export const makePayment = async (paymentData) => {
  try {
    return await axios.post("https://gym-backend-h2rw.onrender.com/api/payments/pay", paymentData, authHeader());
  } catch (error) {
    console.warn("Render server not responding, trying local server fallback", error);
    return await axios.post("http://localhost:5000/api/payments/pay", paymentData, authHeader());
  }
};