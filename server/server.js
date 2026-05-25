import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";

// ==========================
// LOAD ENV VARIABLES
// ==========================
dotenv.config();

// ==========================
// CONNECT DATABASE
// ==========================
connectDB();

// ==========================
// EXPRESS APP
// ==========================
const app = express();

// ==========================
// MIDDLEWARE
// ==========================
app.use(
  "/uploads",

  express.static("uploads"),
);
// BODY PARSER
app.use(express.json());

// CORS
// CORS
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "https://gym-management-flame.vercel.app",
//     ],
//     credentials: true,
//   }),
// );
// CORS
app.use(
  cors({
    origin: "*",
  }),
);
// ==========================
// ROUTES
// ==========================

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// MEMBER ROUTES
app.use("/api/member", memberRoutes);

// ADD MEMBER ROUTE
// IMPORTANT FOR ADD MEMBER PAGE
app.use("/api/members", memberRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);

// ==========================
// HOME ROUTE
// ==========================
app.get("/", (req, res) => {
  res.send("Gym API Running 🚀");
});

// ==========================
// GLOBAL ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// ==========================
// SERVER
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
