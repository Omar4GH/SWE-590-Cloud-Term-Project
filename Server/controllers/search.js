import { db } from "../db.js";
import express from "express";
import axios from "axios";

export const getImage = async (req, res) => {
    try {
        // Set default or additional parameters on the server side
        const defaultParams = {
          engine: 'google_images',
          ijn: 0,
          api_key: '2519d27b48f82d925a4a8434294511b6279b7e5dfd76aff6784698b66f2a4660',
        };
    
        // Merge default and frontend parameters
        const combinedParams = { ...defaultParams, ...req.query };
    
        const serpApiUrl = 'https://serpapi.com/search.json';
        const serpApiResponse = await axios.get(serpApiUrl, {
          params: combinedParams,
        });
    
        res.json(serpApiResponse.data);
      } catch (error) {
        console.error('Error in /api/search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  