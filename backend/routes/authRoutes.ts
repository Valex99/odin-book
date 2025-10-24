// Set this up first
// Import router into server file.
import express from "express";
const router = express.Router();

import signupController from "../controllers/authController";

// Automatically passes res req next to controller
router.post("/signup", signupController);

export default router;
