const Reader = require("../models/Reader");

// ➕ Add Reader
exports.addReader = async (req, res) => {
  try {
const { name, phone, region } = req.body;

const reader = await Reader.create({
  name,
  phone,
  region,
  teamLeadId: req.user.id, // 🔥 REAL OWNER
});

    res.status(201).json(reader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get Readers for TL
exports.getReaders = async (req, res) => {
  try {
    const readers = await Reader.find({ teamLeadId: req.user.id });
    res.json(readers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ⏱ Update Hours + Wallet
exports.updateHours = async (req, res) => {
  try {
    const { hours } = req.body;

    // validation (IMPORTANT)
    if (!hours || isNaN(hours)) {
      return res.status(400).json({ message: "Invalid hours value" });
    }

    const reader = await Reader.findById(req.params.id);

    if (!reader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    // Update hours
    reader.totalHours += Number(hours);

    // $1 per hour
    reader.walletBalance = reader.totalHours * 1;

    // Add to history
    reader.workHistory.push({
      hours: Number(hours),
      addedBy: req.user.id, // ✅ FIXED HERE
    });

    await reader.save();

    res.json(reader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔍 Reader Lookup (no login)
exports.lookupReader = async (req, res) => {
  try {
    const { phone, teamLeadId } = req.body;

    const reader = await Reader.findOne({
      phone,
      teamLeadId: teamLeadId || "temp-id",
    });

    if (!reader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    res.json(reader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};