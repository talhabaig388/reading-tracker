const express = require("express");
const router = express.Router();

console.log("Reader routes file loaded");

const {
  addReader,
  getReaders,
  updateHours,
  lookupReader,
} = require("../controllers/readerController");

// 🔐 Import auth middleware
const auth = require("../middleware/authMiddleware");

// 🔒 Protected routes (require login)
router.post("/", auth, addReader);
router.get("/", auth, getReaders);
router.put("/:id/hours", auth, updateHours);

// 🌐 Public route (no login needed)
router.post("/lookup", lookupReader);

module.exports = router;