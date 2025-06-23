import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { createUser } from "./database.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.post("/api/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(email, hashedPassword, firstName, lastName);
    res.status(201).json({ message: "User created", userId });
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
