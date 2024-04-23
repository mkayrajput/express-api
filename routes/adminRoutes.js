const express = require("express");
const router = express.Router();
const {
  authAdmin,
  getAdminProfile,
  logoutAdmin,
  registerAdmin,
  updateAdminProfile,
} = require("../controllers/adminControllers.js");
const { protectAdmin } = require("../middleware/authMiddleware.js");

router.post("/", registerAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
router
  .route("/profile")
  .get(protectAdmin, getAdminProfile)
  .put(protectAdmin, updateAdminProfile);

module.exports = router;
