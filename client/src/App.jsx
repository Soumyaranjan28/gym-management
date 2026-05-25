import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddMember from "./pages/AddMember";
import PendingUsers from "./pages/PendingUsers";
import LandingPage from "./pages/LandingPage";
import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
/* NEW PAGES */
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/attendance" element={<Attendance />} />
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-member"
          element={
            <ProtectedRoute role="admin">
              <AddMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pending"
          element={
            <ProtectedRoute role="admin">
              <PendingUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/members"
          element={
            <ProtectedRoute role="admin">
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute role="admin">
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* MEMBER */}
        <Route
          path="/member"
          element={
            <ProtectedRoute role="member">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        {/* NEW ROUTES */}
        <Route
          path="/workouts"
          element={
            <ProtectedRoute role="member">
              <Workouts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="member">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// export default function App() {
//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#0f172a",
//         color: "white",
//         fontFamily: "Arial",
//         textAlign: "center",
//         padding: "20px",
//       }}
//     >
//       <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>eFitness</h1>

//       <h2 style={{ color: "#38bdf8", marginBottom: "20px" }}>
//         Website Under Maintenance
//       </h2>

//       <p style={{ maxWidth: "600px", lineHeight: "1.8" }}>
//         We are currently upgrading our gym portal to improve your experience.
//         The website will be available again soon.
//       </p>

//       <div style={{ marginTop: "30px", opacity: 0.7 }}>
//         Thank you for your patience 💪
//       </div>
//     </div>
//   );
// }
