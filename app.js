const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

//Import routings
const authRoutes = require("./routers/AuthRoute");
const userRoutes = require("./routers/UserRoute");
const menuRoutes = require("./routers/MenuRoute");
const courseRoutes = require("./routers/CourseRoute");
const postRoutes = require("./routers/PostRoute");

//Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure Header HTTP - CORS
app.use(cors());

//Configuraciones de las rutas
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;
