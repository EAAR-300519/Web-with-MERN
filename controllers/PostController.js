const PostModel = require("../models/PostModel");
const image = require("../utils/image");

async function createPost(req, res) {
  try {
    const post = new PostModel(req.body);
    const imagePath = image.getFilePath(req.files.miniature);

    post.miniature = imagePath;
    post.created_at = new Date();
    const postStored = await post.save();

    res.status(200).json(postStored);
  } catch (error) {
    res.status(400).json({ msg: "Error al tratar de crear el post" });
  }
}

async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const option = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { created_at: "desc" },
    };
    const posts = await PostModel.paginate({}, option);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Error al tratar de procesar todos los post" });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      postData.miniature = imagePath;
    }

    await PostModel.findByIdAndUpdate({ _id: id }, postData);
    res.status(200).json({ msg: "Se ha actualizado correctamente el post" });
  } catch (error) {
    res.status(500).json({ msg: "Error al tratar de actualizar el post" });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;

    await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "El post se ha eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al tratar de eliminar el post" });
  }
}

async function getPostPath(req, res) {
  try {
    const { path } = req.params;

    const postStored = await PostModel.findOne({ path });
    if (!postStored) {
      res.status(400).json({ msg: "No se ha encontrado ningún post" });
    }

    res.status(200).json(postStored);
  } catch (error) {
    res.status(400).json({ msg: "Error al tratar de obtener el post" });
  }
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostPath,
};
