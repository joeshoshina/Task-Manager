import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { createUser, getUser } from "./database.js";

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
    if (error.message === "User already exists") {
      return res.status(409).json({ error: "User already exists." });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Error creating user." });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    } else if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: "Sign-in successful", userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid password." });
    }
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(400).json({ error: "User not found" });
    }
    console.error("Signin error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
