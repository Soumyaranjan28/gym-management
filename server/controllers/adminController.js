
import User from "../models/User.js";
import Payment from "../models/Payment.js";

// ==========================
// DASHBOARD STATS
// ==========================
export const getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await User.countDocuments({
      role: "member",
      isApproved: true
    });

    const newMembers = await User.countDocuments({
      role: "member",
      isApproved: true,
      createdAt: {
        $gte: new Date(
          new Date().setDate(
            new Date().getDate() - 30
          )
        ),
      },
    });

    const pendingMembers = await User.countDocuments({
      role: "member",
      isApproved: false
    });

    // Calculate real revenue
    const payments = await Payment.find({ status: "Paid" });
    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    res.json({
      totalMembers,
      expiringMembers: 0,
      newMembers,
      pendingMembers,
      totalRevenue,
      visitorsToday: 0,
      bookings: 0,
    });

  } catch (error) {
    console.error("Stats fetch error:", error);
    res.status(500).json({
      message: "Error fetching stats",
    });
  }
};
export const getAllMembers = async (req, res) => {
  try {

    const members = await User.find({
      role: "member",
    });

    res.json(members);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching members",
    });
  }
};
// ==========================
// UPLOAD MEMBER PHOTO
// ==========================
export const uploadPhoto = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // SAVE IMAGE URL
    user.photo = `https://gym-backend-h2rw.onrender.com/${req.file.path.replace(/\\/g, "/")}`;

    await user.save();

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};