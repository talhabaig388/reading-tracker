const mongoose = require("mongoose");

const TeamLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    region: { type: String, required: true },

    // 🔥 NEW FIELD
    role: {
    type: String,
    default: "admin", // 👈 THIS IS IMPORTANT
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamLead", TeamLeadSchema);