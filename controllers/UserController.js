const UserModel = require("../models/UserModel");
const image = require("../utils/image");
const bcrypt = require("bcryptjs");

async function getMe(req, res) {
  try {
    const { user_id } = req.user;
    const response = await UserModel.findById(user_id);
    if (!response) {
      res.status(400).json({ msg: "No se ha encontrado el usuario!" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un problema en el servidor..." });
  }
}

async function getUsers(req, res) {
  try {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
      response = await UserModel.find();
    } else {
      response = await UserModel.find({ active });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error en el servicio..." });
  }
}

async function createUser(req, res) {
  try {
    const { password } = req.body;
    // Encriptamos la contraseña que nos llega por que, viene sin encriptar.
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new UserModel({
      ...req.body,
      active: true,
      password: hashPassword,
    });

    if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      console.log("IMAGEN PATH", imagePath);
      user.avatar = imagePath;
    }

    const userStorage = await user.save();
    res.status(201).json(userStorage);
  } catch (error) {
    res.status(400).json({ msg: "El usuario ya existe!" });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
};
