import dotenv from "dotenv";
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

export async function getUsers() {
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

// param had to match frontend form
export async function createUser(email, password, firstName, lastName) {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [email, password, firstName, lastName]
    );
    return result.insertId; // Return the ID of the newly created user
  } catch (error) {
    // mysql2 throws error.code/errno; can't check email after failed insert
    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
      throw new Error("User already exists");
    }
    console.error("Error creating user:", error);
    throw error;
  }
} // gotta add user exits case and also add that to backend so forntend shows proper error message

export async function getUser(email) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
