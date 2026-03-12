const express = require("express");

const router = express.Router();

const {
  registerUser,
  registerAdmin,
  login
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/admin/register", registerAdmin);

router.post("/login", login);

module.exports = router;