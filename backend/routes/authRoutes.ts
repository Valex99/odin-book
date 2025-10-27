// Set this up first
// Import router into server file.
import express from "express";
const router = express.Router();

import {
  loginController,
  signupController,
} from "../controllers/authController";

// Automatically passes res req next to controller
router.post("/signup", signupController);

router.post("/login", loginController);

export default router;
