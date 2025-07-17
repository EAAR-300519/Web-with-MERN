const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

//Import routings
const authRoutes = require("./routers/AuthRoute");

//Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure Header HTTP - CORS
app.use(cors());

//Configuraciones de las rutas
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
