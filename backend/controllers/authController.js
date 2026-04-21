const TeamLead = require("../models/TeamLead");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Reader = require("../models/Reader");

// 🔐 Helper: generate token
const generateToken = (user) => {
  return jwt.sign(
    {
     id: user._id,
    name: user.name,
    email: user.email,
    region: user.region,
    role: user.role, // 👈 ADD THIS
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// 🟢 REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, region } = req.body;

    const existingUser = await TeamLead.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 ADMIN LOGIC
    let role = "user";

    if (email === "admin@readingtracker.com") {
      role = "admin";
    }

    const newUser = await TeamLead.create({
      name,
      email,
      password: hashedPassword,
      region,
      role,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "Team Lead registered",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        region: newUser.region,
        role: newUser.role, // 🔥 IMPORTANT
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔵 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await TeamLead.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = generateToken(user);

    // Return clean response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        region: user.region,
        role: user.role, // 🔥 ADD THIS
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 PUBLIC USER LOGIN (NO DB, NO PASSWORD)
exports.publicLogin = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const token = jwt.sign(
      {
        role: "user",
        name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Public user logged in",
      token,
      user: {
        name,
        role: "user",
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.readerLogin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // 🔐 Generic password check
    if (password !== "123456") {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔍 Find reader
    const reader = await Reader.findOne({ name });

    if (!reader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    // 🔑 Generate token
    const token = jwt.sign(
      {
        id: reader._id,
        role: "user", // 👈 IMPORTANT
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Response
    res.json({
      token,
      user: {
        id: reader._id,
        name: reader.name,
        role: "user",
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};