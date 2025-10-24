// Functions here will call services to interact with the database
// Here try and catch will live

import {
  checkUsernameAvailability,
  checkEmailAvailability,
} from "../services/authServices";

import { Request, Response, NextFunction } from "express";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      // Always throw an error inside a try catch
      throw new Error("Passwords do not match");
    }

    // Check if username is available
    const existingUsername = await checkUsernameAvailability(username);

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const existingEmail = await checkEmailAvailability(email);

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // Hash password

    // Insert user into database
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export default signupController;
