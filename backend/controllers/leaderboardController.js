const Reader = require("../models/Reader");

// 🏆 Leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    // 🥇 All-time top 3
    const allTime = await Reader.find()
      .sort({ walletBalance: -1 })
      .limit(3);

    // 🥇 Today top 3
    const today = await Reader.aggregate([
      {
        $unwind: "$workHistory",
      },
      {
        $match: {
          "workHistory.date": {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          totalToday: { $sum: "$workHistory.hours" },
        },
      },
      {
        $sort: { totalToday: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    res.json({
      today,
      allTime,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};