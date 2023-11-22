import express from "express";
import { getImage } from "../controllers/search.js";

const router = express.Router();

    router.get("/",getImage);

export default router;