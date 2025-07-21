const express = require("express");
const UserController = require("../controllers/UserController");
const md_auth = require("../middlewares/Authenticated");

const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", [md_auth.asureAuth], UserController.getUsers);

module.exports = api;
