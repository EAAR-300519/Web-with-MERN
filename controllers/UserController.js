const UserModel = require("../models/UserModel");

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

module.exports = {
  getMe,
  getUsers,
};
