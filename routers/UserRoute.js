const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/UserController");
const md_auth = require("../middlewares/Authenticated");

const md_multiparty = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
api.post(
  "/createUser",
  [md_auth.asureAuth, md_multiparty],
  UserController.createUser
);

module.exports = api;
