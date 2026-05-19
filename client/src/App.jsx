// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import MemberDashboard from "./pages/MemberDashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import MemberDashboard from "./pages/MemberDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AddMember from "./pages/AddMember";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Admin protected route */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Member protected route */}
//         <Route
//           path="/member"
//           element={
//             <ProtectedRoute role="member">
//               <MemberDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <Route path="/admin/add-member" element={<AddMember />} />

//     </BrowserRouter>
//   );
// }

// export default App;
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import MemberDashboard from "./pages/MemberDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AddMember from "./pages/AddMember";
// import PendingUsers from "./pages/PendingUsers";
// import LandingPage from "./pages/LandingPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<LandingPage />} />

//         {/* Admin Dashboard */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Add Member */}
//         <Route
//           path="/admin/add-member"
//           element={
//             <ProtectedRoute role="admin">
//               <AddMember />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/pending"
//           element={
//             <ProtectedRoute role="admin">
//               <PendingUsers />
//             </ProtectedRoute>
//           }
//         />

//         {/* Member Dashboard */}
//         <Route
//           path="/member"
//           element={
//             <ProtectedRoute role="member">
//               <MemberDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute role="admin">
              <Members />
            </ProtectedRoute>
          }
        />
        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Add Member */}
        <Route
          path="/admin/add-member"
          element={
            <ProtectedRoute role="admin">
              <AddMember />
            </ProtectedRoute>
          }
        />

        {/* Pending Users */}
        <Route
          path="/admin/pending"
          element={
            <ProtectedRoute role="admin">
              <PendingUsers />
            </ProtectedRoute>
          }
        />

        {/* Member Dashboard */}
        <Route
          path="/member"
          element={
            <ProtectedRoute role="member">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
