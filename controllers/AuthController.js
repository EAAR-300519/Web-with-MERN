const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!email) {
      res.status(404).json({ msg: "El email es obligarotio." });
    }
    if (!password) {
      res.status(404).json({ msg: "El password es obligarotio." });
    }

    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: "user",
      active: true,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    const userStorage = await user.save();
    res.status(200).json(userStorage);
  } catch (error) {
    res.status(400).json({ msg: "El usuario ya existe!" });
  }
}

module.exports = {
  register,
};
