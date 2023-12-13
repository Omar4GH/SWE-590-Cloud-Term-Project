import express from "express";
import {  getHeavyComputation } from "../controllers/heavyComp.js";

const router = express.Router();

    router.post("/",getHeavyComputation);


export default router;