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

    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({
      msg: "Error al tratar de consultar todos los cursos",
    });
  }
}

async function updateCourses(req, res) {
  try {
    const { id } = req.params;
    const coursesData = req.body;

    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      coursesData.miniature = imagePath;
    }

    await CourseModel.findByIdAndUpdate({ _id: id }, coursesData);
    res.status(200).json({ msg: "Se ha actualizado correctamente el curso" });
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar el curso" });
  }
}

async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    await CourseModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "El curso se ha eliminado correctamente!" });
  } catch (error) {
    res.status(400).json({ msg: "Error al tratar de eliminar el curso" });
  }
}
module.exports = {
  createCourse,
  getCourses,
  updateCourses,
  deleteCourse,
};
