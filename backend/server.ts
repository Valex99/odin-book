import express from "express";
import authRoutes from "./routes/authRoutes.js";
import jwt from "jsonwebtoken";

const app = express();

// JWT needs to be stored inside memory, not in a file

// Require JWT
// JWT is already imported at the top with: import jwt from "jsonwebtoken";
// No need to require or re-initialize here.

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
