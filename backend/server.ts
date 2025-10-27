import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
