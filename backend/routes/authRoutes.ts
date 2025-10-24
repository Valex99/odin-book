// Set this up first
// Import router into server file.
import express from "express";
const router = express.Router();

// Signup route
router.post("/signup", (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  console.log("Signup data:", username, email, password);
  res.send("Signup route");
});

// Login route
router.post("/login", (req, res) => {
  // Extract data from request body
  const { email, password } = req.body;
  res.send("Login route");
});

export default router;
