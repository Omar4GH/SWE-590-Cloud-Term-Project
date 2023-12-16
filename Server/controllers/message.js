import express from "express";
import mysql from "mysql2/promise";

const authRouter = express.Router();

const dbConfig = {
/* host: "localhost", // or use the IP address/domain of your MySQL server
  user: "root",
  port: 6400,
  password: "password",
  database: "swe590",
*/
  host: "swe590.c7zckzd6affb.eu-central-1.rds.amazonaws.com", // or use the IP address/domain of your MySQL server
  user: "admin",
  port: 3306,
  password: "password",
  database: "swe590",

};

const pool = mysql.createPool(dbConfig);

export const getMessages = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM messages");
    connection.release();

    console.log(rows);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error while fetching messages:", err);
    res.status(500).json("Error while fetching messages");
  }
};

export const postMessage = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute("INSERT INTO messages (message) VALUES (?)", [req.body.message]);
    connection.release();

    // Check if the insertion was successful
    if (result.affectedRows === 1) {
      res.status(201).json({ success: true, message: "Message posted successfully" });
    } else {
      res.status(500).json({ success: false, message: "Error posting message" });
    }
  } catch (err) {
    console.error("Error while posting message:", err);
    res.status(500).json({ success: false, message: "Error posting message" });
  }
};
