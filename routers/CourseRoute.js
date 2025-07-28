const express = require("express");
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/CourseController");
const md_auth = require("../middlewares/Authenticated");

const md_multiparty = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

//ENDPOINTS
api.post(
  "/course",
  [md_auth.asureAuth, md_multiparty],
  CourseController.createCourse
);
api.get("/courses", CourseController.getCourses);

module.exports = api;
