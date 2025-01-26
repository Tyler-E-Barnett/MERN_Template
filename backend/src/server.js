import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve("backend/.env") });

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

try {
  // Connect to MongoDB
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1); // Exit the application if MongoDB fails to connect
}

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// Example custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", router);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
