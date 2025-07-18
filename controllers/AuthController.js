const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require("../utils/jwt");

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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) res.status(400).json({ msg: "El email es obligatorio" });
    if (!password)
      res.status(400).json({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    const userStorage = await User.findOne({ email: emailLowerCase });

    bcrypt.compare(password, userStorage.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).json({ msg: "La contraseña no coincide" });
      } else if (!check) {
        res.status(400).json({ msg: "La contraseña es incorrecta" });
      } else if (!userStorage.active) {
        res.status(401).json({ msg: "Usuario no autorizado" });
      } else {
        res.status(200).json({
          access: jwt.createAccesToken(userStorage),
          refresh: jwt.createRefreshToken(userStorage),
        });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: "Error en el servidor: ", error });
  }
}

module.exports = {
  register,
  login,
};
