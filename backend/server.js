require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const signRoutes = require("./routes/registerRoutes");
const userRoutes = require("./routes/appRoutes");
const cors = require('cors')

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000'}));
app.use("/api", signRoutes);
app.use("api/user", userRoutes);

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
