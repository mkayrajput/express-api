const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel.js");
const { generateAdminToken } = require("../utils/generateToken.js");

// @desc Auth user/set/token
// @route POST /api/users/auth
// @access Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateAdminToken(res, admin._id);
    res.status(200).json({
      _id: admin._id,
      name: admin.username,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Auth user/set/token
// @route POST /api/users/register
// @access Public
const registerAdmin = asyncHandler(async (req, res) => {
  const {name, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("User aleady exists");
  }

  const admin = await Admin.create({
    username: name,
    email,
    password,
  });

  if (admin) {
    generateAdminToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.username,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Auth user/set/token
// @route POST /api/users/logout
// @access Public
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("auth", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: " User logged out" });
});

// @desc Auth user/set/token
// @route POST /api/users/profile
// @access Public
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = {
    _id: req.admin._id,
    name: req.admin.username,
    email: req.admin.email,
  };
  res.status(200).json(admin);
});
// @desc Auth user/set/token
// @route POST /api/users/update
// @access Public
const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.username = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();
    res.status(201).json({
      _id: updatedAdmin._id,
      name: updatedAdmin.username,
      email: updatedAdmin.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  registerAdmin,
  authAdmin,
  updateAdminProfile,
  getAdminProfile,
  logoutAdmin,
};
