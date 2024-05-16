require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const signRoutes = require("./routes/registerRoutes");
const userRoutes = require("./routes/appRoutes");

app.use(express.json());
app.use("api/register", signRoutes);
app.use("api/investors", userRoutes);

const URI = process.env.URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(3001, () => {
      console.log("server is running on : localhost:3001");
    });
  })
  .catch((err) => console.log("db connection failed;", err));
