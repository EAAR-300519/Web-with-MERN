const CourseModel = require("../models/CourseModel");
const image = require("../utils/image");

async function createCourse(req, res) {
  try {
    const course = new CourseModel(req.body);
    const imagePath = image.getFilePath(req.files.miniature);

    course.miniature = imagePath;
    const courseStored = await course.save();

    res.status(201).json(courseStored);
  } catch (error) {
    res.status(400).json({
      msg: "Error al tratar de crear el curso, por favor intente más tarde",
    });
  }
}

async function getCourses(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const courses = await CourseModel.paginate({}, options);
    console.log("========");
    console.log(courses);
    console.log("========");

    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({
      msg: "Error al tratar de consultar todos los cursos",
    });
  }
}

module.exports = {
  createCourse,
  getCourses,
};
