const mongoose = require("mongoose");

const ReaderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    teamLeadId: {
      type: String, // ✅ FIXED
      required: true,
    },
    totalHours: {
      type: Number,
      default: 0,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    workHistory: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        hours: {
          type: Number,
          required: true,
        },
        addedBy: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reader", ReaderSchema);