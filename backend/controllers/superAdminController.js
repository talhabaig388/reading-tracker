const Reader = require("../models/Reader");
const TeamLead = require("../models/TeamLead");

exports.getOverview = async (req, res) => {
  try {
    const teamLeads = await TeamLead.find({ role: "admin" });

    const result = [];

    for (let tl of teamLeads) {
      const readers = await Reader.find({ teamLeadId: tl._id });

      const totalReaders = readers.length;
      const totalHours = readers.reduce((sum, r) => sum + r.totalHours, 0);
      const totalWallet = readers.reduce((sum, r) => sum + r.walletBalance, 0);

      result.push({
        teamLead: tl.name,
        region: tl.region,
        totalReaders,
        totalHours,
        totalWallet,
      });
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};