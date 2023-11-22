import { db } from "../db.js";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const authRouter = express.Router();


const dbName = "swe590";
export const getMessages = async (req, res) => {
    try {
      const client = new MongoClient(db);
      await client.connect();
  
      const dbname = client.db(dbName);
  
      const messagesCollection = dbname.collection("messages");
  
      const messages = await messagesCollection.find({}).toArray();
  
      // Debugging: Log the messages to the console
      console.log(messages);
  
      res.status(200).json(messages);
    } catch (err) {
      console.error("Error while fetching messages:", err);
      res.status(500).json("Error while fetching messages");
    } 
  };
  


export const postMessage = async (req, res) => {
    try {
      const client = new MongoClient(db, { useUnifiedTopology: true });
      await client.connect();
  
      const dbname = client.db(dbName);
  
      const messagesCollection = dbname.collection("messages");
  
      const messageDocument = {
        message: req.body.message,
      };
  
      const result = await messagesCollection.insertOne(messageDocument);
  
      // Check if the insertion was successful
      if (result.insertedCount === 1) {
        res.status(201).json({ success: true, message: "Message posted successfully" });
      } else {
        res.status(500).json({ success: false, message: "Error posting message" });
      }
  
    } catch (err) {
      console.error("Error while posting message:", err);
      res.status(500).json({ success: false, message: "Error posting message" });
    }
  };
  
