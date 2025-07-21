const UserModel = require("../models/UserModel");

async function getMe(req, res) {
  const { user_id } = req.user;
  const response = await UserModel.findById(user_id);

  if (!response) {
    res.status(400).json({ msg: "No se ha encontrado el usuario!" });
  } else {
    res.status(200).json(response);
  }
}

module.exports = {
  getMe,
};
