import express from "express";
import apiRoutes from "./api.js";

const router = express.Router();

// API routes
router.use("/v1", apiRoutes);

// Example route
router.get("/", (req, res) => {
  res.send("API Root");
});

export default router;
