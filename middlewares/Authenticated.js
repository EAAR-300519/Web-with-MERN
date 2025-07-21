const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  console.log("ESTAMOS EN EL ASURE AUTH");
  console.log(req.headers.authorization);

  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ msg: "No se está recibiendo la petición correctamente" });
  }

  const tokenNoBearer = token.replace("Bearer ", "");

  try {
    const payload = jwt.decoded(tokenNoBearer);
    console.log(payload);
    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      res.status(500).json({ msg: "El token ha caducado" });
    } else {
      req.user = payload;
      next();
    }
  } catch (error) {
    return res.status(400).json({ msg: "Token Invalido" });
  }
}

module.exports = {
  asureAuth,
};
