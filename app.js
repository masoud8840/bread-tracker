const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const UserRoute = require("./routes/User.js");
app.use("/api/v1/auth", UserRoute);

const AdminRoute = require("./routes/Admin.js");
app.use("/api/v1/admin", AdminRoute);
mongoose.connect(process.env.URI).then((res) => {
  app.listen(3000, () => {
    console.log("App is running and MongoDB is connected".yellow.bold);
  });
});
