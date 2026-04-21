const express = require("express");
const router = express.Router();

const { getOverview } = require("../controllers/superAdminController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getOverview);

module.exports = router;