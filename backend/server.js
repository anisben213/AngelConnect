// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");  // Web framework for Node.js
const mongoose = require("mongoose");  // MongoDB object modeling tool
const app = express();  // Initialize Express application
const signRoutes = require("./routes/registerRoutes");  // Import routes for registration
const userRoutes = require("./routes/appRoutes");  // Import routes for user actions
const cors = require("cors");  // Middleware for enabling Cross-Origin Resource Sharing (CORS)

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS for requests from the specified origin
app.use(
  cors({ 
    origin: "http://localhost:3000",  // Allow requests from this origin
    exposedHeaders: ['x-total-pages']  // Expose custom headers
  })
);

// Register routes for sign-up and authentication related requests
app.use("/api", signRoutes);

// Register routes for user-related requests
app.use("/api/user", userRoutes);

// Retrieve MongoDB URI from environment variables
const URI = process.env.URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(URI)
  .then(() => {
    console.log("DB connected successfully");  // Log success message upon successful connection

    // Start the server on port 3001
    app.listen(3001, () => {
      console.log("Server is running on : localhost:3001");
    });
  })
  .catch((err) => console.log("DB connection failed;", err));  // Log
