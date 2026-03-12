const User = require("../models/User");
const Admin = require("../models/Admin");

// USER REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new User({ name, email, password });

    await user.save();

    res.json({
      success: true,
      message: "User Registered Successfully"
    });

  } catch (error) {
    res.status(500).json({ success:false, message:"Server Error" });
  }
};

// ADMIN REGISTER
const registerAdmin = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({ success:false, message:"Admin already exists" });
    }

    const admin = new Admin({ name, email, password });

    await admin.save();

    res.json({ success:true, message:"Admin Registered Successfully" });

  } catch (error) {

    res.status(500).json({ success:false, message:"Server Error" });

  }
};

// LOGIN
const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const admin = await Admin.findOne({ email });

    if (admin) {

      if (admin.password !== password) {
        return res.json({ success:false, message:"Incorrect password" });
      }

      return res.json({
        success:true,
        role:"admin",
        user:admin
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success:false, message:"User not found" });
    }

    if (user.password !== password) {
      return res.json({ success:false, message:"Incorrect password" });
    }

    res.json({
      success:true,
      role:"user",
      user:user
    });

  } catch (error) {
    res.status(500).json({ success:false, message:"Server error" });
  }
};

module.exports = {
  registerUser,
  registerAdmin,
  login
};