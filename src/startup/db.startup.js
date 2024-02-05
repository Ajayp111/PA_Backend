//"mongodb+srv://ajayperumalla111:AjayUser123@cluster0.lthydwt.mongodb.net/pw_backendd";
// db.startup.js

const mongoose = require("mongoose");

const connectToDatabase = async (app) => {
  try {
    await mongoose.connect(
      `mongodb+srv://pathakassociates:qE57ts5wgjUrdXWh@cluster0.zun2xnv.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("💽 Database is Connected Successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if there's an error connecting to the database
  }
};

module.exports = connectToDatabase;
