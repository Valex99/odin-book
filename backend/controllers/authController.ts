// Functions here will call services to interact with the database
// Here try and catch will live

import {
  checkUsernameAvailability,
  checkEmailAvailability,
  createUser,
  getUserFromDb,
} from "../services/authServices";

import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";
const SALT_ROUNDS = 10; // Typically a value between 10 and 12

export const signupController = async (
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

    // Validate password strength
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    // Hash password
    const bcryptPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("Bcrypt password:", bcryptPassword);

    // Insert user into database
    const newUser = await createUser(username, email, bcryptPassword);

    // Send result back to client
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // return res
    //   .status(400)
    //   .json({ message: "Signup failed", error: error.message });
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(400)
      .json({ message: "Signup failed", error: errorMessage });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const userFromDb = await getUserFromDb(email);

    // If email does not exist, throw an error and send back to client
    if (!userFromDb) {
      throw new Error("Email does not exist");
    }

    // Hash password first
    const isPasswordValid = await bcrypt.compare(password, userFromDb.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Redirect to / page
    return (
      res
        .status(200)
        // return user object to client without password
        .json({
          message: "Login successful",
          user: {
            id: userFromDb.id,
            username: userFromDb.username,
            email: userFromDb.email,
          },
        })
        .redirect("/")
    );

    // Send feedback to client
    // Show toast message
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(400)
      .json({ message: "Login failed", error: errorMessage });
  }
};
