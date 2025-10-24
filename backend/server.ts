import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
