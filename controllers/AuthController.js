function register(req, res) {
  console.log("Se ha ejecutado correctamente");

  res.status(200).json({ msg: "Todo Ok!" });
}

module.exports = {
  register,
};
