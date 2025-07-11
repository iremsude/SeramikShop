const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const mainRoute = require("./routes/index.js");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5001;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};
// middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(cors());


app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});