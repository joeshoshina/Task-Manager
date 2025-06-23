import express from "express";
import cors from "cors";
import { createUser } from "./database.js"; // Adjust the import path as necessary

const app = express();
const PORT = process.env.PORT || 8080; // Default port for local development

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// hash password befor storing in database
app.post("/api/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const userId = await createUser(email, password, firstName, lastName);
    res.status(201).json({ message: "User created", userId });
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
