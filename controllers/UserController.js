async function getMe(req, res) {
  res.status(200).json({ msg: "Llega a UserController!" });
}

module.exports = {
  getMe,
};
