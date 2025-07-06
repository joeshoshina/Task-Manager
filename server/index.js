import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createUser, getUser } from "./database.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // for cookies
  })
);
app.use(cookieParser());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  //   const authHeader = req.headers["authorization"]; //authorization: ;Bearer <token>'
  //   const token = authHeader && authHeader.split(" ")[1]; //['Bearer', '<token>']
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ auth: false, error: "Access token is required." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token." });
      }
      req.userId = decoded.id;
      next();
    });
  }
};

// endpoint to check user authentication
app.get("/api/auth", verifyJWT, (req, res) => {
  res.json({
    auth: true,
    message: "User is authenticated",
    userId: req.userId,
  });
});

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
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }
    /* adding JWT logic here */
    // access and refresh tokens have to be implemented later on
    const id = user.id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // make true in production
      sameSite: "Strict", // set "None" when deploying since I will use Netlify for frontend and Render for backend
      maxAge: 15 * 60 * 1000,
    });

    const { password: _, ...userSafe } = user;
    res.status(200).json({ auth: true, user: userSafe });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(400).json({ error: "User not found" });
    }
    console.error("Signin error:", error);
    // low severity error, need error cleared in frontend when user tries to sign in again
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
