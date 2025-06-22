import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
// [row] is the same as row = result[0], called destructuring
// not ${id} because we are using a prepared statement, dont want sql injection
async function getUser(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUser(email, password, first_name, last_name) {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [email, password, first_name, last_name]
    );
    return result.insertId; // Return the ID of the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
createUser("jumana@ucsd.edu", "dirtyTrident123!", "Jose", "Umana");
const result = await getUsers();
console.log(result);

// testing sql connection so stopping the server after this
const app = express();
app.use(cors());
app.use(express.json());
await pool.end();
