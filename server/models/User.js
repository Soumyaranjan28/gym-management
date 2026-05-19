import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: String,

    address: String,

    age: Number,

    weight: Number,

    emergencyContact: String,

    membership: {
      type: String,
      default: "Monthly",
    },

    joiningDate: Date,

    expiryDate: Date,

    role: {
      type: String,
      default: "member",
    },
    admissionDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
