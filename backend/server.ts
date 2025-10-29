import express from "express";
import authRoutes from "./routes/authRoutes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();

dotenv.config();
process.env.TOKEN_SECRET;

// NOTE
// If the file is named server.ts, then the import statement should be: import express from "express";
// If the file name is server.js then you can use require

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

// To use middleware
// app.use(middleware);
// Watch out where in code to put it (izvajajo se por vrsti)
// npr ce hoces da je authRouter izven JWT checkupa pac da ne runa jwt checkup
// mors dat app.use za authRouter above app.use za middleware za jwt
// in pod app.use za middleware usi routeri below so zasciteni s tem middlewarom
// ker se prvu runa jwt in ce gre skuzi calla next
