require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/registerRoutes")


app.use(express.json());
app.use("/",router)

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
