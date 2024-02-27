//This  will be the starting file of project

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");

//Creating an admin user at the starting of the application,if not already present
//Connection with mongoDb

mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error While Connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  init();
});
async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });
    if (user) {
      console.log(`Admin is already Present`);
      return;
    }
  } catch (err) {
    console.log(`Error while reading the data `, err);
  }

  try {
    user = await user_model.create({
      name: "Santosh",
      userId: "admin",
      email: "santosh26santu@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome1", 8),
    });
    console.log(`Admin Created`, user);
  } catch (err) {
    console.log(`Error while creating admin `, err);
  }
}

// Start the server
app.listen(server_config.PORT, () => {
  console.log("Server Started at port num : ", server_config.PORT);
});
