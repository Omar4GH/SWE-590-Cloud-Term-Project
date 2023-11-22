import  express  from "express";
import cors from "cors";
import messagesRoute from "./routes/message.js";
import searchRoute from "./routes/search.js";
import mongoose from "mongoose";
import { db } from "./db.js";

const app = express()
app.use(express.json());
async function connect(){
    try{
        await mongoose.connect(db)
        console.log("Connected to MongoDB!!")
    }catch(error){
        console.log(error);
    }
}

connect();

app.use(cors({
    origin: '*',
    credentials: true
  }));



  app.use("/api/search", searchRoute)

app.use("/api/message", messagesRoute)


app.listen(7000,()=>{
    console.log("Connected")
})