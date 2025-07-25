const express = require("express");
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/CourseController");
const md_auth = require("../middlewares/Authenticated");

const md_multiparty = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

//ENDPOINTS

module.exports = api;
