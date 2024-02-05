require("dotenv").config();
require("express-async-errors"); // catches any async error in the API, no need for any other ErrorHandling like try-catch // will work only after listening, middleware
const express = require("express");
const app = express();
//google linkdien facebook
//initiating SERVERR
require("./startup/index.startup")(app); // strating server
